'use client';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useAuthStore } from '@/store/Auth';
import { getIntroData } from '@/app/actions/get-intro-data';
import { DotLoader } from '@/components/ui/DotLoader';
interface IntroData {
  greeting: string;
  name: string;
  description: string;
  subtitle: string;
}
const LiveIndicator = () => (
  <div className="flex items-center space-x-2 mb-4">
    <span className="relative flex h-3 w-3">
      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-60"></span>
      <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
    </span>
    <span className="text-xs text-green-400">Available for New Ideas 🌟</span>
  </div>
);
const Star = ({ style }: { style: React.CSSProperties }) => (
  <motion.div
    style={style}
    initial={{ opacity: 0.1 }}
    animate={{ opacity: [0.1, 0.9, 0.1] }}
    transition={{
      duration: 1.5 + Math.random() * 2,
      repeat: Infinity,
      delay: Math.random() * 3,
    }}
    className="absolute rounded-full bg-white shadow-[0_0_8px_2px_rgba(255,255,255,0.9)] z-20"
  />
);
export default function Intro() {
  const [introData, setIntroData] = useState<IntroData | null>(null);
  const isAdmin = useAuthStore();

  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    try {
      const data = await getIntroData();
      setIntroData(data);
    } catch (error) {
      console.error('Error fetching intro data:', error);
    }
  };
  if (!introData) {
    return (
      <div className="h-screen flex items-center justify-center bg-black">
        <DotLoader />
      </div>
    );
  }
  return (
    <section className="relative min-h-screen flex items-center px-6 md:px-12 lg:px-20 py-20 overflow-hidden bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white">
      {/* stars bg */}
      <div className="pointer-events-none absolute inset-0 z-0">
        {Array.from({ length: 80 }).map((_, i) => (
          <Star
            key={i}
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              width: `${2 + Math.random() * 3}px`,
              height: `${2 + Math.random() * 3}px`,
            }}
          />
        ))}
      </div>
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-1/3 transform -translate-x-1/2 -translate-y-1/2 w-[60rem] h-[60rem] rounded-full opacity-5 bg-gradient-to-r from-pink-500 to-indigo-500 blur-3xl animate-slow-blob"></div>
        <div className="absolute w-96 h-96 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 opacity-20 blur-2xl transform translate-x-[-10%] animate-blob-slow" style={{ top: '5%', left: '5%' }} />
        <div className="absolute w-72 h-72 rounded-full bg-gradient-to-r from-emerald-400 to-teal-600 opacity-15 blur-2xl transform animate-blob-slow" style={{ top: '60%', left: '10%' }} />
        <div className="absolute w-80 h-80 rounded-full bg-gradient-to-r from-pink-400 to-orange-400 opacity-15 blur-2xl transform animate-blob-slow" style={{ top: '20%', right: '5%' }} />
      </div>
      <div className="relative z-30 max-w-7xl mx-auto w-full grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          className="space-y-6"
        >
          <div className="flex items-center">
            <p className="text-2xl font-medium text-cyan-300">{introData.greeting}</p>
            <div className="ml-12 sm:ml-20 md:ml-48">
              <LiveIndicator />
            </div>
          </div>
          <h1 className="text-5xl md:text-6xl font-extrabold mb-2 pb-2 bg-gradient-to-r from-purple-400 via-indigo-400 to-cyan-400 bg-clip-text text-transparent">
            {introData.name}
          </h1>
          <h2 className="text-2xl md:text-3xl text-indigo-300 font-semibold">{introData.subtitle}</h2>
          <p className="text-lg md:text-xl max-w-xl text-gray-200 opacity-90 leading-relaxed">
            {introData.description}
          </p>
          <div className="mt-6 flex gap-4 items-center">
            <a href="#projects">
              <button className="px-6 py-3 border border-gray-200 rounded-lg hover:bg-gray-700 transition-colors text-sm">
                View My Work
              </button>
            </a>
            <a
              href="documents/cv.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 border border-gray-200 rounded-lg hover:bg-gray-700 transition-colors text-sm"
            >
              Download CV
            </a>
            <a
              href="mailto:mrkhiladi9794@gmail.com"
              className="px-6 py-3 border border-gray-200 rounded-lg hover:bg-gray-700 transition-colors text-sm"
            >
              Email Me
            </a>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative w-full h-[420px] flex items-center justify-center"
        >
<div className="flex md:hidden gap-3 flex-wrap justify-center w-full">
  <img
    src="/images/profile/photo1.jpg"
    alt="Photo 1"
    className="flex-1 max-w-[100px] rounded-2xl object-cover shadow-2xl border-4 border-white"
  />
  <img
    src="/images/profile/photo2.jpg"
    alt="Photo 2"
    className="flex-1 max-w-[120px] rounded-2xl object-cover shadow-2xl border-4 border-white"
  />
  <img
    src="/images/profile/photo3.jpg"
    alt="Photo 3"
    className="flex-1 max-w-[100px] rounded-2xl object-cover shadow-2xl border-4 border-white"
  />
</div>
          <div className="hidden md:block relative w-full h-full">
            <motion.div
              whileHover={{ scale: 1.03, rotate: -3 }}
              className="absolute rounded-2xl overflow-hidden shadow-2xl border-4 border-white dark:border-gray-800"
              style={{ width: 170, height: 260, top: 40, left: 20, transform: 'rotate(-8deg)' }}
            >
              <img src="/images/profile/photo1.jpg" alt="Photo 1" className="w-full h-full object-cover" />
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.04, rotate: 0 }}
              className="absolute rounded-2xl overflow-hidden shadow-2xl border-4 border-white dark:border-gray-800"
              style={{ width: 220, height: 320, top: 0, left: 120, zIndex: 20 }}
            >
              <img src="/images/profile/photo2.jpg" alt="Photo 2" className="w-full h-full object-cover" />
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.03, rotate: 4 }}
              className="absolute rounded-2xl overflow-hidden shadow-2xl border-4 border-white dark:border-gray-800"
              style={{ width: 170, height: 260, top: 80, left: 260, transform: 'rotate(8deg)', zIndex: 10 }}
            >
              <img src="/images/profile/photo3.jpg" alt="Photo 3" className="w-full h-full object-cover" />
            </motion.div>
          </div>
        </motion.div>
      </div>

      <style jsx global>{`
        @keyframes blobSlow {
          0% { transform: translateY(0px) scale(1); }
          33% { transform: translateY(-20px) scale(1.05); }
          66% { transform: translateY(10px) scale(0.98); }
          100% { transform: translateY(0px) scale(1); }
        }
        .animate-blob-slow { animation: blobSlow 12s ease-in-out infinite; }
        .animate-slow-blob { animation: blobSlow 18s ease-in-out infinite; }

        @keyframes floatSlow {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-8px); }
          100% { transform: translateY(0px); }
        }
        .collage-float { animation: floatSlow 6s ease-in-out infinite; }
      `}</style>
    </section>
  );
}
