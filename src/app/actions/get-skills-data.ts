'use server';
import { skillsCollection } from '@/models/server/skills.collection';
export async function getSkillsData() {
  try {
    const data = await skillsCollection.getPublicSkills();
    return data;
  } catch (error) {
    console.error('Error fetching skills:', error);
    return [
  { id: '1', name: 'React', proficiency: 90, category: 'Frontend', icon: '/icons/react.png' },
  { id: '2', name: 'TypeScript', proficiency: 85, category: 'Frontend', icon: '/icons/ts.png' },
  { id: '3', name: 'Node.js', proficiency: 80, category: 'Backend', icon: '/icons/node.png' },
  { id: '4', name: 'Appwrite', proficiency: 75, category: 'Backend', icon: '/icons/appwrite.png' },
];
  }
}