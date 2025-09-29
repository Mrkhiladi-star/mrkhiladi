import { Permission } from "node-appwrite";
import { db, profileCollection as collectionId } from "../name";
import { databases } from "./config";
import { getFileView } from "@/lib/appwrite";
export default async function createProfileCollection() {
  try {
    await databases.createCollection(
      db,
      collectionId,
      "Profile",
      [
        Permission.read("any"),
        Permission.create("users"),
        Permission.update("users"),
        Permission.delete("users"),
      ]
    );
    console.log("Profile Collection created");
    await Promise.all([
      databases.createStringAttribute(db, collectionId, "name", 100, true),
      databases.createStringAttribute(db, collectionId, "title", 100, true),
      databases.createStringAttribute(db, collectionId, "introDescription", 2000, true),
      databases.createStringAttribute(db, collectionId, "bio", 5000, false),
      databases.createStringAttribute(db, collectionId, "profileImageId", 500, false),
      databases.createStringAttribute(db, collectionId, "email", 100, true),
      databases.createStringAttribute(db, collectionId, "phone", 20, false),
      databases.createStringAttribute(db, collectionId, "location", 100, false),
      databases.createStringAttribute(db, collectionId, "socialLinks", 2000, false),
      databases.createStringAttribute(db, collectionId, "stats", 2000, false),
      databases.createStringAttribute(db, collectionId, "personalInfo", 2000, false),
    ]);
    console.log("Profile Attributes created");
  } catch (error) {
    console.error("Error creating profile collection or attributes:", error);
  }
}
export const profileCollection = {
  async getPublicIntro() {
    const response = await databases.listDocuments(db, collectionId);
    const profile = response.documents[0];
    
    if (!profile) {
      console.error("Profile document not found. Returning null.");
      return null;
    }
    return {
      greeting: profile.greeting,
      name: profile.name,
       subtitle: profile.subtitle,
      description: profile.introDescription,
  
    };
  },
  async getPublicAbout() {
    const response = await databases.listDocuments(db, collectionId);
    const profile = response.documents[0];

    if (!profile) {
      console.error("Profile document not found. Returning null.");
      return null; 
    }
    return {
      bio: profile.bio,
      image: profile.profileImageId ? getFileView(profile.profileImageId) : null,
      personalInfo: JSON.parse(profile.personalInfo || '[]'),
    };
  },
  async updateIntro(data: any) {
    const response = await databases.listDocuments(db, collectionId);
    const profile = response.documents[0];

    if (profile) {
      return await databases.updateDocument(db, collectionId, profile.$id, {
        greeting:data.greeting,
        name: data.name,
        subtitle: data.subtitle,
        introDescription: data.description,
        email: data.email,
      });
    } else {
      return await databases.createDocument(db, collectionId, 'unique()', {
        greeting:data.greeting,
        name: data.name,
        subtitle: data.subtitle,
        introDescription: data.description,
        email: data.email,
      });
    }
  },
  async updateAbout(data: any) {
    const response = await databases.listDocuments(db, collectionId);
    const profile = response.documents[0];

    if (profile) {
      return await databases.updateDocument(db, collectionId, profile.$id, {
        bio: data.bio,
        profileImageId: data.image,
        personalInfo: JSON.stringify(data.personalInfo),
        email: data.email,
      });
    } else {
      throw new Error("Profile document not found. Cannot create from 'about' tab alone. Please fill out the 'Intro' form first.");
    }
  },
};