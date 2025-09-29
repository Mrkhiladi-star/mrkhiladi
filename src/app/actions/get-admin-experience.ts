'use server';
import { experiencesCollection } from '@/models/server/experience.collection';
export async function getAdminExperience() {
  try {
    const data = await experiencesCollection.getPublicExperiences();
    return data;
  } catch (error) {
    console.error('Error fetching admin experience data:', error);
    return [];
  }
}