'use server';
import { achievementsCollection } from '@/models/server/achievements.collection';
import { Achievement } from '@/interfaces';
export async function updateAchievementsData(data: Achievement[]) {
  try {
    await achievementsCollection.updateAchievements(data);
    return { success: true };
  } catch (error) {
    console.error('Error updating achievements data:', error);
    return { success: false, error: (error as Error).message };
  }
}