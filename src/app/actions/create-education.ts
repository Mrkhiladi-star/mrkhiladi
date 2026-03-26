'use server';

import { educationCollection } from '@/models/server/education.collection';

export async function createEducationAction(data: any) {
  try {
    await educationCollection.createEducation(data);
    return { success: true };
  } catch (error) {
    console.error(error);
    return { success: false };
  }
}

export async function getEducationData() {
  return await educationCollection.getPublicEducation();
}