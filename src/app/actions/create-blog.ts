'use server';

import { blogCollection } from '@/models/server/blog.collection';

export async function createBlogAction(data: any) {
  try {
    await blogCollection.createBlog(data);
    return { success: true };
  } catch (error) {
    console.error(error);
    return { success: false };
  }
}

export async function getBlogPosts() {
  return await blogCollection.getPublicPosts();
}

export async function getBlogContentBySlug(slug: string) {
  return await blogCollection.getPublicPostBySlug(slug);
}