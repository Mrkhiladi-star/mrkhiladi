"use client";
import React, { useEffect } from "react";
import { BackgroundBeams } from "@/components/ui/background-beams";

const Layout = ({ children }: { children: React.ReactNode }) => {

  useEffect(() => {
    const sessionId = localStorage.getItem("sessionId");

    // 🔥 already logged in → dashboard
    if (sessionId) {
      window.location.href = "/dashboard";
    }
  }, []);

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center py-12">
      <BackgroundBeams />
      <div className="relative">{children}</div>
    </div>
  );
};

export default Layout;