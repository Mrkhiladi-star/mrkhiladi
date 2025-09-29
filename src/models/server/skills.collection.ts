import { Permission } from "node-appwrite";
import { db, skillCollection as collectionId } from "../name";
import { databases } from "./config";
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
    console.log("Skill Collection Created");
    await Promise.all([
      databases.createStringAttribute(db, collectionId, "name", 100, true),
      databases.createStringAttribute(db, collectionId, "category", 100, true),
      databases.createIntegerAttribute(db, collectionId, "proficiency", true, 0, 100),
      databases.createStringAttribute(db, collectionId, "iconId", 500, false),
    ]);
    console.log("Skill Attributes Created");

  } catch (error) {
    console.error("Error creating skill collection or attributes:", error);
  }
}
export const skillsCollection = {
  async getPublicSkills() {
    const response = await databases.listDocuments(db, collectionId);
    return response.documents.map(doc => ({
      id: doc.$id,
      name: doc.name,
      category: doc.category,
      proficiency: doc.proficiency,
      icon: doc.iconId,
    }));
  },
  async updateSkills(skills: any[]) {

    const existingSkills = await databases.listDocuments(db, collectionId);
    await Promise.all(existingSkills.documents.map(skill => 
      databases.deleteDocument(db, collectionId, skill.$id)
    ));
    return await Promise.all(skills.map(skill =>
      databases.createDocument(db, collectionId, 'unique()', {
        name: skill.name,
        category: skill.category,
        proficiency: skill.proficiency,
        iconId: skill.icon ? String(skill.icon).slice(0, 500) : ""
      })
    ));
  },
};