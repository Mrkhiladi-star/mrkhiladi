'use client';
import { useEffect, useState } from 'react';
import { getArticleData } from '@/app/actions/get-admin-articles';
import { BackgroundBeams } from '@/components/ui/background-beams';
import { DotLoader } from '@/components/ui/DotLoader';

interface ArticleData {
    title: string;
    content: string;
    date: string;
    readTime: string;
    tags: string[];
    image: string;
    category: string;
    // We need an ID for state tracking, assuming your article data 
    // from getArticleData also contains an 'id' property.
    // If not, you can use the 'index' in the map function as a key.
    id: string;
}

// NOTE: I've updated the ArticleData interface above to include an 'id'
// which is typically available from Appwrite documents ($id) and is necessary 
// to track which individual article is expanded.

export default function Article() {
    const [articles, setArticles] = useState<ArticleData[] | null>(null);

    // State to store the IDs of articles that are currently showing full content
    const [expandedArticleIds, setExpandedArticleIds] = useState<Set<string>>(new Set());

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            // Data is now an array
            const data = await getArticleData()
            if (data) {
                const topArticles = data.reverse().slice(0, 50);
                setArticles(topArticles);
            } else {
                // Fallback if null
                setArticles(data || []);
            }
        } catch (error) {
            console.error('Error fetching article data:', error);
        }
    };
    const toggleShowFull = (articleId: string) => {
        setExpandedArticleIds(prevIds => {
            const newIds = new Set(prevIds);
            if (newIds.has(articleId)) {
                newIds.delete(articleId);
            } else {
                newIds.add(articleId);
            }
            return newIds;
        });
    };

    if (!articles) {
        return (
            <div className="h-screen flex items-center justify-center bg-black">
                <DotLoader />
            </div>
        );
    }

    if (articles.length === 0) {
        return (
            <div className="h-screen flex items-center justify-center bg-black text-white">
                No articles found.
            </div>
        );
    }
    return (
        <article className="relative min-h-screen pt-24 pb-16 px-4 md:px-8 lg:px-16 bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white overflow-visible">
            <BackgroundBeams className="absolute inset-0 z-0" />
            <div className="max-w-3xl mx-auto relative z-10">
                <h2 className="text-4xl font-extrabold text-center text-teal-400 mb-12">
                    All Articles ({articles.length})
                </h2>
                <div className="space-y-16">
                    {articles.map((articleItem) => {
                        const isExpanded = expandedArticleIds.has(articleItem.id);
                        return (
                            <div key={articleItem.id} className="border-b border-gray-700 pb-16 last:border-b-0">
                                <header className="mb-8 text-center">
                                    <h1 className="text-3xl md:text-4xl font-extrabold mb-5 leading-snug">
                                        {articleItem.title}
                                    </h1>
                                    <div className="flex items-center justify-center text-gray-500 text-sm space-x-3 md:space-x-4">
                                        <div className="flex items-center">
                                            <svg className="w-4 h-4 mr-1 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                                            </svg>
                                            <span>{articleItem.date}</span>
                                        </div>
                                        <span className="mx-1">•</span>
                                        <div className="flex items-center">
                                            <svg className="w-4 h-4 mr-1 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                            </svg>
                                            <span>{articleItem.readTime} Min Read</span>
                                        </div>
                                    </div>
                                </header>
                                {articleItem.image && (
                                    <div className="w-full max-h-80 bg-gray-700 flex items-center justify-center rounded-xl mb-8 shadow-xl border border-gray-600 overflow-hidden">
                                        <img
                                            src={articleItem.image}
                                            alt={articleItem.title}
                                            className="w-full h-full object-contain"
                                        />
                                    </div>
                                )}
                                <div className="text-center mb-6">
                                    <button
                                        onClick={() => toggleShowFull(articleItem.id)}
                                        className="px-6 py-2 border border-teal-400 text-teal-400 rounded-full hover:bg-teal-400/10 transition-colors duration-200"
                                    >
                                        {isExpanded ? 'Show Less' : 'Show More'}
                                    </button>
                                </div>
                                {isExpanded && (
                                    <div className="article-content px-2">
                                        <div
                                            className="prose prose-lg dark:prose-invert prose-blue max-w-none text-gray-300"
                                            dangerouslySetInnerHTML={{ __html: articleItem.content }}
                                        />
                                        <div className="mt-16 pt-8 border-t border-gray-700">
                                            <h3 className="text-lg font-semibold mb-4 text-gray-400">Related Topics:</h3>
                                            <div className="flex flex-wrap gap-3">
                                                {articleItem.tags.map((tag, tagIndex) => (
                                                    <span
                                                        key={tagIndex}
                                                        className="px-3 py-1 bg-gray-700 text-gray-200 font-medium rounded-md text-sm hover:bg-gray-600 transition-colors cursor-pointer"
                                                    >
                                                        #{tag}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>
        </article>
    );
}