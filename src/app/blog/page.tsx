'use client';
import { useEffect, useState } from 'react';
import { getBlogPosts } from '@/app/actions/get-blog-data';
import BlogPostDetail from '@/app/components/BlogPostDetails';
import BlogList from '@/app/components/BlogList';
import { ArrowLeft, Home } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface BlogPostSummary {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  tags: string[];
  image: string | null;
  slug: string;
}

export default function BlogListLayout() {
  const [posts, setPosts] = useState<BlogPostSummary[]>([]);
  const [selectedSlug, setSelectedSlug] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [showList, setShowList] = useState(true);
  const router = useRouter();

  useEffect(() => {
    fetchData();
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const checkMobile = () => {
    setIsMobile(window.innerWidth < 1024);
  };

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getBlogPosts();
      setPosts(data || []);
      if (data && data.length > 0 && !isMobile) {
        setSelectedSlug(data[0].slug);
      }
    } catch (e) {
      console.error('Error fetching blog posts:', e);
      setError('Failed to load blog posts.');
    } finally {
      setLoading(false);
    }
  };

  const handleSelectPost = (slug: string) => {
    setSelectedSlug(slug);
    if (isMobile) {
      setShowList(false);
    }
  };

  const handleBackToList = () => {
    setShowList(true);
  };

  const handleBackToHome = () => {
    router.push('/#blog');
  };

  // Mobile view - show either list or detail
  if (isMobile) {
    return (
      <div className="min-h-screen bg-black text-white pt-16">
        {/* Fixed Back to Home Button - Top Left Corner for Mobile */}
        <button 
          onClick={handleBackToHome}
          className="fixed top-20 left-4 z-50 flex items-center gap-2 bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-full shadow-lg transition-all duration-300"
        >
          <Home size={18} />
          <span className="text-sm">Home</span>
        </button>

        <div className="max-w-7xl mx-auto">
          {showList ? (
            // Mobile list view - ALL posts are visible
            <div className="p-4 pt-16">
              <h1 className="text-2xl font-bold text-teal-400 mb-6">All Blogs ({posts.length})</h1>
              {loading ? (
                <p className="text-gray-500">Loading posts...</p>
              ) : error ? (
                <p className="text-red-500">{error}</p>
              ) : (
                <BlogList 
                  posts={posts} 
                  selectedSlug={selectedSlug} 
                  onSelectPost={handleSelectPost} 
                />
              )}
            </div>
          ) : (
            // Mobile detail view - when a post is selected
            <div className="p-4 pt-16">
              <button 
                onClick={handleBackToList}
                className="flex items-center gap-2 text-teal-400 mb-4 hover:underline"
              >
                <ArrowLeft size={20} />
                Back to All Posts
              </button>
              {selectedSlug && <BlogPostDetail slug={selectedSlug} />}
            </div>
          )}
        </div>
      </div>
    );
  }

  // Desktop view - split screen layout
  return (
    <div className="min-h-screen bg-black text-white pt-20">
      <div className="max-w-7xl mx-auto flex h-[calc(100vh-80px)]"> 
        <aside className="w-full lg:w-1/3 border-r border-gray-800 overflow-y-auto p-4 lg:p-6 custom-scrollbar">
          {/* Header with Title and Button side by side */}
          <div className="flex items-center justify-between mb-6 border-b border-gray-800 pb-4">
            <h1 className="text-3xl font-bold text-teal-400">All Blogs ({posts.length})</h1>
            <button 
              onClick={handleBackToHome}
              className="flex items-center gap-2 bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-lg transition-all duration-300 hover:scale-105 border border-teal-400 text-sm"
            >
              <Home size={16} />
              <span>Home</span>
            </button>
          </div>
          
          {loading ? (
            <p className="text-gray-500">Loading posts...</p>
          ) : error ? (
            <p className="text-red-500">{error}</p>
          ) : (
            <BlogList 
              posts={posts} 
              selectedSlug={selectedSlug} 
              onSelectPost={handleSelectPost} 
            />
          )}
        </aside>
        <main className="w-full lg:w-2/3 overflow-y-auto p-4 lg:p-8 bg-gray-900/50 custom-scrollbar">
          {selectedSlug ? (
            <BlogPostDetail slug={selectedSlug} />
          ) : (
            <div className="text-center text-gray-500 p-10">
              Select a blog post from the list on the left to view its content.
            </div>
          )}
        </main>
      </div>
      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #2d3748;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #4a5568;
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #718096;
        }
      `}</style>
    </div>
  );
}