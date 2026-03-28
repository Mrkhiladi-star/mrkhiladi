"use client";

import { useEffect, useState } from "react";
import { useAuthStore } from "@/store/Auth";
import AdminDashboard from "@/app/components/AdminDashboard";

export default function DashboardPage() {
  const { verifySession, user } = useAuthStore();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const init = async () => {
      const sessionId = localStorage.getItem("sessionId");

      if (!sessionId) {
        window.location.href = "/login";
        return;
      }

      await verifySession(); // 🔥 WAIT
      setLoading(false);
    };

    init();
  }, []);

  if (loading) {
    return <div className="text-center mt-10">Loading...</div>;
  }

  if (!user) {
    return <div>You need to be logged in to access this page.</div>;
  }

  return <AdminDashboard />;
}