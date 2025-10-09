'use client';
import { useEffect, useState } from 'react';
import { getEducationData } from '@/app/actions/get-education-data';
import { BackgroundBeams } from '@/components/ui/background-beams';
interface Education {
  id: string;
  institution: string;
  degree: string;
  field: string;
  duration: string;
  grade: string;
  description: string;
  location: string;
  image: string;
  level: number
}
export default function Education() {
  const [education, setEducation] = useState<Education[]>([]);
  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    try {
      const data = await getEducationData();
      setEducation(data as Education[]);
    } catch (error) {
      console.error('Error fetching education:', error); 
    }
  };
  const getAchievementCount = (degree: string) => {
    if (degree.toLowerCase().includes('bachelor of technology')) return 3;
    if (degree.toLowerCase().includes('12th grade') || degree.toLowerCase().includes('pcm')) return 2;
    return 0;
  };
  return (
    <section id="education" className="relative min-h-screen py-20 px-4 md:px-8 lg:px-16 bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white -mt-16 overflow-hidden">
      <BackgroundBeams />
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-4 text-white">Academic Odyssey</h2>
        <p className="text-center text-lg text-gray-400 mb-16">
          Learning never stops, excellence never settles. This is my path of knowledge and achievement.
        </p>
        <div className="grid grid-cols-1 gap-6">
          {education.map(edu => (
            <div
              key={edu.id}
              className="relative w-full overflow-hidden rounded-xl shadow-2xl bg-gray-800 border border-gray-700"
            >
              <div
                className="h-48 md:h-64 bg-cover bg-center relative"
                style={{ backgroundImage: `url(${edu.image})` }}
              >
                <div className="absolute inset-0 bg-black opacity-40"></div>
                <div className="absolute inset-0 p-6 flex flex-col justify-end text-white">
                  <h3 className="text-2xl font-bold z-10">{edu.institution}</h3>
                  <p className="flex items-center text-sm font-light z-10 mt-1">
                    📍 {edu.location}
                  </p>
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-center mb-3">
                  <p className="text-xl font-bold mr-4 flex items-center">
                    <span className="text-blue-400 mr-2">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l9-5-9-5-9 5 9 5zM12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055v-6.055zM12 14l-6.16-3.422a12.083 12.083 0 01-.665 6.479A11.952 11.952 0 0112 20.055v-6.055z" /></svg>
                    </span>
                    {edu.degree}
                  </p>
                  <div className="flex space-x-2 ml-auto">
                    <span className="bg-gray-700 text-gray-200 text-sm font-medium px-3 py-1 rounded-full">
                      {edu.duration}
                    </span>
                    {edu.grade && (
                      <span className="bg-green-700 text-white text-sm font-medium px-3 py-1 rounded-full">
                        {edu.grade}
                      </span>
                    )}
                  </div>
                </div>
                <p className="text-lg text-gray-300 font-semibold mb-3">
                  {edu.field}
                </p>
                <p className="text-gray-400 mb-4">{edu.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}