'use server';
import { profileCollection } from '@/models/server/profile.collection';
export async function getIntroData() {
  try {
    const data = await profileCollection.getPublicIntro();
    return data;
  } catch (error) {
    console.error('Error fetching intro data:', error);
    return null;
  }
}