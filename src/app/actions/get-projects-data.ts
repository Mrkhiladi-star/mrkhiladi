'use server';
import { projectsCollection } from '@/models/server/projects.collection';
export async function getProjectsData() {
  try {
    const data = await projectsCollection.getPublicProjects();
    return data;
  } catch (error) {
    console.error('Error fetching projects:', error);
    return [];
  }
}