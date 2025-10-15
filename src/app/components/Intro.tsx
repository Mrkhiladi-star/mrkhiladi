'use client';
import { useEffect, useState } from 'react';
import { motion, Transition, Variants } from 'framer-motion';
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
  <div className="flex items-center space-x-2">
    <span className="relative flex h-2.5 w-2.5">
      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
      <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500"></span>
    </span>
    <span className="text-sm font-medium text-green-400">Available for New Ideas 🌟</span>
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
    className="absolute rounded-full bg-white shadow-[0_0_8px_1px_rgba(255,255,255,0.7)] z-20"
  />
);
const springTransition: Transition = {
  type: 'spring',
  stiffness: 100,
  damping: 15,
};

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: springTransition,
  },
};

const imageVariants: Variants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      ...springTransition,
      delay: 0.4,
      stiffness: 50,
    } as Transition,
  },
};
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
      <div className="min-h-screen flex items-center justify-center bg-black">
        <DotLoader />
      </div>
    );
  }
  const { greeting, name, subtitle, description } = introData;
  return (
    <section className="relative min-h-screen flex items-center px-6 md:px-16 lg:px-32 py-24 overflow-hidden bg-gradient-to-b from-gray-950 via-gray-900 to-black text-white">
      <div className="pointer-events-none absolute inset-0 z-0">
        {Array.from({ length: 80 }).map((_, i) => (
          <Star
            key={i}
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              width: `${1 + Math.random() * 1}px`,
              height: `${1 + Math.random() * 1}px`,
            }}
          />
        ))}
      </div>
      <motion.div
        className="relative z-10 max-w-7xl mx-auto w-full grid grid-cols-1 md:grid-cols-12 gap-12 items-center"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="md:col-span-7 space-y-6 lg:space-y-8 order-2 md:order-1">
          <motion.div
            variants={itemVariants}
            className="flex items-center justify-between sm:justify-start sm:space-x-8"
          >
            <p className="text-xl md:text-2xl font-normal text-gray-400">
              {greeting}
            </p>
            <LiveIndicator />
          </motion.div>
          <motion.h1
            variants={itemVariants}
            className="text-6xl md:text-7xl lg:text-8xl font-extrabold leading-tight text-white"
          >
            {name}
          </motion.h1>
          <motion.div variants={itemVariants} className="space-y-4 pt-2">
            <h2 className="text-2xl md:text-3xl font-semibold text-cyan-400">
              {subtitle}
            </h2>
            <p className="text-lg md:text-xl max-w-xl text-gray-300 leading-relaxed">
              {description}
            </p>
          </motion.div>
          <motion.div variants={itemVariants} className="mt-8 flex flex-col sm:flex-row gap-4">
            <a href="#projects" className="w-full sm:w-auto">
              <button
                className="w-full sm:w-auto px-8 py-3 font-medium rounded-lg border border-gray-600 text-gray-200 hover:bg-gray-800 transition-colors text-base"
              >
                View My Work
              </button>
            </a>
            <a
              href="documents/cv.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto"
            >
              <button className="w-full sm:w-auto px-8 py-3 font-medium rounded-lg border border-gray-600 text-gray-200 hover:bg-gray-800 transition-colors text-base">
                Download CV
              </button>
            </a>
            <a
              href="mailto:mrkhiladi9794@gmail.com"
              className="w-full sm:w-auto"
            >
              <button className="w-full sm:w-auto px-8 py-3 font-medium rounded-lg border border-gray-600 text-gray-200 hover:bg-gray-800 transition-colors text-base">
                Email Me
              </button>
            </a>
          </motion.div>
        </div>
        <motion.div
          variants={imageVariants}
          className="md:col-span-5 flex justify-center md:justify-end order-1 md:order-2 p-4"
        >
          <div className="relative">
            <div className="w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden shadow-2xl ring-4 ring-offset-4 ring-offset-gray-950 ring-cyan-500/50 transition-all hover:ring-cyan-500/80">
              <img
                src="/images/profile/photo2.jpg"
                alt={`${name} Profile`}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}