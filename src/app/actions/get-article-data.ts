'use server';
import { articleCollection } from '@/models/server/article.collection';
export async function getArticleBySlug(slug: string) {
  try {
    const data = await articleCollection.getPublicArticleBySlug(slug);
    return data;
  } catch (error) {
    console.error('Error fetching article:', error);
    return null;
  }
}
export async function getAllArticles() {
  try {
    const data = await articleCollection.getPublicArticles();
    return data;
  } catch (error) {
    console.error('Error fetching all articles:', error);
    return [];
  }
}