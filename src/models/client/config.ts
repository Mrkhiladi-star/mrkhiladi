import env from "@/app/env"
import { Client, Account, Avatars, Databases, Storage } from "appwrite";
const client = new Client()
    .setEndpoint(env.appwrite.endpoint)
    .setProject(env.appwrite.projectId);

// 🔥 Manual session attach
export const setClientSession = () => {
  if (typeof window !== "undefined") {
    const sessionId = localStorage.getItem("sessionId");
    if (sessionId) {
      client.setSession(sessionId);
    }
  }
};
const databases = new Databases(client)
const account = new Account(client);
const avatars = new Avatars(client);
const storage = new Storage(client);
export { client, databases, account, avatars, storage }

