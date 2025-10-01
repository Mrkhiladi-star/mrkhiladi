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
    id: string;
}

export default function Article() {
    const [articles, setArticles] = useState<ArticleData[] | null>(null);
    const [expandedArticleIds, setExpandedArticleIds] = useState<Set<string>>(new Set());

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const data = await getArticleData()
            if (data) {
                const topArticles = data.reverse().slice(0, 50);
                setArticles(topArticles);
            } else {
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
        <article className="relative min-h-screen pt-24 pb-32 px-4 md:px-8 lg:px-16 bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white overflow-visible">
            <BackgroundBeams className="absolute inset-0 z-0" />
            <div className="max-w-3xl mx-auto relative z-10">
                <h2 className="text-3xl sm:text-4xl font-extrabold text-center text-teal-400 mb-8 sm:mb-12">
                    All Articles ({articles.length})
                </h2>
                <div className="space-y-12 sm:space-y-16 pb-8">
                    {articles.map((articleItem) => {
                        const isExpanded = expandedArticleIds.has(articleItem.id);
                        return (
                            <div key={articleItem.id} className="border-b border-gray-700 pb-12 sm:pb-16 last:border-b-0 last:pb-8">
                                <header className="mb-6 sm:mb-8 text-center">
                                    <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-4 sm:mb-5 leading-snug px-2">
                                        {articleItem.title}
                                    </h1>
                                    <div className="flex flex-col sm:flex-row items-center justify-center text-gray-500 text-xs sm:text-sm space-y-2 sm:space-y-0 sm:space-x-3 md:space-x-4">
                                        <div className="flex items-center">
                                            <svg className="w-4 h-4 mr-1 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                                            </svg>
                                            <span>{articleItem.date}</span>
                                        </div>
                                        <span className="hidden sm:inline mx-1">•</span>
                                        <div className="flex items-center">
                                            <svg className="w-4 h-4 mr-1 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                            </svg>
                                            <span>{articleItem.readTime} Min Read</span>
                                        </div>
                                    </div>
                                </header>
                                
                                {articleItem.image && (
                                    <div className="w-full max-h-64 sm:max-h-80 bg-gray-700 flex items-center justify-center rounded-xl mb-6 sm:mb-8 shadow-xl border border-gray-600 overflow-hidden">
                                        <img
                                            src={articleItem.image}
                                            alt={articleItem.title}
                                            className="w-full h-full object-contain"
                                        />
                                    </div>
                                )}
                                
                                {/* Show More/Less Button with better positioning */}
                                <div className="text-center mb-6 sm:mb-8 sticky bottom-4 z-20 bg-gradient-to-t from-black via-black to-transparent py-4 -mx-4 px-4">
                                    <button
                                        onClick={() => toggleShowFull(articleItem.id)}
                                        className="px-6 py-3 border-2 border-teal-400 text-teal-400 rounded-full hover:bg-teal-400/10 transition-all duration-200 font-semibold text-sm sm:text-base min-w-[140px] shadow-lg bg-black/80 backdrop-blur-sm"
                                    >
                                        {isExpanded ? 'Show Less' : 'Show More'}
                                    </button>
                                </div>

                                {isExpanded && (
                                    <div className="article-content px-2 mt-4">
                                        <div
                                            className="prose prose-sm sm:prose-lg dark:prose-invert prose-blue max-w-none text-gray-300"
                                            dangerouslySetInnerHTML={{ __html: articleItem.content }}
                                        />
                                        <div className="mt-12 sm:mt-16 pt-6 sm:pt-8 border-t border-gray-700">
                                            <h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4 text-gray-400">Related Topics:</h3>
                                            <div className="flex flex-wrap gap-2 sm:gap-3">
                                                {articleItem.tags.map((tag, tagIndex) => (
                                                    <span
                                                        key={tagIndex}
                                                        className="px-3 py-1 bg-gray-700 text-gray-200 font-medium rounded-md text-xs sm:text-sm hover:bg-gray-600 transition-colors cursor-pointer"
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