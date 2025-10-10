import { useEffect, useState } from 'react';
import { getArticleBySlug } from '@/app/actions/get-article-data'; 
import { DotLoader } from '@/components/ui/DotLoader';
interface ArticleDetail {
  id: string;
  title: string;
  content: string;
  date: string;
  readTime: string;
  tags: string[];
  image: string | null;
  slug: string;
}
interface ArticleDetailProps {
  slug: string;
}
export default function ArticleDetail({ slug }: ArticleDetailProps) {
  const [post, setPost] = useState<ArticleDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    if (slug) {
      fetchPostContent(slug);
    }
  }, [slug]);
  const fetchPostContent = async (currentSlug: string) => {
    setLoading(true);
    setError(null);
    try {
      const data = await getArticleBySlug(currentSlug); 
      setPost(data);
    } catch (e) {
      console.error('Error fetching article content:', e);
      setError('Failed to load article content.');
    } finally {
      setLoading(false);
    }
  };
  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center bg-black">
        <DotLoader />
      </div>
    );
  }
  if (error) {
    return <p className="text-center text-red-500">{error}</p>;
  }
  if (!post) {
    return <p className="text-center text-gray-500">Article not found.</p>;
  }
  return (
    <article className="p-4 sm:p-8 bg-gray-900 rounded-lg shadow-xl">
      <h1 className="text-4xl font-extrabold text-teal-400 mb-4">{post.title}</h1>
      <div className="flex items-center text-sm text-gray-500 mb-6 space-x-4">
        <span className="font-semibold text-gray-400">Author: Ramu Yadav</span> 
        <span>Date: {post.date}</span>
        <span>Read: {post.readTime} Min</span>
      </div>
      <img
        src={post.image ?? '/placeholder-image.jpg'}
        alt={post.title}
        className="w-full h-auto max-h-96 object-cover rounded-xl mb-8 border border-gray-700"
      />
      <div
        className="prose prose-invert text-gray-300 max-w-none space-y-4"
        dangerouslySetInnerHTML={{ __html: post.content }}
      >
      </div>
      <div className='mt-8 pt-6 border-t border-gray-700'>
        {post.tags.map((tag, index) => (
          <span key={index} className="px-2 py-0.5 bg-teal-800/50 text-teal-200 rounded-full text-xs font-medium mr-3 inline-block">
            #{tag}
          </span>
        ))}
      </div>
    </article>
  );
}