'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { RetroGrid } from '@/components/magicui/retro-grid';
import { getBlogPosts } from '@/app/actions/get-blog-data';
interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  tags: string[];
  image: string | null;
  slug: string;
}
const BlogListItem = ({ post }: { post: BlogPost }) => (
  <article className="flex gap-4 p-4 border-b border-gray-700/50 hover:bg-gray-800 transition-colors duration-200 cursor-pointer">
    <Link href={`/blog/${post.slug}`} className="flex-shrink-0 w-24 h-24 overflow-hidden rounded-lg">
      <img
        src={post.image ?? '/placeholder-image.jpg'}
        alt={post.title}
        className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
      />
    </Link>
    <div className="flex-grow">
      <h3 className="text-xl font-bold text-teal-400 mb-1 leading-snug hover:underline">
        <Link href={`/blog/${post.slug}`}>{post.title}</Link>
      </h3>
      <p className="text-gray-400 text-sm mb-2 line-clamp-2">{post.excerpt}</p>
      <div className="flex items-center text-xs text-gray-500 gap-4">
        <span className="text-sm font-semibold">{post.tags[0] || 'Uncategorized'}</span>
        <span>{post.date}</span>
        <span>{post.readTime}</span>
      </div>
    </div>
  </article>
);
export default function Blog() {
  const [posts, setPosts] = useState<BlogPost[]>([]);

  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    try {
      const data = (await getBlogPosts())
      .reverse()
      .slice(0, 2); 
      setPosts(data || []);
    } catch (error) { 
      console.error('Error fetching blog posts:', error);
    }
  };
  return (
    <section id="blog" className="relative pt-20 pb-20 bg-black text-white">
      <RetroGrid 
  className="absolute inset-0 z-0" 
  lightLineColor="rgba(200,200,200,0.6)" 
  darkLineColor="#14b8a6"                  
  opacity={0.25}                       
/> 
      <div className="max-w-4xl mx-auto relative z-10 px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-extrabold text-teal-400 mb-2">My Stories</h2>
          <p className="text-gray-400">A glimpse into my journey, thoughts, and learnings along the way.</p>
          <button className="mt-6 px-6 py-2 border border-teal-400 text-teal-400 rounded-full hover:bg-teal-400/10 transition-colors duration-200">
            Subscribe My Blogs
          </button>
        </div>
        <div className="mt-8 space-y-4">
          {posts.length > 0 ? (
            posts.map(post => (
              <BlogListItem key={post.id} post={post} />
            ))
          ) : (
            <p className="text-center text-gray-500">No blog posts found.</p>
          )}
        </div>
        <div className="text-center mt-12">
          <Link
            href="/blog"
            className="px-6 py-3 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors duration-300 font-medium"
          >
            View All Posts
          </Link>
        </div>
      </div>
    </section>
  );
}