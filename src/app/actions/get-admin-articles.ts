'use server';
import { articleCollection } from '@/models/server/article.collection';
export async function getArticleData() {
    try {
        const articles = await articleCollection.getPublicArticles();
        return articles;
    } catch (error) {
        console.error('Error fetching article data:', error);
        return null;
    }
}