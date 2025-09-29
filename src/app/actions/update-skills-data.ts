'use server';
import { skillsCollection } from '@/models/server/skills.collection';
import { Skill } from '@/interfaces';
export async function updateSkillsData(data: Skill[]) {
  try {
    await skillsCollection.updateSkills(data);
    return { success: true };
  } catch (error) {
    console.error('Error updating skills data:', error);
    return { success: false, error: (error as Error).message };
  }
}