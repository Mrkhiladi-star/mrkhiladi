'use server';
import { projectsCollection } from '@/models/server/projects.collection';
import { Project } from '@/interfaces';
export async function updateProjectsData(data: Project[]) {
  try {
    await projectsCollection.updateProjects(data);
    return { success: true };
  } catch (error) {
    console.error('Error updating projects data:', error);
    return { success: false, error: (error as Error).message };
  }
}