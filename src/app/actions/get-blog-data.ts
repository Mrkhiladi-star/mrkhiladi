'use server';

import { blogCollection } from '@/models/server/blog.collection';

export async function getBlogPosts() {
  try {
    const data = await blogCollection.getPublicPosts();
    return data;
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    return [];
  }
}
export async function getBlogContentBySlug(slug: string) {
  try {
    const data = await blogCollection.getPublicPostBySlug(slug);
    return data;
  } catch (error) {
    console.error(`Error fetching blog post by slug ${slug}:`, error);
    return null;
  }
} 