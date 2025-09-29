export interface AboutData {
  bio: string;
  image: string;
  personalInfo: {
    label: string;
    value: string;
  }[];
}
export interface Achievement {
  id: string;
  title: string;
  organization: string;
  date: string;
  description: string;
  link?: string;
}
export interface Article {
  id: string;
  title: string;
  content: string;
  date: string;
  readTime: string;
  tags: string[];
  image: string;
  slug: string;
}
export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  tags: string[];
  image: string;
  slug: string;
}
export interface Education {
  id: string;
  institution: string;
  degree: string;
  field: string;
  duration: string;
  grade: string;
  description: string;
}
export interface Experience {
  id: string;
  company: string;
  position: string;
  duration: string;
  description: string[];
  technologies: string[];
}
export interface IntroData {
  name: string;
  title: string;
  description: string;
  stats: { value: number; label: string }[];
}
export interface Project {
  id: string;
  name: string;
  description: string;
  tags: string[];
  image: string;
  link: string;
  github?: string;
}
export interface Skill {
  id: string;
  name: string;
  proficiency: number;
  category: string;
  icon?: string;
} 