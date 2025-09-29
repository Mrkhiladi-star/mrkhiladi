'use server';
import { profileCollection } from '@/models/server/profile.collection';
import { IntroData } from '@/interfaces'; // Assuming an interfaces file for clarity
export async function updateIntroData(data: IntroData) {
  try {
    await profileCollection.updateIntro(data);
    return { success: true };
  } catch (error) {
    console.error('Error updating intro data:', error);
    return { success: false, error: (error as Error).message };
  }
}