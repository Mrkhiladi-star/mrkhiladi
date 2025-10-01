'use client';
import { useEffect, useState, useRef, useCallback } from 'react';
import { TracingBeam } from '@/components/ui/tracing-beam';
import { getExperienceData } from '@/app/actions/get-experience-data';
import { Building2 } from 'lucide-react';
import { BackgroundBeams } from '@/components/ui/background-beams';
interface Experience {
  id: string;
  company: string;
  position: string;
  duration: string;
  sessionTag: string;
  description: string[]; 
  technologies: string[];
  logo?: string;
}
export default function Experience() {
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [cardHeights, setCardHeights] = useState<number[]>([]);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  useEffect(() => {
    fetchData();
  }, []);
  useEffect(() => {
    const updateHeights = () => {
      const heights = cardRefs.current.map(ref =>
        ref ? ref.offsetHeight + 40 : 0 
      );
      setCardHeights(heights);
    };
    updateHeights();
    window.addEventListener('resize', updateHeights);
    return () => window.removeEventListener('resize', updateHeights);
  }, [experiences]);

  const fetchData = async () => { 
    try {
      const data = await getExperienceData();
      if (data) {
                const exp = data.reverse().slice(0, 50);
               setExperiences(exp);
            } else {
                setExperiences(data || []);
            }
      
    } catch (error) {
      console.error('Error fetching experiences:', error);
    }
  };
  const setCardRef = useCallback((index: number) => (el: HTMLDivElement | null) => {
    cardRefs.current[index] = el;
  }, []);
  return (
    <section
      id="experience"
      className="relative min-h-screen py-20 px-4 md:px-8 lg:px-16 bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white -mt-16 overflow-hidden"
    >
      <BackgroundBeams />
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-16 bg-gradient-to-r text-white">
          Work Experience
        </h2>

        <div className="relative">
          {experiences.map((exp, index) => (
            <div key={exp.id} className="mb-16 flex justify-center">
              <div
                ref={setCardRef(index)}
                className="max-w-4xl w-full"
              >
                <TracingBeam cardHeight={cardHeights[index] || 0}>
                  <div className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-sm rounded-xl shadow-2xl overflow-hidden text-white w-full border border-gray-700/50">
                    <div className="py-3 px-4 font-bold text-lg rounded-t-xl bg-gradient-to-r from-gray-800 via-black to-gray-900 text-white">
                      {exp.duration}
                    </div>
                    <div className="p-6 space-y-3">
                      <h4 className="text-2xl font-semibold text-cyan-100">{exp.position}</h4>
                      <div className="flex items-center space-x-2 text-gray-300">
                        {exp.logo ? (
                          <img
                            src={exp.logo}
                            alt={exp.company}
                            className="w-12 h-12 object-contain rounded-sm"
                          />
                        ) : (
                          <Building2 className="w-5 h-5 text-cyan-400" />
                        )}
                        <h3 className="text-base font-normal text-gray-200">{exp.company}</h3>
                      </div>
                      {exp.sessionTag && (
                        <p className="text-cyan-400 hover:text-cyan-300 text-sm font-medium cursor-pointer transition-colors">
                          {exp.sessionTag}
                        </p>
                      )}
                      <ul className="list-disc list-inside text-gray-300 text-sm space-y-1">
                        {exp.description.map((desc, idx) => (
                          <li key={idx} className="text-gray-200">{desc}</li>
                        ))}
                      </ul>
                      {exp.technologies.length > 0 && (
                        <div className="pt-3">
                          <h5 className="text-cyan-100 font-semibold mb-2 text-sm tracking-wide uppercase">
                            Technologies Learned
                          </h5>
                          <div className="flex flex-wrap gap-2">
                            {exp.technologies.map((tech, i) => (
                              <span
                                key={i}
                                className="px-3 py-1 bg-gradient-to-r  text-white rounded-full text-xs font-medium shadow-lg backdrop-blur-sm border border-cyan-500/30"
                              >
                                {tech}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </TracingBeam>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}