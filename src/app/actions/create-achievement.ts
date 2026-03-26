'use server';

import { achievementsCollection } from '@/models/server/achievements.collection';

export async function createAchievementAction(data: any) {
  try {
    await achievementsCollection.createAchievement(data);
    return { success: true };
  } catch (error) {
    console.error(error);
    return { success: false };
  }
}