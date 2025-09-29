"use client";
import { BackgroundBeams } from "@/components/ui/background-beams";
import Intro from "@/app/components/Intro";
import Skills from "@/app/components/Skills";
import Experience from "@/app/components/Experience";
import Education from "@/app/components/Education";
import Achievements from "@/app/components/Achievements";
import Projects from "@/app/components/Projects";
import About from "@/app/components/About";
import Blog from "@/app/components/Blog";
import Article from "@/app/components/Article";
export default function HomePage() {
  return (
    <div className="relative w-full bg-black text-white"> 
      <section id="home" className="min-h-screen relative">
        <BackgroundBeams className="absolute inset-0 z-0"/>
        <div className="relative z-10">
          <Intro />
        </div>
      </section>
      <section id="skills" className="min-h-screen bg-black"> 
        <Skills />
      </section>
      <section id="experience" className="min-h-screen bg-black"> 
        <Experience />
      </section>
      <section id="education" className="min-h-screen bg-black"> 
        <Education />
      </section>
      <section id="achievements" className="min-h-screen bg-black"> 
        <Achievements />
      </section>
      <section id="projects" className="min-h-screen bg-black"> 
        <Projects />
      </section>
      <section id="about" className="min-h-screen bg-black"> 
        <About />
      </section>
      <section id="blog" className="min-h-screen bg-black"> 
        <Blog />
      </section>
      <section id="articles" className="min-h-screen bg-black"> 
        <Article />
      </section>
    </div>
  );
}