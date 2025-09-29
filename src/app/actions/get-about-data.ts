// src/app/actions/get-about-data.ts

'use server';

import { profileCollection } from '@/models/server/profile.collection';

export async function getAboutData() {
  try {
    const data = await profileCollection.getPublicAbout();
    return data;
  } catch (error) {
    console.error('Error fetching about data:', error);
    return null;
  }
}