import { ID, Query, Permission } from "node-appwrite";
import { db, achievementsCollection as collectionId } from "../name";
import { databases } from "./config";
import { getFileView } from "@/lib/appwrite";


// ✅ COLLECTION CREATE FUNCTION (IMPORTANT FIX)
export default async function createAchievementsCollection() {
  try {
    await databases.createCollection(
      db,
      collectionId,
      "Achievements",
      [
        Permission.read("any"),
        Permission.create("users"),
        Permission.update("users"),
        Permission.delete("users"),
      ]
    );

    await Promise.all([
      databases.createStringAttribute(db, collectionId, "title", 200, true),
      databases.createStringAttribute(db, collectionId, "organization", 100, true),
      databases.createStringAttribute(db, collectionId, "date", 50, true),
      databases.createStringAttribute(db, collectionId, "description", 1000, true),
      databases.createStringAttribute(db, collectionId, "link", 500, false),
      databases.createStringAttribute(db, collectionId, "imageId", 500, false),
    ]);

    console.log("Achievements collection created");
  } catch (error) {
    console.log("Achievements collection already exists");
  }
}


// ✅ MAIN COLLECTION OBJECT
export const achievementsCollection = {

  // 🔹 GET (latest first)
  async getPublicAchievements() {
    const response = await databases.listDocuments(db, collectionId, [
      Query.orderDesc("$createdAt")
    ]);

    return response.documents.map(doc => ({
      id: doc.$id,
      title: doc.title,
      organization: doc.organization,
      date: doc.date,
      description: doc.description,
      link: doc.link,
      imageId: doc.imageId || "",
      image: doc.imageId ? getFileView(doc.imageId) : undefined,
    }));
  },

  // ❌ REMOVE OLD BULK UPDATE
  async updateAchievements() {
    throw new Error("Do not use bulk update anymore");
  },

  // ✅ CREATE SINGLE (PROJECT-LIKE)
  async createAchievement(data: any) {
    return await databases.createDocument(
      db,
      collectionId,
      ID.unique(),
      {
        title: data.title,
        organization: data.organization,
        date: data.date,
        description: data.description,
        link: data.link,
        imageId: data.imageId || "",
      }
    );
  },
};