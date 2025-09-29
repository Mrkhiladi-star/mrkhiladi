'use server';
import { educationCollection } from '@/models/server/education.collection';
export async function getEducationData() {
  try {
    const data = await educationCollection.getPublicEducation();
    return data;
  } catch (error) {
    console.error('Error fetching education:', error);
    return [];
  }
} 