'use server';
import { experiencesCollection } from '@/models/server/experience.collection';
import { Experience } from '@/interfaces';
export async function updateExperiencesData(data: Experience[]) {
  try {
    await experiencesCollection.updateExperiences(data);
    return { success: true };
  } catch (error) {
    console.error('Error updating experiences data:', error);
    return { success: false, error: (error as Error).message };
  }
}