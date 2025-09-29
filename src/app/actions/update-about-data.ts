'use server';
import { profileCollection } from '@/models/server/profile.collection';
import { AboutData } from '@/interfaces';
export async function updateAboutData(data: AboutData) {
  try {
    await profileCollection.updateAbout(data);
    return { success: true };
  } catch (error) {
    console.error('Error updating about data:', error);
    return { success: false, error: (error as Error).message };
  }
}