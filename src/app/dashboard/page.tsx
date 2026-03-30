'use client';

import AdminDashboard from '@/app/components/AdminDashboard';
import { useAuthStore } from '@/store/Auth';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function DashboardPage() {

  const { session, hydrated } = useAuthStore();
  const router = useRouter();

  const [unauthorized, setUnauthorized] = useState(false);

  useEffect(() => {
    if (!hydrated) return;

    // ❌ NOT LOGGED IN
    if (!session) {
      setUnauthorized(true);

      setTimeout(() => {
        router.push('/');
      }, 2500);
    }
  }, [session, hydrated, router]);

  // ⏳ loading state
  if (!hydrated) return null;

  // 🚫 unauthorized UI
  if (unauthorized) {
    return (
      <div className="h-screen flex flex-col items-center justify-center bg-black text-white">

        <h1 className="text-3xl font-bold text-red-400 mb-4">
          🚫 Access Denied
        </h1>

        <p className="text-gray-400 text-center max-w-md">
          This area is restricted. Only authorized admins can access the dashboard.
        </p>

        <p className="mt-4 text-sm text-gray-500">
          Redirecting you to safety...
        </p>

      </div>
    );
  }

  // ✅ authorized
  return <AdminDashboard />;
}