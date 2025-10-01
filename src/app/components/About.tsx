'use client';
import { useEffect, useState } from 'react';
import { BackgroundBeams } from '@/components/ui/background-beams';
import { getAboutData } from '@/app/actions/get-about-data';
import { IconCloud } from "@/components/ui/icon-cloud";
import { DotLoader } from '@/components/ui/DotLoader';

interface AboutData {
  bio: string;
  image: string | null;
  personalInfo: {
    label: string;
    value: string;
  }[];
}

export default function About() {
  const [aboutData, setAboutData] = useState<AboutData | null>(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const data = await getAboutData();
      setAboutData(data);
    } catch (error) {
      console.error('Error fetching about data:', error);
    }
  };

  if (!aboutData) {
    return (
      <div className="h-screen flex items-center justify-center bg-black">
        <DotLoader />
      </div>
    );
  }

  return (
    <section id="about" className="py-20 px-4 md:px-8 lg:px-16 relative overflow-hidden bg-gradient-to-br from-gray-600 via-black to-gray-700 text-white min-h-screen flex items-center">
      <BackgroundBeams />
      <div className="max-w-6xl mx-auto relative z-10 w-full overflow-x-hidden">
        {/* About Me Header */}
        <div className="text-center mb-8">
          <h2 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-3">
            About Me
          </h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Hailing from a small village in Sitapur, I began my journey at JNV, where I nurtured my love for learning and excelled in academics and sports. Today, I'm a CSE student at NIT Mizoram, passionate about building innovative software and web solutions while continuing to explore, create, and grow.
          </p>
        </div>

        {/* Main Content */}
        <div className="flex flex-col lg:flex-row gap-8 items-center">
          {/* Profile Image */}
          <div className="lg:w-2/5 w-full flex justify-center">
            <div className="relative group">
              <img
                src='/images/profile/photo2.jpg'
                alt="Profile"
                className="w-full max-w-xs mx-auto rounded-xl shadow-xl transform group-hover:scale-105 transition-transform duration-300 border-4 border-gray-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent rounded-xl" />
            </div>
          </div>

          {/* Personal Details */}
          <div className="lg:w-3/5 w-full space-y-6">
            {/* Skills Cloud */}
            <div className="w-full overflow-hidden">
              <SkillsIconCloud />
            </div>

            {/* Personal Details */}
            <div className="w-full overflow-hidden">
              <h3 className="text-2xl font-bold text-white mb-4 flex items-center">
                <span className="w-2 h-2 bg-purple-500 rounded-full mr-2"></span>
                Personal Details
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
                {/* Stack layout for mobile, side-by-side for desktop */}
                <div className="flex flex-col sm:flex-row sm:items-center p-3 bg-gray-800/50 backdrop-blur-sm rounded-lg border border-gray-700 text-sm w-full">
                  <span className="font-semibold text-gray-200 sm:min-w-[120px] mb-1 sm:mb-0">Full Name:</span>
                  <span className="text-gray-300">Ramu Yadav</span>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center p-3 bg-gray-800/50 backdrop-blur-sm rounded-lg border border-gray-700 text-sm w-full">
                  <span className="font-semibold text-gray-200 sm:min-w-[120px] mb-1 sm:mb-0">Date of Birth:</span>
                  <span className="text-gray-300">30th Sept 2004</span>
                </div>

                <div className="md:col-span-2 flex flex-col sm:flex-row p-3 bg-gray-800/50 backdrop-blur-sm rounded-lg border border-gray-700 text-sm w-full">
                  <span className="font-semibold text-gray-200 sm:min-w-[120px] mb-1 sm:mb-0 shrink-0">Address:</span>
                  <span className="text-gray-300 break-words flex-1">
                    Village-Dena, Post-Umari (261121), District-Sitapur, UP
                  </span>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center p-3 bg-gray-800/50 backdrop-blur-sm rounded-lg border border-gray-700 text-sm w-full">
                  <span className="font-semibold text-gray-200 sm:min-w-[120px] mb-1 sm:mb-0">Schooling:</span>
                  <span className="text-gray-300">JNV Sitapur</span>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center p-3 bg-gray-800/50 backdrop-blur-sm rounded-lg border border-gray-700 text-sm w-full">
                  <span className="font-semibold text-gray-200 sm:min-w-[120px] mb-1 sm:mb-0">Undergraduate:</span>
                  <span className="text-gray-300">NIT Mizoram</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Social Links */}
        <div className="text-center mt-12 pt-8 border-t border-gray-700 opacity-0 animate-fadeIn">
          <p className="text-lg text-gray-300 mb-6">
            Let's connect and build something amazing together!
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <a
              href="https://www.linkedin.com/in/mrkhiladi123"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-all transform hover:scale-110 border-2 border-blue-600"
              title="LinkedIn"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
            </a>
            <a
              href="https://github.com/Mrkhiladi-star"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 bg-gray-800 text-white rounded-full hover:bg-gray-900 transition-all transform hover:scale-110 border-2 border-gray-700"
              title="GitHub"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
            </a>
            <a
              href="https://www.facebook.com/profile.php?id=100036702692130"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-all transform hover:scale-110 border-2 border-blue-500"
              title="Facebook"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
            </a>
            <a
              href="tel:+918756892991"
              className="p-2 bg-green-500 text-white rounded-full hover:bg-green-600 transition-all transform hover:scale-110 border-2 border-green-500"
              title="Call"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
            </a>
            <a
              href="https://wa.me/918756892991"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 bg-green-600 text-white rounded-full hover:bg-green-700 transition-all transform hover:scale-110 border-2 border-green-600"
              title="WhatsApp"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
            </a>
            {/* ... other social icons ... */}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.8s ease-out forwards;
          animation-delay: 0.5s;
        }
      `}</style>
    </section>
  );
}

const SkillsIconCloud = () => {
  const skillIcons = [
    "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg",
    "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
    "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
    "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
    "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
    "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg",
    "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg",
    "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg",
    "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg",
    "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-plain.svg",
    "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg",
    "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg",
    "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
    "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg",
    "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/c/c-original.svg",
    "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg",
    "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/numpy/numpy-original.svg",
    "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pandas/pandas-original.svg",
    "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original.svg"
  ];

  return (
    <div className="relative w-full h-64 bg-gradient-to-br from-gray-200 to-gray-300 rounded-xl p-4 shadow-xl border border-gray-400 flex items-center justify-center overflow-hidden">
      <div className="w-full h-full flex items-center justify-center">
        <IconCloud images={skillIcons} />
      </div>
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <span className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent opacity-30">
          SKILLS
        </span>
      </div>
    </div>
  );
};