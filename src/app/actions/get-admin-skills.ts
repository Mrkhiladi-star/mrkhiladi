'use server';
import { skillsCollection } from '@/models/server/skills.collection';
export async function getAdminSkills() {
  try {
    const data = await skillsCollection.getPublicSkills();
    return data;
  } catch (error) {
    console.error('Error fetching skills data for admin dashboard:', error);
    return [];
  }
}