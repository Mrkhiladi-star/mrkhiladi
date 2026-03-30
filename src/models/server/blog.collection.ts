import { ID, Permission, Query } from "node-appwrite";
import { db, blogCollection as collectionId } from "../name";
import { databases } from "./config";
import { getFileView } from "@/lib/appwrite";

export default async function createBlogCollection() {
  try {
    await databases.createCollection(
      db,
      collectionId,
      "Blog",
      [
        Permission.read("any"),
        Permission.create("users"),
        Permission.update("users"),
        Permission.delete("users"),
      ]
    );

    await Promise.all([
      databases.createStringAttribute(db, collectionId, "title", 200, true),
      databases.createStringAttribute(db, collectionId, "content", 10000, true), // ✅ important
      databases.createStringAttribute(db, collectionId, "date", 50, true),
      databases.createStringAttribute(db, collectionId, "readTime", 50, true),
      databases.createStringAttribute(db, collectionId, "tags", 500, true, undefined, true),
      databases.createStringAttribute(db, collectionId, "imageId", 500, false),
      databases.createStringAttribute(db, collectionId, "slug", 200, true),
      databases.createStringAttribute(db, collectionId, "author", 100, false),
    ]);

    console.log("✅ Blog collection created");
  } catch (error) {
    console.log("⚠️ Blog collection already exists");
  }
}

export const blogCollection = {

  async getPublicPosts() {
    const response = await databases.listDocuments(db, collectionId, [
      Query.orderDesc("$createdAt")
    ]);

    return response.documents.map(doc => ({
      id: doc.$id,
      title: doc.title,
      content: doc.content, // ✅ used for excerpt
      date: doc.date,
      readTime: doc.readTime,
      tags: doc.tags || [],
      imageId: doc.imageId || "",
      image: doc.imageId ? getFileView(doc.imageId) : null,
      slug: doc.slug,
      author: doc.author || "Ramu Yadav",
    }));
  },

  async getPublicPostBySlug(slug: string) {
    const response = await databases.listDocuments(db, collectionId, [
      Query.equal("slug", slug),
      Query.limit(1)
    ]);

    if (!response.documents.length) return null;

    const doc = response.documents[0];

    return {
      id: doc.$id,
      title: doc.title,
      content: doc.content,
      date: doc.date,
      readTime: doc.readTime,
      tags: doc.tags || [],
      imageId: doc.imageId || "",
      image: doc.imageId ? getFileView(doc.imageId) : null,
      slug: doc.slug,
      author: doc.author || "Ramu Yadav",
    };
  },

  async createBlog(data: any) {
    return await databases.createDocument(
      db,
      collectionId,
      ID.unique(),
      {
        title: data.title,
        content: data.content,
        date: data.date,
        readTime: data.readTime,
        tags: data.tags || [],
        imageId: data.imageId,
        slug: data.slug.trim(),
        author: data.author || "Ramu Yadav",
      }
    );
  },
};