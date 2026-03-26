'use server';

import { projectsCollection } from '@/models/server/projects.collection';

export async function createProjectAction(data: any) {
  try {
    await projectsCollection.createProject(data);
    return { success: true };
  } catch (error: any) {
    console.error("Create project error:", error);
    return { success: false, error: error.message };
  }
}