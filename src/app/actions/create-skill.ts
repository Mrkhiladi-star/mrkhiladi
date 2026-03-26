'use server';

import { skillsCollection } from '@/models/server/skills.collection';

export async function createSkillAction(data: any) {
  try {
    await skillsCollection.createSkill(data);
    return { success: true };
  } catch (error) {
    console.error(error);
    return { success: false };
  }
}

export async function getSkillsData() {
  return await skillsCollection.getPublicSkills();
}