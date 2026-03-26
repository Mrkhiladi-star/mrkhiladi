'use server';

import { articleCollection } from '@/models/server/article.collection';

export async function getAllArticles() {
  return await articleCollection.getPublicArticles();
}

export async function getArticleBySlug(slug: string) {
  return await articleCollection.getPublicArticleBySlug(slug);
}