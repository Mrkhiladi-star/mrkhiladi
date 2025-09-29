import { Permission } from "node-appwrite";
import { db, achievementsCollection as collectionId } from "../name";
import { databases } from "./config";
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
    console.log("Achievements Collection Created");
    await Promise.all([
      databases.createStringAttribute(db, collectionId, "title", 200, true),
      databases.createStringAttribute(db, collectionId, "organization", 100, true),
      databases.createStringAttribute(db, collectionId, "date", 50, true),
      databases.createStringAttribute(db, collectionId, "description", 1000, true),
      databases.createStringAttribute(db, collectionId, "link", 500, false),
    ]);
    console.log("Achievements Attributes Created");

  } catch (error) {
    console.error("Error creating achievements collection or attributes:", error);
  }
}
export const achievementsCollection = {
  async getPublicAchievements() {
    const response = await databases.listDocuments(db, collectionId);
    return response.documents.map(doc => ({
      id: doc.$id,
      title: doc.title,
      organization: doc.organization,
      date: doc.date,
      description: doc.description,
      link: doc.link,
    }));
  },
  async updateAchievements(achievements: any[]) {
    // First, delete all existing achievements
    const existingAchievements = await databases.listDocuments(db, collectionId);
    await Promise.all(existingAchievements.documents.map(ach => 
      databases.deleteDocument(db, collectionId, ach.$id)
    ));
    return await Promise.all(achievements.map(ach =>
      databases.createDocument(db, collectionId, 'unique()', {
        title: ach.title,
        organization: ach.organization,
        date: ach.date,
        description: ach.description,
        link: ach.link,
      })
    ));
  },
};