'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/Auth';
import  {Confetti} from '@/components/magicui/confetti'; 
import AdminPanel from '@/components/ui/admin-panel';
export default function AdminDashboard() {
  const { user, logout, isAdmin, isLoggedIn } = useAuthStore();
  const [activeTab, setActiveTab] = useState('intro');
  const [showConfetti, setShowConfetti] = useState(false);
  const router = useRouter();
  useEffect(() => {
    if (isAdmin && showConfetti) {
      Confetti({
        particleCount: 100,
        spread: 70,
        origin: { x: 0.5, y: 0.6 }
      });
      const timer = setTimeout(() => setShowConfetti(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [isAdmin, showConfetti]);
  useEffect(() => {
    if (isAdmin) {
      setShowConfetti(true);
    }
  }, [isAdmin]);
  useEffect(() => {
    if (isLoggedIn && !isAdmin) {
      router.push('/');
    }
  }, [isLoggedIn, isAdmin, router]);
  if (!isLoggedIn) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>You need to be logged in to access this page.</p>
      </div>
    );
  }
  if (!isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Access denied. You need to be an admin to view this page.</p>
      </div>
    );
  }
  const tabs = [
    { id: 'intro', label: 'Intro' },
    { id: 'skills', label: 'Skills' },
    { id: 'experience', label: 'Experience' },
    { id: 'education', label: 'Education' },
    { id: 'achievements', label: 'Achievements' },
    { id: 'projects', label: 'Projects' },
    { id: 'about', label: 'About' },
    { id: 'blog', label: 'Blog' },
    { id: 'article', label: 'Article' },
  ];

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <header className="bg-white dark:bg-gray-800 shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <div className="flex items-center gap-4">
            <span className="text-2xl text-gray-600 font-bold dark:text-gray-400">
              Welcome, {user?.name || user?.email}
            </span>
          </div>
        </div>
      </header>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
          <div className="border-b border-gray-200 dark:border-gray-700">
            <nav className="flex overflow-x-auto -mb-px">
              {tabs.map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-4 px-6 font-medium text-sm whitespace-nowrap border-b-2 transition-colors duration-200 ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20'
                      : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>
          <div className="p-6">
            <AdminPanel activeTab={activeTab} />
          </div>
        </div>
      </div>
    </div>
  );
}