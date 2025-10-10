'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { BackgroundBeams } from '@/components/ui/background-beams';
import { getAllArticles } from '@/app/actions/get-article-data';
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
const ArticleListItem = ({ post }: { post: ArticleSummary }) => (
  <article className="flex gap-4 p-4 border-b border-gray-700/50 hover:bg-gray-800 transition-colors duration-200 cursor-pointer">
    <Link href={`/articles/${post.slug}`} className="flex-shrink-0 w-24 h-24 overflow-hidden rounded-lg">
      <img
        src={post.image ?? '/placeholder-image.jpg'}
        alt={post.title}
        className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
      />
    </Link>
    <div className="flex-grow">
      <h3 className="text-xl font-bold text-teal-400 mb-1 leading-snug hover:underline">
        <Link href={`/articles/${post.slug}`}>{post.title}</Link>
      </h3>
      <p className="text-gray-400 text-sm mb-2 line-clamp-2">{post.excerpt ?? "A detailed look into this topic..."}</p> 
      <div className="flex items-center text-xs text-gray-500 gap-4">
        <span className="text-sm font-semibold">{post.tags[0] || 'Uncategorized'}</span>
        <span>{post.date}</span>
        <span>{post.readTime}</span>
      </div>
    </div>
  </article>
);
export default function ArticleHome() {
  const [articles, setArticles] = useState<ArticleSummary[]>([]);
  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    try {
      const data = (await getAllArticles())
        .slice(0, 2);
      setArticles(data || []);
    } catch (error) {
      console.error('Error fetching article posts for home:', error);
    }
  };
  return (
    <section id="articles" className="relative pt-20 pb-20 bg-black text-white">
     <BackgroundBeams className="absolute inset-0 z-0" />
      <div className="max-w-4xl mx-auto relative z-10 px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-extrabold text-teal-400 mb-2">My Articles</h2>
          <p className="text-gray-400">Deep dives and comprehensive write-ups on various subjects.</p>
        </div>
        <div className="mt-8 space-y-4">
          {articles.length > 0 ? (
            articles.map(article => (
              <ArticleListItem key={article.id} post={article} />
            ))
          ) : (
            <p className="text-center text-gray-500">No recent articles found.</p>
          )}
        </div>
        <div className="text-center mt-12">
          <Link
            href="/articles" 
            className="px-6 py-3 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors duration-300 font-medium"
          >
            View All Articles
          </Link>
        </div>
      </div>
    </section>
  );
}