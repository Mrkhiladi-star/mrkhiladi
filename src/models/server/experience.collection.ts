import { Permission } from "node-appwrite";
import { db, experienceCollection as collectionId } from "../name";
import { databases } from "./config";
export default async function createExperienceCollection() {
  try {
    await databases.createCollection(
      db,
      collectionId,
      "Experience",
      [
        Permission.read("any"),
        Permission.create("users"),
        Permission.update("users"), 
        Permission.delete("users"),
      ]
    );
    console.log("Experience Collection Created");
    await Promise.all([
      databases.createStringAttribute(db, collectionId, "company", 100, true),
      databases.createStringAttribute(db, collectionId, "position", 100, true),
      databases.createStringAttribute(db, collectionId, "duration", 100, true),
      databases.createStringAttribute(db, collectionId, "logo", 200, false),
      databases.createStringAttribute(db, collectionId, "description", 5000, true, undefined, true), // Array of strings
      databases.createStringAttribute(db, collectionId, "technologies", 1000, true, undefined, true), // Array of strings
    ]);
    console.log("Experience Attributes Created");
  } catch (error) {
    console.error("Error creating experience collection or attributes:", error);
  }
}
export const experiencesCollection = {
  async getPublicExperiences() {
    const response = await databases.listDocuments(db, collectionId);
    return response.documents.map(doc => ({
      id: doc.$id,
      company: doc.company,
      position: doc.position,
      duration: doc.duration,
      sessionTag: doc.sessionTag || '',
      description: doc.description,
      technologies: doc.technologies,
      logo: doc.logo || '',
    }));
  },
  async updateExperiences(experiences: any[]) {
    const existingExperiences = await databases.listDocuments(db, collectionId);
    await Promise.all(existingExperiences.documents.map(exp => 
      databases.deleteDocument(db, collectionId, exp.$id)
    ));
    return await Promise.all(experiences.map(exp =>
      databases.createDocument(db, collectionId, 'unique()', {
        company: exp.company,
        position: exp.position,
        duration: exp.duration,
        sessionTag: exp.sessionTag, 
        description: exp.description,
        technologies: exp.technologies,
        logo: exp.logo,
      })
    ));
  },
};