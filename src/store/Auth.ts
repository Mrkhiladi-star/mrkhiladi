import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { persist } from "zustand/middleware";
import { AppwriteException, Models } from "appwrite";
import { account } from "@/models/client/config";
interface AdminPrefs {}
interface IAuthStore {
  session: Models.Session | null;
  user: Models.User<AdminPrefs> | null;
  isLoggedIn: boolean;
  isAdmin: boolean;
  hydrated: boolean;
  setHydrated(): void;
  verifySession(): Promise<void>;
  login(
    email: string,
    password: string
  ): Promise<{
    success: boolean;
    error?: AppwriteException | null;
  }>;
  logout(): Promise<void>;
}
export const useAuthStore = create<IAuthStore>()(
  persist(
    immer((set) => ({
      session: null,
      user: null,
      isLoggedIn: false,
      isAdmin: false,
      hydrated: false,
      setHydrated() {
        set({ hydrated: true });
      },
      async verifySession() {
        try {
          const session = await account.getSession("current");
          const user = await account.get<AdminPrefs>();
          const isAdmin = user.email === process.env.NEXT_PUBLIC_ADMIN_EMAIL;
          set({ session, user, isLoggedIn: !!session, isAdmin });
        } catch (error) {
          set({ session: null, user: null, isLoggedIn: false, isAdmin: false });
        }
      },
      async login(email: string, password: string) {
        try {
          await account.deleteSessions().catch(() => {});
          const session = await account.createEmailPasswordSession(email, password);
          const user = await account.get<AdminPrefs>();
          const isAdmin = user.email === process.env.NEXT_PUBLIC_ADMIN_EMAIL;
          set({ session, user, isLoggedIn: !!session, isAdmin });
          return { success: true };
        } catch (error) {
          console.error("Login failed:", error);
          return {
            success: false,
            error: error instanceof AppwriteException ? error : null,
          };
        }
      },
      async logout() {
        try {
          const session = await account.getSession("current").catch(() => null);
          if (session) {
            await account.deleteSession("current");
          }
          set({ session: null, user: null, isLoggedIn: false, isAdmin: false });
          document.cookie
            .split(";")
            .forEach(
              (c) =>
                (document.cookie =
                  c.replace(/^ +/, "").replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/"))
            );
        } catch (error) {
          console.error("Logout failed:", error);
        }
      },
    })),
    {
      name: "auth",
      onRehydrateStorage() {
        return (state, error) => {
          if (!error) state?.setHydrated();
        };
      },
    }
  )
);
