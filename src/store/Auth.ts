import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { persist } from "zustand/middleware";
import { AppwriteException, Models } from "appwrite";
import { account } from "@/models/client/config";
import { setClientSession } from "@/models/client/config";

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

      // ✅ Stable verifySession
      async verifySession() {
        try {
          const sessionId =
            typeof window !== "undefined"
              ? localStorage.getItem("sessionId")
              : null;

          if (!sessionId) throw new Error("No session");

          // 🔥 always attach latest session
          setClientSession();

          const user = await account.get<AdminPrefs>();

          set({
            session: { $id: sessionId } as any,
            user,
            isLoggedIn: true,
            isAdmin:
              user.email === process.env.NEXT_PUBLIC_ADMIN_EMAIL,
          });
        } catch {
          // 🔥 cleanup if invalid
          if (typeof window !== "undefined") {
            localStorage.removeItem("sessionId");
          }

          set({
            session: null,
            user: null,
            isLoggedIn: false,
            isAdmin: false,
          });
        }
      },

      // ✅ Login (with duplicate session fix)
      async login(email: string, password: string) {
        try {
          // 🔥 delete old session first (important fix)
          await account.deleteSession("current").catch(() => {});

          const session =
            await account.createEmailPasswordSession(email, password);

          if (typeof window !== "undefined") {
            localStorage.setItem("sessionId", session.$id);
          }

          // 🔥 attach immediately
          setClientSession();

          const user = await account.get<AdminPrefs>();

          set({
            session,
            user,
            isLoggedIn: true,
            isAdmin:
              user.email === process.env.NEXT_PUBLIC_ADMIN_EMAIL,
          });

          return { success: true };
        } catch (error) {
          console.error("Login failed:", error);
          return {
            success: false,
            error: error instanceof AppwriteException ? error : null,
          };
        }
      },

      // ✅ Logout clean
      async logout() {
        try {
          if (typeof window !== "undefined") {
            localStorage.removeItem("sessionId");
          }

          await account.deleteSession("current").catch(() => {});

          set({
            session: null,
            user: null,
            isLoggedIn: false,
            isAdmin: false,
          });
        } catch (error) {
          console.error("Logout failed:", error);
        }
      },
    })),
    {
      name: "auth",

      // 🔥 persist only safe data
      partialize: (state) => ({
        user: state.user,
        isAdmin: state.isAdmin,
      }),

      onRehydrateStorage() {
        return (state, error) => {
          if (!error) state?.setHydrated();
        };
      },
    }
  )
);