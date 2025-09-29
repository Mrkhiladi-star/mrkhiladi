'use server';
import { educationCollection } from '@/models/server/education.collection';
export async function getAdminEducation() {
  try {
    const data = await educationCollection.getPublicEducation();
    return data;
  } catch (error) {
    console.error('Error fetching admin education data:', error);
    return [];
  }
} 