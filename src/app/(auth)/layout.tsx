"use client";
import React, { useEffect } from "react";
import { BackgroundBeams } from "@/components/ui/background-beams";
import { useAuthStore } from "@/store/Auth";
import { useRouter } from "next/navigation";
const Layout = ({ children }: { children: React.ReactNode }) => {
  const { session, hydrated, verifySession } = useAuthStore();
  const router = useRouter();
  useEffect(() => {
    verifySession();
  }, []);
  useEffect(() => {
    if (session && hydrated) {
      router.push("/");
    }
  }, [session, hydrated, router]);
  if (!hydrated) {
    return null;
  }
  if (session) {
    return null;
  }

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center py-12">
      <BackgroundBeams />
      <div className="relative">{children}</div>
    </div>
  );
};
export default Layout;