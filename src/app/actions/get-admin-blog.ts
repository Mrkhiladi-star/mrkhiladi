'use server';
import { blogCollection } from '@/models/server/blog.collection';
export async function getAdminBlog() {
  try {
    const data = await blogCollection.getPublicPosts();
    return data;
  } catch (error) {
    console.error('Error fetching admin blog data:', error);
    return [];
  }
} 