'use server';

import { articleCollection } from '@/models/server/article.collection';

export async function createArticleAction(data: any) {
  try {
    await articleCollection.createArticle(data);
    return { success: true };
  } catch (error) {
    console.error(error);
    return { success: false };
  }
}