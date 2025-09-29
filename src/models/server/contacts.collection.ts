import { Permission, IndexType } from "node-appwrite";
import { db, contactCollection } from "../name";
import { databases } from "./config";
export default async function createContactCollection() {
  try {
    await databases.createCollection(
      db,
      contactCollection,
      contactCollection,
      [
        Permission.read("any"),   
        Permission.create("any"),   
        Permission.update("users"), 
        Permission.delete("users"), 
      ]
    );
    console.log("Contact Collection created");
    await Promise.all([
      databases.createStringAttribute(db, contactCollection, "name", 255, true),
      databases.createStringAttribute(db, contactCollection, "email", 255, true), 
      databases.createStringAttribute(db, contactCollection, "message", 10000, true),
    ]);
    console.log("Contact Attributes created");
    await databases.createIndex(
      db,
      contactCollection,
      "email",
      IndexType.Key,
      ["email"]
    );
    console.log("Contact Index created");
  } catch (error) {
    console.error("Error creating contact collection or attributes:", error);
    throw error; 
  }
}