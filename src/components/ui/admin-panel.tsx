// src/components/ui/admin-panel.tsx

'use client';

import { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';

//IMPORT the new data fetching server actions
import { getAdminIntro } from '@/app/actions/get-admin-intro';
import { getAdminSkills } from '@/app/actions/get-admin-skills';
import { getAdminExperience } from '@/app/actions/get-admin-experience';
import { getAdminEducation } from '@/app/actions/get-admin-education';
import { getAdminAchievements } from '@/app/actions/get-admin-achievements';
import { getAdminProjects } from '@/app/actions/get-admin-projects';
import { getAdminAbout } from '@/app/actions/get-admin-about';
import { getAdminBlog } from '@/app/actions/get-admin-blog';
import { getArticleData } from '@/app/actions/get-admin-articles';

//IMPORT the new data mutation server actions
import { updateIntroData } from '@/app/actions/update-intro-data';
import { updateAboutData } from '@/app/actions/update-about-data';
import { updateSkillsData } from '@/app/actions/update-skills-data';
import { updateExperiencesData } from '@/app/actions/update-experiences-data';
import { updateEducationData } from '@/app/actions/update-education-data';
import { updateAchievementsData } from '@/app/actions/update-achievements-data';
import { updateProjectsData } from '@/app/actions/update-projects-data';
import { updateBlogPostsData } from '@/app/actions/update-blog-posts-data';
import { updateArticlesData } from '@/app/actions/update-articles-data';

// Your existing interfaces for data types
interface FormData {
  [key: string]: any;
}
interface Skill {
  id?: string;
  name: string;
  proficiency: number;
  category: string;
  icon?: string;
}

interface Project {
  id?: string;
  name: string;
  description: string;
  tags: string[];
  image: string;
  link: string;
  github?: string;
}

interface IntroData {
  name: string;
  title: string;
  description: string;
  stats: { value: number; label: string }[];
}

interface Experience {
  id?: string;
  company: string;
  position: string;
  duration: string;
  description: string[];
  technologies: string[];
}

interface Education {
  id?: string;
  institution: string;
  degree: string;
  field: string;
  duration: string;
  grade: string;
  description: string;
}

interface BlogPost {
  id?: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  readTime: string;
  tags: string[];
  image: string;
  slug: string;
}

interface Achievement {
  id?: string;
  title: string;
  organization: string;
  date: string;
  description: string;
  link?: string;
}

interface Article {
  id?: string;
  title: string;
  content: string;
  date: string;
  readTime: string;
  tags: string[];
  image: string;
  slug: string;
}

interface AboutData {
  bio: string;
  image: string;
  personalInfo: {
    label: string;
    value: string;
  }[];
}

export default function AdminPanel({ activeTab }: { activeTab: string }) {
  const [formData, setFormData] = useState<any>({});
  const [arrayData, setArrayData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchData();
  }, [activeTab]);

  const fetchData = async () => {
    try {
      setIsLoading(true);

      switch (activeTab) {
        case 'intro':
          const introData = await getAdminIntro(); // ✅ Use the new server action
          setFormData(introData || {});
          break;
        case 'skills':
          const skillsData = await getAdminSkills(); // ✅ Use the new server action
          setArrayData(skillsData || []);
          break;
        case 'experience':
          const expData = await getAdminExperience(); // ✅ Use the new server action
          setArrayData(expData || []);
          break;
        case 'education':
          const eduData = await getAdminEducation(); // ✅ Use the new server action
          setArrayData(eduData || []);
          break;
        case 'achievements':
          const achData = await getAdminAchievements(); // ✅ Use the new server action
          setArrayData(achData || []);
          break;
        case 'projects':
          const projData = await getAdminProjects(); // ✅ Use the new server action
          setArrayData(projData || []);
          break;
        case 'about':
          const aboutData = await getAdminAbout(); // ✅ Use the new server action
          setFormData(aboutData || {});
          break;
        case 'blog':
          const blogData = await getAdminBlog(); // ✅ Use the new server action
          setArrayData(blogData || []);
          break;
        case 'article':
          const articleData = await getArticleData(); // ✅ Use the new server action
          setArrayData(articleData || []); 
          break;
        default:
          setFormData({});
          setArrayData([]);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      setMessage('Error fetching data');
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev: FormData) => ({ ...prev, [name]: value }));
  };

  const handleArrayItemChange = (index: number, field: string, value: any) => {
    const newArray = [...arrayData];
    newArray[index] = { ...newArray[index], [field]: value };
    setArrayData(newArray);
  };

  const handleArrayChange = (index: number, field: string, value: any, subField?: string) => {
    const newArray = [...arrayData];

    if (subField) {
      newArray[index] = {
        ...newArray[index],
        [field]: {
          ...newArray[index][field],
          [subField]: value
        }
      };
    } else {
      newArray[index] = { ...newArray[index], [field]: value };
    }

    setArrayData(newArray);
  };

  const addArrayItem = () => {
    let newItem: any = {};

    switch (activeTab) {
      case 'skills':
        newItem = { name: '', category: '', proficiency: 0 };
        break;
      case 'experience':
        newItem = { company: '', position: '', duration: '', description: [], technologies: [] };
        break;
      case 'education':
        newItem = { institution: '', degree: '', field: '', duration: '', grade: '', description: '' };
        break;
      case 'achievements':
        newItem = { title: '', organization: '', date: '', description: '', link: '' };
        break;
      case 'projects':
        newItem = { name: '', description: '', tags: [], image: '', link: '', github: '' };
        break;
      case 'blog':
        newItem = { title: '', excerpt: '', content: '', date: '', readTime: '', tags: [], image: '', slug: '' };
        break;
      case 'article':
        newItem = { title: '', content: '', date: '', readTime: '', tags: [], image: '', slug: '' };
        break;
      default:
        newItem = {};
    }

    setArrayData(prev => [...prev, newItem]);
  };

  const removeArrayItem = (index: number) => {
    setArrayData(prev => prev.filter((_, i) => i !== index));
  };

  const handleStatsChange = (index: number, field: 'value' | 'label', value: string | number) => {
    const newStats = [...(formData.stats || [])];
    if (!newStats[index]) newStats[index] = { value: 0, label: '' };

    newStats[index][field] = field === 'value' ? Number(value) : value;
    setFormData({ ...formData, stats: newStats });
  };

  const addStat = () => {
    const newStats = [...(formData.stats || []), { value: 0, label: '' }];
    setFormData({ ...formData, stats: newStats });
  };

  const removeStat = (index: number) => {
    const newStats = formData.stats.filter((_: any, i: number) => i !== index);
    setFormData({ ...formData, stats: newStats });
  };

  const handlePersonalInfoChange = (index: number, field: 'label' | 'value', value: string) => {
    const newPersonalInfo = [...(formData.personalInfo || [])];
    if (!newPersonalInfo[index]) newPersonalInfo[index] = { label: '', value: '' };

    newPersonalInfo[index][field] = value;
    setFormData({ ...formData, personalInfo: newPersonalInfo });
  };

  const addPersonalInfo = () => {
    const newPersonalInfo = [...(formData.personalInfo || []), { label: '', value: '' }];
    setFormData({ ...formData, personalInfo: newPersonalInfo });
  };

  const removePersonalInfo = (index: number) => {
    const newPersonalInfo = formData.personalInfo.filter((_: any, i: number) => i !== index);
    setFormData({ ...formData, personalInfo: newPersonalInfo });
  };

  const handleStringArrayChange = (index: number, value: string, arrayName: string, itemIndex: number) => {
    const newArray = [...arrayData];
    if (!newArray[index][arrayName]) newArray[index][arrayName] = [];

    newArray[index][arrayName][itemIndex] = value;
    setArrayData(newArray);
  };

  const addStringArrayItem = (index: number, arrayName: string) => {
    const newArray = [...arrayData];
    if (!newArray[index][arrayName]) newArray[index][arrayName] = [];

    newArray[index][arrayName].push('');
    setArrayData(newArray);
  };

  const removeStringArrayItem = (index: number, arrayName: string, itemIndex: number) => {
    const newArray = [...arrayData];
    newArray[index][arrayName] = newArray[index][arrayName].filter((_: any, i: number) => i !== itemIndex);
    setArrayData(newArray);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage('');

    try {
      // ✅ Use the new server actions for mutation
      let result;
      switch (activeTab) {
        case 'intro':
          result = await updateIntroData(formData);
          break;
        case 'skills':
          result = await updateSkillsData(arrayData);
          break;
        case 'experience':
          result = await updateExperiencesData(arrayData);
          break;
        case 'education':
          result = await updateEducationData(arrayData);
          break;
        case 'achievements':
          result = await updateAchievementsData(arrayData);
          break;
        case 'projects':
          result = await updateProjectsData(arrayData);
          break;
        case 'about':
          result = await updateAboutData(formData);
          break;
        case 'blog':
          result = await updateBlogPostsData(arrayData);
          break;
        case 'article':
          result = await updateArticlesData(arrayData);
          break;
      }

      if (result?.success) {
        setMessage('Data updated successfully!');
      } else {
        setMessage(`Error updating data: ${result?.error || 'Unknown error'}`);
      }

    } catch (error: any) {
      console.error('Error updating data:', error);
      setMessage(`Error updating data: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <div className="flex justify-center items-center h-64">Loading...</div>;
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {activeTab === 'intro' && (
        <div className="space-y-4">
          <div>
            <Label htmlFor="greeting">Greeting</Label>
            <Input
              id="greeting"
              name="greeting"
              value={formData.greeting || 'Hi, I am'}
              onChange={handleInputChange}
            />
          </div>

          <div>
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              name="name"
              value={formData.name || ''}
              onChange={handleInputChange}
              required
            />
          </div>

          <div>
            <Label htmlFor="subtitle">Subtitle</Label>
            <Input
              id="subtitle"
              name="subtitle"
              value={formData.subtitle || ''}
              onChange={handleInputChange}
            />
          </div>

          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              name="description"
              value={formData.description || ''}
              onChange={handleInputChange}
              rows={3}
            />
          </div>

          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              value={formData.email || ''}
              onChange={handleInputChange}
              required
            />
          </div>
        </div>
      )}




      {activeTab === 'article' && (
        <div className="space-y-4">
          <Button type="button" onClick={addArrayItem} variant="outline">
            Add Article
          </Button>

          {arrayData.map((article, index) => (
            <div key={index} className="border p-4 rounded-md space-y-3">
              <div className="flex justify-between items-center">
                <h4 className="font-medium">Article #{index + 1}</h4>
                <Button
                  type="button"
                  onClick={() => removeArrayItem(index)}
                  variant="destructive"
                  size="sm"
                >
                  Remove
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor={`article-title-${index}`}>Title</Label>
                  <Input
                    id={`article-title-${index}`}
                    value={article.title || ''}
                    onChange={(e) => handleArrayItemChange(index, 'title', e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor={`article-slug-${index}`}>Slug</Label>
                  <Input
                    id={`article-slug-${index}`}
                    value={article.slug || ''}
                    onChange={(e) => handleArrayItemChange(index, 'slug', e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor={`article-date-${index}`}>Date</Label>
                  <Input
                    id={`article-date-${index}`}
                    value={article.date || ''}
                    onChange={(e) => handleArrayItemChange(index, 'date', e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor={`article-readTime-${index}`}>Read Time</Label>
                  <Input
                    id={`article-readTime-${index}`}
                    value={article.readTime || ''}
                    onChange={(e) => handleArrayItemChange(index, 'readTime', e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor={`article-image-${index}`}>Image URL</Label>
                  <Input
                    id={`article-image-${index}`}
                    value={article.image || ''}
                    onChange={(e) => handleArrayItemChange(index, 'image', e.target.value)}
                  />
                </div>
              </div>

              <div>
                <Label htmlFor={`article-content-${index}`}>Content</Label>
                <Textarea
                  id={`article-content-${index}`}
                  value={article.content || ''}
                  onChange={(e) => handleArrayItemChange(index, 'content', e.target.value)}
                  rows={6}
                />
              </div>

              <div>
                <Label>Tags</Label>
                {article.tags?.map((tag: string, tagIndex: number) => (
                  <div key={tagIndex} className="flex gap-2 mb-2">
                    <Input
                      value={tag || ''}
                      onChange={(e) => handleStringArrayChange(index, e.target.value, 'tags', tagIndex)}
                    />
                    <Button
                      type="button"
                      onClick={() => removeStringArrayItem(index, 'tags', tagIndex)}
                      variant="destructive"
                      size="sm"
                    >
                      Remove
                    </Button>
                  </div>
                ))}
                <Button
                  type="button"
                  onClick={() => addStringArrayItem(index, 'tags')}
                  variant="outline"
                  size="sm"
                >
                  Add Tag
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Skills Tab */}
      {activeTab === 'skills' && (
        <div className="space-y-4">
          <Button type="button" onClick={addArrayItem} variant="outline">
            Add Skill
          </Button>

          {arrayData.map((skill, index) => (
            <div key={index} className="border p-4 rounded-md space-y-3">
              <div className="flex justify-between items-center">
                <h4 className="font-medium">Skill #{index + 1}</h4>
                <Button
                  type="button"
                  onClick={() => removeArrayItem(index)}
                  variant="destructive"
                  size="sm"
                >
                  Remove
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor={`skill-name-${index}`}>Name</Label>
                  <Input
                    id={`skill-name-${index}`}
                    value={skill.name || ''}
                    onChange={(e) => handleArrayItemChange(index, 'name', e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor={`skill-category-${index}`}>Category</Label>
                  <Input
                    id={`skill-category-${index}`}
                    value={skill.category || ''}
                    onChange={(e) => handleArrayItemChange(index, 'category', e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor={`skill-proficiency-${index}`}>Proficiency (0-100)</Label>
                  <Input
                    id={`skill-proficiency-${index}`}
                    type="number"
                    min="0"
                    max="100"
                    value={skill.proficiency || 0}
                    onChange={(e) => handleArrayItemChange(index, 'proficiency', parseInt(e.target.value))}
                  />
                </div>
                <div>
                  <Label htmlFor={`skill-icon-${index}`}>Icon (URL)</Label>
                  <Input
                    id={`skill-icon-${index}`}
                    value={skill.icon || ''}
                    onChange={(e) => handleArrayItemChange(index, 'icon', e.target.value)}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Experience Tab */}
      {activeTab === 'experience' && (
        <div className="space-y-4">
          <Button type="button" onClick={addArrayItem} variant="outline">
            Add Experience
          </Button>

          {arrayData.map((exp, index) => (
            <div key={index} className="border p-4 rounded-md space-y-3">
              <div className="flex justify-between items-center">
                <h4 className="font-medium">Experience #{index + 1}</h4>
                <Button
                  type="button"
                  onClick={() => removeArrayItem(index)}
                  variant="destructive"
                  size="sm"
                >
                  Remove
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor={`exp-company-${index}`}>Company</Label>
                  <Input
                    id={`exp-company-${index}`}
                    value={exp.company || ''}
                    onChange={(e) => handleArrayItemChange(index, 'company', e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor={`exp-position-${index}`}>Position</Label>
                  <Input
                    id={`exp-position-${index}`}
                    value={exp.position || ''}
                    onChange={(e) => handleArrayItemChange(index, 'position', e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor={`exp-duration-${index}`}>Duration</Label>
                  <Input
                    id={`exp-duration-${index}`}
                    value={exp.duration || ''}
                    onChange={(e) => handleArrayItemChange(index, 'duration', e.target.value)}
                  />
                </div>

                <div>
                  <Label htmlFor={`exp-sessiontag-${index}`}>Session Tag (e.g., Spring 2024-25 Session)</Label>
                  <Input
                    id={`exp-sessiontag-${index}`}
                    value={exp.sessionTag || ''}
                    onChange={(e) => handleArrayItemChange(index, 'sessionTag', e.target.value)}
                  />
                </div>
              </div>

              <div>
                <Label>Description</Label>
                {exp.description?.map((desc: string, descIndex: number) => (
                  <div key={descIndex} className="flex gap-2 mb-2">
                    <Input
                      value={desc || ''}
                      onChange={(e) => handleStringArrayChange(index, e.target.value, 'description', descIndex)}
                    />
                    <Button
                      type="button"
                      onClick={() => removeStringArrayItem(index, 'description', descIndex)}
                      variant="destructive"
                      size="sm"
                    >
                      Remove
                    </Button>
                  </div>
                ))}
                <Button
                  type="button"
                  onClick={() => addStringArrayItem(index, 'description')}
                  variant="outline"
                  size="sm"
                >
                  Add Description Point
                </Button>
              </div>
              <div>
                  <Label htmlFor={`edu-image-${index}`}>Background Image URL</Label>
                  <Input
                    id={`edu-image-${index}`}
                    value={exp.logo || ''}
                    onChange={(e) => handleArrayItemChange(index, 'logo', e.target.value)}
                  />
                </div>

              <div>
                <Label>Technologies</Label>
                {exp.technologies?.map((tech: string, techIndex: number) => (
                  <div key={techIndex} className="flex gap-2 mb-2">
                    <Input
                      value={tech || ''}
                      onChange={(e) => handleStringArrayChange(index, e.target.value, 'technologies', techIndex)}
                    />
                    <Button
                      type="button"
                      onClick={() => removeStringArrayItem(index, 'technologies', techIndex)}
                      variant="destructive"
                      size="sm"
                    >
                      Remove
                    </Button>
                  </div>

                  
                ))}
                <Button
                  type="button"
                  onClick={() => addStringArrayItem(index, 'technologies')}
                  variant="outline"
                  size="sm"
                >
                  Add Technology
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Education Tab */}
      {activeTab === 'education' && (
        <div className="space-y-4">
          <Button type="button" onClick={addArrayItem} variant="outline">
            Add Education
          </Button>

          {arrayData.map((edu, index) => (
            <div key={index} className="border p-4 rounded-md space-y-3">
              <div className="flex justify-between items-center">
                <h4 className="font-medium">Education #{index + 1}</h4>
                <Button
                  type="button"
                  onClick={() => removeArrayItem(index)}
                  variant="destructive"
                  size="sm"
                >
                  Remove
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor={`edu-institution-${index}`}>Institution</Label>
                  <Input
                    id={`edu-institution-${index}`}
                    value={edu.institution || ''}
                    onChange={(e) => handleArrayItemChange(index, 'institution', e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor={`edu-degree-${index}`}>Degree</Label>
                  <Input
                    id={`edu-degree-${index}`}
                    value={edu.degree || ''}
                    onChange={(e) => handleArrayItemChange(index, 'degree', e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor={`edu-field-${index}`}>Field</Label>
                  <Input
                    id={`edu-field-${index}`}
                    value={edu.field || ''}
                    onChange={(e) => handleArrayItemChange(index, 'field', e.target.value)}
                  />
                </div>


                <div>
                  <Label htmlFor={`edu-duration-${index}`}>Duration</Label>
                  <Input
                    id={`edu-duration-${index}`}
                    value={edu.duration || ''}
                    onChange={(e) => handleArrayItemChange(index, 'duration', e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor={`edu-grade-${index}`}>Grade</Label>
                  <Input
                    id={`edu-grade-${index}`}
                    value={edu.grade || ''}
                    onChange={(e) => handleArrayItemChange(index, 'grade', e.target.value)}
                  />
                </div>
                {/* NEW FIELDS */}
                <div>
                  <Label htmlFor={`edu-location-${index}`}>Location</Label>
                  <Input
                    id={`edu-location-${index}`}
                    value={edu.location || ''}
                    onChange={(e) => handleArrayItemChange(index, 'location', e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor={`edu-image-${index}`}>Background Image URL</Label>
                  <Input
                    id={`edu-image-${index}`}
                    value={edu.image || ''}
                    onChange={(e) => handleArrayItemChange(index, 'image', e.target.value)}
                  />
                </div>
              </div>

              <div>
                <Label htmlFor={`edu-description-${index}`}>Description</Label>
                <Textarea
                  id={`edu-description-${index}`}
                  value={edu.description || ''}
                  onChange={(e) => handleArrayItemChange(index, 'description', e.target.value)}
                  rows={3}
                />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Achievements Tab */}
      {activeTab === 'achievements' && (
        <div className="space-y-4">
          <Button type="button" onClick={addArrayItem} variant="outline">
            Add Achievement
          </Button>

          {arrayData.map((achievement, index) => (
            <div key={index} className="border p-4 rounded-md space-y-3">
              <div className="flex justify-between items-center">
                <h4 className="font-medium">Achievement #{index + 1}</h4>
                <Button
                  type="button"
                  onClick={() => removeArrayItem(index)}
                  variant="destructive"
                  size="sm"
                >
                  Remove
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor={`ach-title-${index}`}>Title</Label>
                  <Input
                    id={`ach-title-${index}`}
                    value={achievement.title || ''}
                    onChange={(e) => handleArrayItemChange(index, 'title', e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor={`ach-organization-${index}`}>Organization</Label>
                  <Input
                    id={`ach-organization-${index}`}
                    value={achievement.organization || ''}
                    onChange={(e) => handleArrayItemChange(index, 'organization', e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor={`ach-date-${index}`}>Date</Label>
                  <Input
                    id={`ach-date-${index}`}
                    value={achievement.date || ''}
                    onChange={(e) => handleArrayItemChange(index, 'date', e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor={`ach-link-${index}`}>Link (optional)</Label>
                  <Input
                    id={`ach-link-${index}`}
                    value={achievement.link || ''}
                    onChange={(e) => handleArrayItemChange(index, 'link', e.target.value)}
                  />
                </div>
              </div>

              <div>
                <Label htmlFor={`ach-description-${index}`}>Description</Label>
                <Textarea
                  id={`ach-description-${index}`}
                  value={achievement.description || ''}
                  onChange={(e) => handleArrayItemChange(index, 'description', e.target.value)}
                  rows={3}
                />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Projects Tab */}
      {activeTab === 'projects' && (
        <div className="space-y-4">
          <Button type="button" onClick={addArrayItem} variant="outline">
            Add Project
          </Button>

          {arrayData.map((project, index) => (
            <div key={index} className="border p-4 rounded-md space-y-3">
              <div className="flex justify-between items-center">
                <h4 className="font-medium">Project #{index + 1}</h4>
                <Button
                  type="button"
                  onClick={() => removeArrayItem(index)}
                  variant="destructive"
                  size="sm"
                >
                  Remove
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor={`proj-name-${index}`}>Name</Label>
                  <Input
                    id={`proj-name-${index}`}
                    value={project.name || ''}
                    onChange={(e) => handleArrayItemChange(index, 'name', e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor={`proj-image-${index}`}>Image Path</Label>
                  <Input
                    id={`proj-image-${index}`}
                    value={project.imageId || ''}
                    onChange={(e) => handleArrayItemChange(index, 'imageId', e.target.value)}
                    placeholder="/images/projects/p1.png"
                  />

                </div>
                <div>
                  <Label htmlFor={`proj-link-${index}`}>Project Link</Label>
                  <Input
                    id={`proj-link-${index}`}
                    value={project.link || ''}
                    onChange={(e) => handleArrayItemChange(index, 'link', e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor={`proj-github-${index}`}>GitHub Link (optional)</Label>
                  <Input
                    id={`proj-github-${index}`}
                    value={project.github || ''}
                    onChange={(e) => handleArrayItemChange(index, 'github', e.target.value)}
                  />
                </div>
              </div>

              <div>
                <Label htmlFor={`proj-description-${index}`}>Description</Label>
                <Textarea
                  id={`proj-description-${index}`}
                  value={project.description || ''}
                  onChange={(e) => handleArrayItemChange(index, 'description', e.target.value)}
                  rows={3}
                />
              </div>

              <div>
                <Label>Tags</Label>
                {project.tags?.map((tag: string, tagIndex: number) => (
                  <div key={tagIndex} className="flex gap-2 mb-2">
                    <Input
                      value={tag || ''}
                      onChange={(e) => handleStringArrayChange(index, e.target.value, 'tags', tagIndex)}
                    />
                    <Button
                      type="button"
                      onClick={() => removeStringArrayItem(index, 'tags', tagIndex)}
                      variant="destructive"
                      size="sm"
                    >
                      Remove
                    </Button>
                  </div>
                ))}
                <Button
                  type="button"
                  onClick={() => addStringArrayItem(index, 'tags')}
                  variant="outline"
                  size="sm"
                >
                  Add Tag
                </Button>
              </div>
            </div> 
          ))}
        </div>
      )}

      {/* About Tab */}
      {activeTab === 'about' && (
        <div className="space-y-4">
          <div>
            <Label htmlFor="bio">Bio</Label>
            <Textarea
              id="bio"
              name="bio"
              value={formData.bio || ''}
              onChange={handleInputChange}
              rows={6}
            />
          </div>
          <div>
            <Label htmlFor="image">Image URL</Label>
            <Input
              id="image"
              name="image"
              value={formData.image || ''}
              onChange={handleInputChange}
            />
          </div>

          <div>
            <div className="flex justify-between items-center mb-2">
              <Label>Personal Information</Label>
              <Button type="button" onClick={addPersonalInfo} variant="outline" size="sm">
                Add Info
              </Button>
            </div>
            {formData.personalInfo?.map((info: any, index: number) => (
              <div key={index} className="grid grid-cols-2 gap-4 mb-2 p-2 border rounded">
                <div>
                  <Label htmlFor={`info-label-${index}`}>Label</Label>
                  <Input
                    id={`info-label-${index}`}
                    value={info.label || ''}
                    onChange={(e) => handlePersonalInfoChange(index, 'label', e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor={`info-value-${index}`}>Value</Label>
                  <div className="flex gap-2">
                    <Input
                      id={`info-value-${index}`}
                      value={info.value || ''}
                      onChange={(e) => handlePersonalInfoChange(index, 'value', e.target.value)}
                    />
                    <Button
                      type="button"
                      onClick={() => removePersonalInfo(index)}
                      variant="destructive"
                      size="sm"
                    >
                      Remove
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Blog Tab */}
      {activeTab === 'blog' && (
        <div className="space-y-4">
          <Button type="button" onClick={addArrayItem} variant="outline">
            Add Blog Post
          </Button>

          {arrayData.map((post, index) => (
            <div key={index} className="border p-4 rounded-md space-y-3">
              <div className="flex justify-between items-center">
                <h4 className="font-medium">Blog Post #{index + 1}</h4>
                <Button
                  type="button"
                  onClick={() => removeArrayItem(index)}
                  variant="destructive"
                  size="sm"
                >
                  Remove
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor={`blog-title-${index}`}>Title</Label>
                  <Input
                    id={`blog-title-${index}`}
                    value={post.title || ''}
                    onChange={(e) => handleArrayItemChange(index, 'title', e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor={`blog-slug-${index}`}>Slug</Label>
                  <Input
                    id={`blog-slug-${index}`}
                    value={post.slug || ''}
                    onChange={(e) => handleArrayItemChange(index, 'slug', e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor={`blog-date-${index}`}>Date</Label>
                  <Input
                    id={`blog-date-${index}`}
                    value={post.date || ''}
                    onChange={(e) => handleArrayItemChange(index, 'date', e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor={`blog-readTime-${index}`}>Read Time</Label>
                  <Input
                    id={`blog-readTime-${index}`}
                    value={post.readTime || ''}
                    onChange={(e) => handleArrayItemChange(index, 'readTime', e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor={`blog-image-${index}`}>Image URL</Label>
                  <Input
                    id={`blog-image-${index}`}
                    value={post.image || ''}
                    onChange={(e) => handleArrayItemChange(index, 'image', e.target.value)}
                  />
                </div>
              </div>

              <div>
                <Label htmlFor={`blog-excerpt-${index}`}>Excerpt</Label>
                <Textarea
                  id={`blog-excerpt-${index}`}
                  value={post.excerpt || ''}
                  onChange={(e) => handleArrayItemChange(index, 'excerpt', e.target.value)}
                  rows={3}
                />
              </div> 

              <div>
                <Label htmlFor={`blog-content-${index}`}>Content</Label>
                <Textarea
                  id={`blog-content-${index}`}
                  value={post.content || ''}
                  onChange={(e) => handleArrayItemChange(index, 'content', e.target.value)}
                  rows={6}
                />
              </div>

              <div>
                <Label>Tags</Label>
                {post.tags?.map((tag: string, tagIndex: number) => (
                  <div key={tagIndex} className="flex gap-2 mb-2">
                    <Input
                      value={tag || ''}
                      onChange={(e) => handleStringArrayChange(index, e.target.value, 'tags', tagIndex)}
                    />
                    <Button
                      type="button"
                      onClick={() => removeStringArrayItem(index, 'tags', tagIndex)}
                      variant="destructive"
                      size="sm"
                    >
                      Remove
                    </Button>
                  </div>
                ))}
                <Button
                  type="button"
                  onClick={() => addStringArrayItem(index, 'tags')}
                  variant="outline"
                  size="sm"
                >
                  Add Tag
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Submit Button */}
      <div className="flex justify-between items-center pt-4 border-t">
        <Button
          type="submit"
          disabled={isLoading}
          className="px-4 py-2"
        >
          {isLoading ? 'Saving...' : 'Save Changes'}
        </Button>

        {message && (
          <span className={`text-sm ${message.includes('Error') ? 'text-red-600' : 'text-green-600'}`}>
            {message}
          </span>
        )}
      </div>
    </form>
  );
}