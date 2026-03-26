import { Permission, Query, ID } from "node-appwrite";
import { db, skillCollection as collectionId } from "../name";
import { databases } from "./config";
import { getFileView } from "@/lib/appwrite";

export default async function createSkillCollection() {
  try {
    await databases.createCollection(
      db,
      collectionId,
      "Skills",
      [
        Permission.read("any"),
        Permission.create("users"),
        Permission.update("users"),
        Permission.delete("users"),
      ]
    );

    await Promise.all([
      databases.createStringAttribute(db, collectionId, "name", 100, true),
      databases.createStringAttribute(db, collectionId, "category", 100, true),
      databases.createIntegerAttribute(db, collectionId, "proficiency", true, 0, 100),
      databases.createStringAttribute(db, collectionId, "iconId", 500, false),
      
    ]);

    console.log("✅ Skills collection created");
  } catch (error) {
    console.log("⚠️ Skills already exists");
  }
}

export const skillsCollection = {

  async getPublicSkills() {
  const response = await databases.listDocuments(
    db,
    collectionId,
    [Query.orderDesc("$createdAt")] // ✅ NEWEST FIRST
  );

  return response.documents.map(doc => ({
    id: doc.$id,
    name: doc.name,
    category: doc.category,
    proficiency: doc.proficiency,

    iconId: doc.iconId || "",
    icon: doc.iconId ? getFileView(doc.iconId) : null,
  }));
},

  async createSkill(data: any) {
    return await databases.createDocument(
      db,
      collectionId,
      ID.unique(),
      {
        name: data.name,
        category: data.category,
        proficiency: data.proficiency,
        iconId: data.iconId,
        
      }
    );
  }
};