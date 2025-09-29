import { Permission } from "node-appwrite";
import { portfolioImagesBucket } from "../name";
import { storage } from "./config";
export async function getOrCreatePortfolioStorage() {
  try {
    await storage.getBucket(portfolioImagesBucket);
    console.log("Portfolio Images Storage Connected");
  } catch (error) {
    try {
      await storage.createBucket(
        portfolioImagesBucket,
        "Portfolio Images",
        [
          Permission.read("any"),
          Permission.create("users"),
          Permission.update("users"),
          Permission.delete("users"),
        ],
        false,
        undefined,
        undefined,
        ["jpg", "png", "gif", "jpeg", "webp", "svg"]
      );
      console.log("Portfolio Images Storage Created");
    } catch (createError) {
      console.error("Error creating portfolio images storage:", createError);
    }
  }
}