'use server';
import { articleCollection } from '@/models/server/article.collection';
import { Article } from '@/interfaces';
export async function updateArticlesData(data: Article[]) {
  try {
    await articleCollection.updateArticles(data);
    return { success: true };
  } catch (error) {
    console.error('Error updating articles data:', error);
    return { success: false, error: (error as Error).message };
  }
}