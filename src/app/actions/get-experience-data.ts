'use server';
import { experiencesCollection } from '@/models/server/experience.collection';
export async function getExperienceData() {
  try {
    const data = await experiencesCollection.getPublicExperiences();
    return data;
  } catch (error) {
    console.error('Error fetching experiences:', error);
    return [];
  }
}