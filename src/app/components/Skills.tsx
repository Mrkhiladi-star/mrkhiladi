'use client';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { getSkillsData } from '@/app/actions/get-skills-data';
import { DotLoader } from '@/components/ui/DotLoader';
import { BackgroundBeams } from '@/components/ui/background-beams';
interface Skill {
  id: string;
  name: string;
  category: string;
  proficiency: number;
  icon: string;
}
export default function Skills() {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getSkillsData();
        setSkills(data);
      } catch (error) {
        console.error('Error fetching skills:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center bg-black">
        <DotLoader />
      </div>
    );
  }
  return (
   <section
  id="skills"
  className="relative py-20 px-4 md:px-8 lg:px-16 bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white -mt-16 overflow-hidden"
>
   <BackgroundBeams />
  <div className="relative z-10 max-w-6xl mx-auto">
    <h2 className="text-4xl font-bold text-center mb-16 text-gray-100">
      Skills & Expertise
    </h2>
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {skills.map((skill, index) => (
        <motion.div
          key={skill.id}
          initial={{ opacity: 0, y: 20, scale: 0.9 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.4, delay: index * 0.05 }}
          whileHover={{ scale: 1.05, rotate: 1 }}
          className="flex flex-col items-center justify-center bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 hover:shadow-xl hover:border hover:border-indigo-400 transition-all duration-300"
        >
          {skill.icon ? (
            <Image src={skill.icon} alt={skill.name} width={60} height={60} className="mb-3" />
          ) : (
            <div className="w-14 h-14 mb-3 flex items-center justify-center bg-gray-300 rounded-full text-lg text-black">
              ?
            </div>
          )}
          <span className="text-gray-800 dark:text-gray-200 font-medium text-base text-center">
            {skill.name}
          </span>
        </motion.div>
      ))}
    </div>
  </div>
</section>

  );
}
