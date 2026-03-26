'use client';

import { useEffect, useState } from 'react';
import { getArticleBySlug } from '@/app/actions/get-article-data';
import { Article } from "@/interfaces";

export default function ArticleDetail({ slug }: { slug: string }) {
  const [post, setPost] = useState<Article | null>(null);

  useEffect(() => {
    fetchData();
  }, [slug]);

  const fetchData = async () => {
    const data = await getArticleBySlug(slug);
    setPost(data);
  };

  if (!post) return <p className="text-gray-400">Loading...</p>;

  return (
    <div className="max-w-3xl mx-auto">

      {/* 🔹 Title */}
      <h1 className="text-4xl text-teal-400 font-bold mb-4">
        {post.title}
      </h1>

      {/* 🔹 Author / Date / Read Time */}
      <div className="bg-gray-800/40 border border-gray-700 rounded-lg p-4 mb-4 text-sm space-y-1">

        <p>
          <span className="text-gray-400">Author :</span>{" "}
          <span className="text-teal-400 font-medium">
            {post.author || "Admin"}
          </span>
        </p>

        <p>
          <span className="text-gray-400">Date :</span>{" "}
          <span>{post.date}</span>
        </p>

        <p>
          <span className="text-gray-400">Read Time :</span>{" "}
          <span>{post.readTime}</span>
        </p>

      </div>

      {/* 🔹 Tags */}
      <div className="flex flex-wrap gap-2 mb-4">
        {post.tags?.map((tag, index) => (
          <span
            key={index}
            className="bg-teal-600/20 text-teal-400 px-2 py-1 rounded text-xs"
          >
            {tag}
          </span>
        ))}
      </div>

      {/* 🔹 Image */}
      {post.image && (
        <img
          src={post.image}
          alt={post.title}
          className="w-full h-[300px] object-cover rounded mb-6"
        />
      )}

      {/* 🔹 Content */}
      <div
        className="prose prose-invert"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />
    </div>
  );
}