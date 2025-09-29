import { Permission, Query } from "node-appwrite";
import { db, blogCollection as collectionId } from "../name";
import { databases } from "./config";
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
    console.log("Blog Collection Created");
    await Promise.all([
      databases.createStringAttribute(db, collectionId, "title", 200, true),
      databases.createStringAttribute(db, collectionId, "excerpt", 500, true),
      databases.createStringAttribute(db, collectionId, "content", 10000, true),
      databases.createStringAttribute(db, collectionId, "date", 50, true),
      databases.createStringAttribute(db, collectionId, "readTime", 50, true),
      databases.createStringAttribute(db, collectionId, "tags", 500, true, undefined, true),
      databases.createStringAttribute(db, collectionId, "imageId", 500, true),
      databases.createStringAttribute(db, collectionId, "slug", 200, true),
    ]);
    console.log("Blog Attributes Created");
  } catch (error) {
    console.error("Error creating blog collection or attributes:", error);
  }
}
export const blogCollection = {
  async getPublicPosts() {
    const response = await databases.listDocuments(db, collectionId);
    return response.documents.map(doc => ({
      id: doc.$id,
      title: doc.title,
      excerpt: doc.excerpt,
      date: doc.date,
      readTime: doc.readTime,
      tags: doc.tags,
       image: doc.imageId,
      slug: doc.slug,
    }));
  },
  async getPublicPostBySlug(slug: string) {
    const response = await databases.listDocuments(db, collectionId, [
      Query.equal("slug", slug)
    ]);
    if (response.documents.length === 0) return null;
    const doc = response.documents[0];
    return {
      id: doc.$id,
      title: doc.title,
      content: doc.content,
      date: doc.date, 
      readTime: doc.readTime,
      tags: doc.tags,
       image: doc.imageId,
      slug: doc.slug,
    };
  },
  async updatePosts(posts: any[]) {
    const existingPosts = await databases.listDocuments(db, collectionId);
    await Promise.all(existingPosts.documents.map(post => 
      databases.deleteDocument(db, collectionId, post.$id)
    ));
    return await Promise.all(posts.map(post =>
      databases.createDocument(db, collectionId, 'unique()', {
        title: post.title,
        excerpt: post.excerpt,
        content: post.content,
        date: post.date,
        readTime: post.readTime,
        tags: post.tags,
        imageId: post.image,
        slug: post.slug,
      })
    ));
  },
};