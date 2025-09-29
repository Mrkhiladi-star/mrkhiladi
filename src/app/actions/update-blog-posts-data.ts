'use server';
import { blogCollection } from '@/models/server/blog.collection';
import { BlogPost } from '@/interfaces';
export async function updateBlogPostsData(data: BlogPost[]) {
  try {
    await blogCollection.updatePosts(data);
    return { success: true };
  } catch (error) {
    console.error('Error updating blog posts data:', error);
    return { success: false, error: (error as Error).message };
  }
}