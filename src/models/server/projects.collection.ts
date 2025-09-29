import { Permission } from "node-appwrite";
import { db, projectCollection as collectionId } from "../name";
import { databases } from "./config";
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
    console.log("Project Collection Created");
    await Promise.all([
      databases.createStringAttribute(db, collectionId, "name", 100, true),
      databases.createStringAttribute(db, collectionId, "description", 2000, true),
      databases.createStringAttribute(db, collectionId, "tags", 500, true, undefined, true),
      databases.createStringAttribute(db, collectionId, "imageId", 500, true),
      databases.createStringAttribute(db, collectionId, "link", 500, true),
      databases.createStringAttribute(db, collectionId, "github", 500, false),
    ]);
    console.log("Project Attributes Created");
  } catch (error) {
    console.error("Error creating project collection or attributes:", error);
  }
}
export const projectsCollection = {
  async getPublicProjects() {
    const response = await databases.listDocuments(db, collectionId);
    return response.documents.map(doc => ({
      id: doc.$id,
      name: doc.name,
      description: doc.description,
      tags: doc.tags,
      image: doc.imageId ,
      link: doc.link,
      github: doc.github,
    }));
  },
  async updateProjects(projects: any[]) {
    const existingProjects = await databases.listDocuments(db, collectionId);
    await Promise.all(existingProjects.documents.map(proj => 
      databases.deleteDocument(db, collectionId, proj.$id)
    ));
    return await Promise.all(projects.map(proj =>
      databases.createDocument(db, collectionId, 'unique()', {
        name: proj.name,
        description: proj.description,
        tags: proj.tags,
        imageId: proj.imageId,
        link: proj.link,
        github: proj.github,
      })
    ));
  },
};