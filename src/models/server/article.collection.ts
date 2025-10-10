import { Permission, Query, ID } from "node-appwrite";
import { db, articleCollection as collectionId } from "../name";
import { databases } from "./config";
export default async function createArticleCollection() {
  try {
    await databases.createCollection(
      db,
      collectionId,
      "Articles",
      [
        Permission.read("any"), 
        Permission.create("users"), 
        Permission.update("users"), 
        Permission.delete("users"), 
      ]
    );
    console.log("Article Collection Created");
    await Promise.all([
      databases.createStringAttribute(db, collectionId, "title", 200, true),
      databases.createStringAttribute(db, collectionId, "excerpt", 500, false),
      databases.createStringAttribute(db, collectionId, "content", 20000, true),
      databases.createStringAttribute(db, collectionId, "date", 50, true),
      databases.createStringAttribute(db, collectionId, "readTime", 50, true),
      databases.createStringAttribute(db, collectionId, "tags", 500, true, undefined, true),
      databases.createStringAttribute(db, collectionId, "imageId", 500, true),
      databases.createStringAttribute(db, collectionId, "category", 100, true),
      databases.createStringAttribute(db, collectionId, "slug", 200, true),
      databases.createBooleanAttribute(db, collectionId, "isFeatured", false),
    ]);
    console.log("Article Attributes Created");
  } catch (error) {
    console.error("Error creating article collection or attributes:", error);
    throw error; 
  }
}
export const articleCollection = {
  async getPublicArticles() {
    try {
       const response = await databases.listDocuments(db, collectionId, [
              Query.orderDesc("date") 
          ]);
      return response.documents.map(doc => ({
        id: doc.$id,
        title: doc.title,
        excerpt: doc.excerpt,
        content: doc.content,
        date: doc.date,
        readTime: doc.readTime,
        tags: doc.tags,
        image: doc.imageId,
        category: doc.category,
        slug: doc.slug,
        isFeatured: doc.isFeatured,
      }));
    } catch (error) {
      console.error("Error getting articles:", error);
      throw error;
    }
  },
  async getPublicArticleBySlug(slug: string) {
    try {
      const response = await databases.listDocuments(db, collectionId, [
        Query.equal("slug", slug)
      ]);
      
      if (response.documents.length === 0) return null;
      
      const doc = response.documents[0];
      return {
        id: doc.$id,
        title: doc.title,
        excerpt: doc.excerpt,
        content: doc.content,
        date: doc.date,
        readTime: doc.readTime,
        tags: doc.tags,
        image: doc.imageId,
        category: doc.category,
        slug: doc.slug,
        isFeatured: doc.isFeatured,
      };
    } catch (error) {
      console.error("Error getting article by slug:", error);
      throw error;
    }
  },

  async getPulicArticleById(id: string) {
    try {
      const doc = await databases.getDocument(db, collectionId, id);
      return {
        id: doc.$id,
        title: doc.title,
        excerpt: doc.excerpt,
        content: doc.content,
        date: doc.date,
        readTime: doc.readTime,
        tags: doc.tags,
        image: doc.imageId,
        category: doc.category,
        slug: doc.slug,
        isFeatured: doc.isFeatured,
      };
    } catch (error) {
      console.error("Error getting article by ID:", error);
      throw error;
    }
  },

  async getPublicFeaturedArticles() {
    try {
      const response = await databases.listDocuments(db, collectionId, [
        Query.equal("isFeatured", true)
      ]);
      
      return response.documents.map(doc => ({
        id: doc.$id,
        title: doc.title,
        excerpt: doc.excerpt,
        content: doc.content, 
        date: doc.date,
        readTime: doc.readTime,
        tags: doc.tags,
        image: doc.imageId,
        category: doc.category,
        slug: doc.slug,
      }));
    } catch (error) {
      console.error("Error getting featured articles:", error);
      throw error;
    }
  },
  async getPublicArticlesByCategory(category: string) {
    try {
      const response = await databases.listDocuments(db, collectionId, [
        Query.equal("category", category)
      ]);
    
      return response.documents.map(doc => ({
        id: doc.$id,
        title: doc.title,
        excerpt: doc.excerpt,
        content: doc.content, 
        date: doc.date,
        readTime: doc.readTime,
        tags: doc.tags,
        image: doc.imageId,
        slug: doc.slug,
        category: doc.category,
      }));
    } catch (error) {
      console.error("Error getting articles by category:", error);
      throw error;
    }
  },
  async createArticle(articleData: { title: any; excerpt: any; content: any; date: any; readTime: any; tags: any; image: any; category: any; slug: any; isFeatured: any; }) {
    try {
      const doc = await databases.createDocument(db, collectionId, ID.unique(), {
        title: articleData.title,
        excerpt: articleData.excerpt,
        content: articleData.content,
        date: articleData.date || new Date().toISOString().split('T')[0],
        readTime: articleData.readTime || '5 min',
        tags: articleData.tags || [],
        imageId: articleData.image,
        category: articleData.category || 'General',
        slug: articleData.slug,
        isFeatured: articleData.isFeatured || false,
      });
      return doc.$id;
    } catch (error) {
      console.error("Error creating article:", error);
      throw error;
    }
  },
  async updateArticle(id: string, articleData: { title: any; excerpt: any; content: any; date: any; readTime: any; tags: any; image: any; category: any; slug: any; isFeatured: any; }) {
    try {
      await databases.updateDocument(db, collectionId, id, {
        title: articleData.title,
        excerpt: articleData.excerpt,
        content: articleData.content,
        date: articleData.date,
        readTime: articleData.readTime,
        tags: articleData.tags,
        imageId: articleData.image,
        category: articleData.category,
        slug: articleData.slug,
        isFeatured: articleData.isFeatured,
      });
    } catch (error) {
      console.error("Error updating article:", error);
      throw error;
    }
  },
  async deleteArticle(id: string) {
    try {
      await databases.deleteDocument(db, collectionId, id);
    } catch (error) {
      console.error("Error deleting article:", error);
      throw error;
    }
  },

  async updateArticles(articles: any[]) {
    try {
      const existingArticles = await this.getPublicArticles();
      const updatePromises = [];
      for (const article of articles) {
        if (article.id) {
          const existingArticle = existingArticles.find(a => a.id === article.id);
          if (existingArticle) {
            updatePromises.push(this.updateArticle(article.id, article));
          } else {
            updatePromises.push(this.createArticle(article));
          }
        } else {
          updatePromises.push(this.createArticle(article));
        }
      }
      const articlesToDelete = existingArticles.filter(
        existing => !articles.find(a => a.id === existing.id)
      );
      for (const article of articlesToDelete) {
        updatePromises.push(this.deleteArticle(article.id));
      }
      await Promise.all(updatePromises);
      return articles;
    } catch (error) {
      console.error("Error updating articles:", error);
      throw error;
    }
  },
};