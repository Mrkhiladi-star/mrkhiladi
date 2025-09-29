import { Permission, Query  } from "node-appwrite";
import { db, educationCollection as collectionId } from "../name";
import { databases } from "./config";

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
    console.log("Education Collection Created");
    await Promise.all([
      databases.createStringAttribute(db, collectionId, "institution", 100, true),
      databases.createStringAttribute(db, collectionId, "degree", 100, true),
      databases.createStringAttribute(db, collectionId, "field", 100, true),
      databases.createStringAttribute(db, collectionId, "duration", 100, true),
      databases.createStringAttribute(db, collectionId, "grade", 50, true),
      databases.createStringAttribute(db, collectionId, "description", 1000, true),
      databases.createStringAttribute(db, collectionId, "location", 100, true), // Add location
      databases.createStringAttribute(db, collectionId, "image", 500, true), 
      databases.createStringAttribute(db, collectionId, "level", 500, false), 
    ]);
    console.log("Education Attributes Created");

  } catch (error) {
    console.error("Error creating education collection or attributes:", error);
  }
}
export const educationCollection = {
  async getPublicEducation() {
  const response = await databases.listDocuments(
    db,
    collectionId,
    [Query.orderDesc("level")]
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
    image: doc.image,
    level: doc.level
  }));
},
  async updateEducation(education: any[]) {
    const existingEducation = await databases.listDocuments(db, collectionId);
    await Promise.all(existingEducation.documents.map(edu => 
      databases.deleteDocument(db, collectionId, edu.$id)
    ));
    return await Promise.all(education.map(edu =>
      databases.createDocument(db, collectionId, 'unique()', {
        institution: edu.institution,
        degree: edu.degree,
        field: edu.field,
        duration: edu.duration,
        grade: edu.grade,
        description: edu.description,
        location: edu.location, 
        image: edu.image,  
        level: edu.level
      })
    ));
  },
};