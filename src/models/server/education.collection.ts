import { Permission, Query, ID } from "node-appwrite";
import { db, educationCollection as collectionId } from "../name";
import { databases } from "./config";
import { getFileView } from "@/lib/appwrite";

export default async function createEducationCollection() {
  try {
    await databases.createCollection(
      db,
      collectionId,
      "Education",
      [
        Permission.read("any"),
        Permission.create("users"),
        Permission.update("users"),
        Permission.delete("users"),
      ]
    );

    await Promise.all([
      databases.createStringAttribute(db, collectionId, "institution", 100, true),
      databases.createStringAttribute(db, collectionId, "degree", 100, true),
      databases.createStringAttribute(db, collectionId, "field", 100, true),
      databases.createStringAttribute(db, collectionId, "duration", 100, true),
      databases.createStringAttribute(db, collectionId, "grade", 50, true),
      databases.createStringAttribute(db, collectionId, "description", 1000, true),
      databases.createStringAttribute(db, collectionId, "location", 100, true),

      // ✅ NEW
      databases.createStringAttribute(db, collectionId, "imageId", 500, false),
     
    ]);

    console.log("✅ Education collection created");
  } catch (error) {
    console.log("⚠️ Education collection already exists");
  }
}

export const educationCollection = {

  async getPublicEducation() {
    const response = await databases.listDocuments(
      db,
      collectionId,
      [Query.orderDesc("$createdAt")]
    );

    return response.documents.map(doc => ({
      id: doc.$id,
      institution: doc.institution,
      degree: doc.degree,
      field: doc.field,
      duration: doc.duration,
      grade: doc.grade,
      description: doc.description,
      location: doc.location,

      imageId: doc.imageId || "",

      // ✅ IMPORTANT
      image: doc.imageId
        ? getFileView(doc.imageId)
        : null,
    }));
  },

  async createEducation(data: any) {
    return await databases.createDocument(
      db,
      collectionId,
      ID.unique(),
      {
        institution: data.institution,
        degree: data.degree,
        field: data.field,
        duration: data.duration,
        grade: data.grade,
        description: data.description,
        location: data.location,
        imageId: data.imageId,
      
      }
    );
  }
};