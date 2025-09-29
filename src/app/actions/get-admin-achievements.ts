'use server';
import { achievementsCollection } from '@/models/server/achievements.collection';
export async function getAdminAchievements() {
  try {
    const data = await achievementsCollection.getPublicAchievements();
    return data;
  } catch (error) {
    console.error('Error fetching admin achievements data:', error);
    return [];
  }
}