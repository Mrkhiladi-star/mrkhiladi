'use client';
import { useEffect, useState } from 'react';
import { getAllArticles } from '@/app/actions/get-article-data'; 
import ArticleDetail from '@/app/components/ArticleDetails';
import ArticleList from '@/app/components/ArticleList';
import { ArrowLeft, Home } from 'lucide-react';
import { useRouter } from 'next/navigation';
interface ArticleSummary {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  tags: string[];
  image: string | null;
  slug: string;
}
export default function ArticleListLayout() {
  const [posts, setPosts] = useState<ArticleSummary[]>([]);
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
      const data = await getAllArticles(); 
      setPosts(data || []);
      if (data && data.length > 0 && !isMobile) {
        const sortedData = [...data].reverse();
        setPosts(sortedData); 
        setSelectedSlug(sortedData[0].slug); 
      } else {
        setPosts(data || []);
      }
    } catch (e) {
      console.error('Error fetching articles:', e);
      setError('Failed to load articles.');
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
    router.push('/#articles'); 
  };
  if (isMobile) {
    return (
      <div className="min-h-screen bg-black text-white pt-16">
        <button
          onClick={handleBackToHome}
          className="fixed top-20 left-4 z-50 flex items-center gap-2 bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-full shadow-lg transition-all duration-300"
        >
          <Home size={18} />
          <span className="text-sm">Home</span>
        </button>
        <div className="max-w-7xl mx-auto">
          {showList ? (
            <div className="p-4 pt-16">
              <h1 className="text-2xl font-bold text-teal-400 mb-6">All Articles ({posts.length})</h1>
              {loading ? (
                <p className="text-gray-500">Loading articles...</p>
              ) : error ? (
                <p className="text-red-500">{error}</p>
              ) : (
                <ArticleList 
                  posts={posts}
                  selectedSlug={selectedSlug}
                  onSelectPost={handleSelectPost}
                />
              )}
            </div>
          ) : (
            <div className="p-4 pt-16">
              <button
                onClick={handleBackToList}
                className="flex items-center gap-2 text-teal-400 mb-4 hover:underline"
              >
                <ArrowLeft size={20} />
                Back to All Articles
              </button>
              {selectedSlug && <ArticleDetail slug={selectedSlug} />} {/* ⚠️ Used ArticleDetail */}
            </div>
          )}
        </div>
      </div>
    );
  }
  return (
    <div className="min-h-screen bg-black text-white pt-20">
      <div className="max-w-7xl mx-auto flex h-[calc(100vh-80px)]">
        <aside className="w-full lg:w-1/3 border-r border-gray-800 overflow-y-auto p-4 lg:p-6 custom-scrollbar">
          <div className="flex items-center justify-between mb-6 border-b border-gray-800 pb-4">
            <h1 className="text-3xl font-bold text-teal-400">All Articles ({posts.length})</h1>
            <button
              onClick={handleBackToHome}
              className="flex items-center gap-2 bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-lg transition-all duration-300 hover:scale-105 border border-teal-400 text-sm"
            >
              <Home size={16} />
              <span>Home</span>
            </button>
          </div>
          {loading ? (
            <p className="text-gray-500">Loading articles...</p>
          ) : error ? (
            <p className="text-red-500">{error}</p>
          ) : (
            <ArticleList 
              posts={posts}
              selectedSlug={selectedSlug}
              onSelectPost={handleSelectPost}
            />
          )}
        </aside>
        <main className="w-full lg:w-2/3 overflow-y-auto p-4 lg:p-8 bg-gray-900/50 custom-scrollbar">
          {selectedSlug ? (
            <ArticleDetail slug={selectedSlug} /> 
          ) : (
            <div className="text-center text-gray-500 p-10">
              Select an article from the list on the left to view its content.
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