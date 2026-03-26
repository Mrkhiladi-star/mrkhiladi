'use server';

import { experiencesCollection } from '@/models/server/experience.collection';

export async function createExperienceAction(data: any) {
  try {
    await experiencesCollection.createExperience(data);
    return { success: true };
  } catch (error) {
    console.error(error);
    return { success: false };
  }
}

export async function getExperienceData() {
  return await experiencesCollection.getPublicExperiences();
}