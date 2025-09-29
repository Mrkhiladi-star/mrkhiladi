import { db } from "../name";
import createProjectCollection from "./projects.collection";
import createSkillCollection from "./skills.collection";
import createContactCollection from "./contacts.collection";
import { databases } from "./config";
import createProfileCollection from "./profile.collection";
import createExperienceCollection from "./experience.collection";
import createEducationCollection from "./education.collection";
import createAchievementsCollection from "./achievements.collection";
import createBlogCollection from "./blog.collection";
import createArticleCollection from "./article.collection";
export default async function getOrCreateDB(){
  try {
    await databases.get(db)
    console.log("Database connection")
  } catch (error) {
    try {
      await databases.create(db, db)
      console.log("database created")
      await Promise.all([
        createProjectCollection(),
        createSkillCollection(),
        createContactCollection(),
        createProfileCollection(),
        createExperienceCollection(),
        createEducationCollection(),
        createAchievementsCollection(),
        createBlogCollection(),
        createArticleCollection(),
      ])
      console.log("Collection created")
      console.log("Database connected")
    } catch (error) {
      console.log("Error creating databases or collection", error)
    }
  }
  return databases
}