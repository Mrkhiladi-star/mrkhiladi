'use server';
import { projectsCollection } from '@/models/server/projects.collection';
export async function getAdminProjects() {
  try {
    const data = await projectsCollection.getPublicProjects();
    return data;
  } catch (error) {
    console.error('Error fetching admin projects data:', error);
    return [];
  }
} 