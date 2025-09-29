'use client';
import { useEffect, useState } from 'react';
import { getBlogPosts } from '@/app/actions/get-blog-data';
import BlogPostDetail from '@/app/components/BlogPostDetails';
import BlogList from '@/app/components/BlogList';
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

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getBlogPosts();
      setPosts(data || []);
      if (data && data.length > 0) {
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
  };
  return (
    <div className="min-h-screen bg-black text-white pt-20"> 
      <div className="max-w-7xl mx-auto flex h-[calc(100vh-80px)]"> 
        <aside className="w-full lg:w-1/3 border-r border-gray-800 overflow-y-auto p-4 lg:p-6 custom-scrollbar">
          <h1 className="text-3xl font-bold text-teal-400 mb-6 border-b border-gray-800 pb-4 hidden lg:block">All Blogs</h1>
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
          background: #2d3748; /* dark gray */
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #4a5568; /* slightly lighter gray */
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #718096;
        }
      `}</style>
    </div>
  );
}