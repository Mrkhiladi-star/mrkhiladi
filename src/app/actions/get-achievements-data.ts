'use server';
import { achievementsCollection } from '@/models/server/achievements.collection';
export async function getAchievementsData() {
  try {
    const data = await achievementsCollection.getPublicAchievements();
    return data;
  } catch (error) {
    console.error('Error fetching achievements:', error);
    return [];
  }
}