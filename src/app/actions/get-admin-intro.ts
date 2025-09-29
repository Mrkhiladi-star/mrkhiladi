'use server';
import { profileCollection } from '@/models/server/profile.collection';
export async function getAdminIntro() {
  try {
    const data = await profileCollection.getPublicIntro();
    return data;
  } catch (error) {
    console.error('Error fetching intro data for admin dashboard:', error);
    return null;
  }
}