import { Permission, ID, Query } from "node-appwrite";
import { db, projectCollection as collectionId } from "../name";
import { databases } from "./config";
import { getFileView } from "@/lib/appwrite";

export default async function createProjectCollection() {
  try {
    await databases.createCollection(
      db,
      collectionId,
      "Projects",
      [
        Permission.read("any"),
        Permission.create("users"),
        Permission.update("users"),
        Permission.delete("users"),
      ]
    );

    await Promise.all([
      databases.createStringAttribute(db, collectionId, "name", 100, true),
      databases.createStringAttribute(db, collectionId, "description", 2000, true),
      databases.createStringAttribute(db, collectionId, "tags", 500, true, undefined, true),
      databases.createStringAttribute(db, collectionId, "imageId", 500, true),
      databases.createStringAttribute(db, collectionId, "link", 500, true),
      databases.createStringAttribute(db, collectionId, "github", 500, false),
    ]);

  } catch (error) {
    console.error("Error creating project collection:", error);
  }
}

export const projectsCollection = {

  // ✅ GET (latest first)
  async getPublicProjects() {
    const response = await databases.listDocuments(db, collectionId, [
      Query.orderDesc("$createdAt")   // 🔥 NEW
    ]);

    return response.documents.map(doc => ({
      id: doc.$id,
      name: doc.name,
      description: doc.description,
      tags: doc.tags,
      image: getFileView(doc.imageId),
      imageId: doc.imageId,
      link: doc.link,
      github: doc.github,
    }));
  },

  // ✅ CREATE (single project)
  async createProject(project: any) {
    return await databases.createDocument(db, collectionId, ID.unique(), {
      name: project.name,
      description: project.description,
      tags: project.tags || [],
      imageId: project.imageId,
      link: project.link,
      github: project.github || "",
    });
  },

  // ✅ DELETE (optional future use)
  async deleteProject(id: string) {
    return await databases.deleteDocument(db, collectionId, id);
  }
};