'use client';
import { useEffect, useState } from 'react';
import AnimatedGridPattern from '@/components/magicui/animated-grid-pattern';
import { getAchievementsData } from '@/app/actions/get-achievements-data';
interface Achievement {
  id: string;
  title: string;
  organization: string;
  date: string;
  description: string;
  link?: string;
}
export default function Achievements() {
  const [achievements, setAchievements] = useState<Achievement[]>([]);

  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    try {
      const data = await getAchievementsData();
      if (data) {
        const ach = data.slice(0, 50);
        setAchievements(ach);
      } else {
        setAchievements(data || []);
      }
    } catch (error) {
      console.error('Error fetching achievements:', error);
    }
  };
  return (
    <section id="achievements" className="relative min-h-screen py-20 px-4 md:px-8 lg:px-16 bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white -mt-16 overflow-hidden">
      <AnimatedGridPattern
        numSquares={30}
        maxOpacity={0.1}
        duration={3}
        repeatDelay={1}
        className="absolute inset-0 pointer-events-none"
      />
      <div className="max-w-4xl mx-auto relative z-10">
        <h2 className="text-4xl font-bold text-center mb-16">My Achievements & Certifications 🏆</h2>

        <div className="space-y-8">
          {achievements.map((achievement, index) => (
            <div
              key={achievement.id}
              className="bg-gray-800 p-6 rounded-2xl shadow-2xl border-l-4 border-blue-500 hover:border-blue-400 transition-all duration-300"
            >
              <div className="flex justify-between items-start flex-wrap mb-4">
                <h3 className="text-2xl font-extrabold text-blue-400 w-full md:w-3/4 mb-2 md:mb-0">
                  {achievement.title}
                </h3>
                <p className="text-sm bg-gray-700 text-gray-200 px-3 py-1 rounded-full font-medium">
                  {achievement.date}
                </p>
              </div>
              <div className="flex items-center text-lg text-gray-300 mb-3">
                <svg className="w-5 h-5 mr-2 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>
                <span className="font-semibold">{achievement.organization}</span>
              </div>
              <p className="text-gray-400 mb-4">{achievement.description}</p>
              {achievement.link && (
                <a
                  href={achievement.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors duration-200 shadow-md"
                >
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                  View Certificate
                </a>
              )}
            </div>
          ))}
          {achievements.length === 0 && (
            <div className="text-center p-10 bg-gray-800 rounded-xl border border-gray-700">
              <p className="text-xl text-gray-400">No achievements added yet. Time to win some! 🎉</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}