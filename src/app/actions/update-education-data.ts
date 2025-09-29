'use server';
import { educationCollection } from '@/models/server/education.collection';
import { Education } from '@/interfaces';
export async function updateEducationData(data: Education[]) {
  try {
    await educationCollection.updateEducation(data);
    return { success: true };
  } catch (error) {
    console.error('Error updating education data:', error);
    return { success: false, error: (error as Error).message };
  }
} 