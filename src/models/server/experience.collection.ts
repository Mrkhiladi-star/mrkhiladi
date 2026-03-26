import { Permission, Query, ID } from "node-appwrite";
import { db, experienceCollection as collectionId } from "../name";
import { databases } from "./config";
import { getFileView } from "@/lib/appwrite";

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

    await Promise.all([
      databases.createStringAttribute(db, collectionId, "company", 100, true),
      databases.createStringAttribute(db, collectionId, "position", 100, true),
      databases.createStringAttribute(db, collectionId, "duration", 100, true),

      databases.createStringAttribute(db, collectionId, "sessionTag", 200, false),

      databases.createStringAttribute(db, collectionId, "description", 5000, true, undefined, true),
      databases.createStringAttribute(db, collectionId, "technologies", 1000, true, undefined, true),

      databases.createStringAttribute(db, collectionId, "logoId", 500, false),
      
    ]);

    console.log("✅ Experience collection created");
  } catch (error) {
    console.log("⚠️ Experience already exists");
  }
}

export const experiencesCollection = {

  async getPublicExperiences() {
    const response = await databases.listDocuments(
      db,
      collectionId,
      [Query.orderDesc("$createdAt")]
    );

    return response.documents.map(doc => ({
      id: doc.$id,
      company: doc.company,
      position: doc.position,
      duration: doc.duration,
      sessionTag: doc.sessionTag || "",
      description: doc.description || [],
      technologies: doc.technologies || [],

      logoId: doc.logoId || "",

      // ✅ IMPORTANT
      logo: doc.logoId ? getFileView(doc.logoId) : null,

     
    }));
  },

  async createExperience(data: any) {
    return await databases.createDocument(
      db,
      collectionId,
      ID.unique(),
      {
        company: data.company,
        position: data.position,
        duration: data.duration,
        sessionTag: data.sessionTag,
        description: data.description || [],
        technologies: data.technologies || [],
        logoId: data.logoId,
    
      }
    );
  }
};