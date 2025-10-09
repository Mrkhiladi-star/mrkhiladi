'use client';
import { useEffect, useState } from 'react';
import { getProjectsData } from '@/app/actions/get-projects-data';
import { ExternalLink, Github } from "lucide-react";
import { BackgroundBeams } from '@/components/ui/background-beams';
import { DotLoader } from '@/components/ui/DotLoader';
interface Project {
  id: string;
  name: string;
  description: string;
  tags: string[];
  image: string | null;
  link: string;
  github?: string;
}
interface ProjectWithImageUrl extends Project {
  imageUrl: string;
}
export default function Projects() {
  const [projects, setProjects] = useState<ProjectWithImageUrl[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    try {
      const data = await getProjectsData();
      const projectsWithImages = data.map(project => ({
        ...project,
        imageUrl: project.image ? project.image : '/placeholder-image.jpg'
      }));
      setProjects(projectsWithImages);
    } catch (error) {
      console.error('Error fetching projects:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
     return (
          <div className="h-screen flex items-center justify-center bg-black">
            <DotLoader />
          </div>
        );
  }
  return (
    <section id="projects" className="relative min-h-screen py-20 px-4 md:px-8 lg:px-16 bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white -mt-16 overflow-hidden">
       <BackgroundBeams />
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-16">Projects</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-20 px-4 md:px-8">
          {projects.map(project => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
        {projects.length === 0 && (
          <div className="text-center mt-12">
            <p className="text-gray-600 dark:text-gray-400">No projects found.</p>
          </div>
        )}
      </div>
    </section>
  );
}
function ProjectCard({ project }: { project: ProjectWithImageUrl }) {
  const [expanded, setExpanded] = useState(false);

  const descriptionPoints = project.description
    ? project.description.split(/[.\n]+/).filter(point => point.trim() !== "")
    : [];

  return (
    <div className="bg-gray-900/80 backdrop-blur-md dark:bg-gray-800/80 rounded-2xl shadow-lg overflow-hidden border border-gray-700 hover:shadow-2xl hover:scale-[1.02] transition-transform duration-300 group">
      <div className="relative overflow-hidden">
        <img 
          src={project.imageUrl} 
          alt={project.name} 
          className="w-full object-contain bg-black transition-transform duration-500 group-hover:scale-105"
          onError={(e) => { e.currentTarget.src = '/placeholder-image.jpg'; }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
      </div>
      <div className="p-6 space-y-4">
        <h3 className="text-2xl font-bold text-white">{project.name}</h3>
        {expanded && (
          <>
            <ul className="list-disc list-inside text-gray-300 space-y-1">
              {descriptionPoints.map((point, idx) => (
                <li key={idx}>{point}</li>
              ))}
            </ul>
            {project.tags.length > 0 && (
              <div>
                <h4 className="text-sm font-semibold text-gray-300 mb-2 uppercase tracking-wide">
                  Technologies Used
                </h4>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag, index) => (
                    <span 
                      key={index} 
                      className="px-3 py-1 bg-blue-600/20 text-blue-300 rounded-full text-xs font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </>
        )}
        <div className="flex gap-3 pt-2">
          <a href={project.link} target="_blank" rel="noopener noreferrer" className="flex-1">
            <button className="w-full flex items-center justify-center gap-2 py-2 px-4 rounded-lg border border-gray-600 text-gray-300 hover:bg-gray-700 transition">
              <ExternalLink size={16} /> Live Demo
            </button>
          </a>        
          {project.github && (
            <a href={project.github} target="_blank" rel="noopener noreferrer" className="flex-1">
              <button className="w-full flex items-center justify-center gap-2 py-2 px-4 rounded-lg border border-gray-600 text-gray-300 hover:bg-gray-700 transition">
                <Github size={16} /> GitHub
              </button>
            </a>
          )}
        </div>
        <div className="text-center pt-3">
          <button 
            onClick={() => setExpanded(!expanded)} 
            className="text-sm text-blue-400 hover:underline"
          >
            {expanded ? "Show Less" : "Show More"}
          </button>
        </div>
      </div>
    </div>
  );
}