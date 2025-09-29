// get-admin-articles.ts
'use server';
import { articleCollection } from '@/models/server/article.collection';
// The return type should now be ArticleData[] | null
export async function getArticleData() {  
  try {
    const articles = await articleCollection.getPublicArticles();
    // If no articles, return null or an empty array, depending on your preference. 
    // Returning the array here makes the client-side simpler.
    return articles; // 👈 Now it returns ALL articles
  } catch (error) {
    console.error('Error fetching article data:', error);
    return null;
  }
}