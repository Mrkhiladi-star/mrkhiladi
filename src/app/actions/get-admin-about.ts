'use server';
import { profileCollection } from '@/models/server/profile.collection';
export async function getAdminAbout() {
  try {
    const data = await profileCollection.getPublicAbout();
    return data;
  } catch (error) {
    console.error('Error fetching admin about data:', error);
    return null;
  }
}