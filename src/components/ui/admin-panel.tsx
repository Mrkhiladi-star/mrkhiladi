'use client';
import { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { getAdminIntro } from '@/app/actions/get-admin-intro';
import { getAdminAbout } from '@/app/actions/get-admin-about';
import { updateIntroData } from '@/app/actions/update-intro-data';
import { updateAboutData } from '@/app/actions/update-about-data';
import { createProjectAction } from "@/app/actions/create-project";
import { getFileView, uploadFile } from "@/lib/appwrite";   // top pe add karo
import { createAchievementAction } from '@/app/actions/create-achievement';
import { createArticleAction } from '@/app/actions/create-article';
import { createExperienceAction } from '@/app/actions/create-experience';
import { createSkillAction } from '@/app/actions/create-skill';
import { createBlogAction } from '@/app/actions/create-blog';
import { createEducationAction } from '@/app/actions/create-education';

interface FormData {
  [key: string]: any;
}

export default function AdminPanel({ activeTab }: { activeTab: string }) {
  const [formData, setFormData] = useState<any>({});
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [project, setProject] = useState({
    name: "",
    description: "",
    tags: [] as string[],
    imageId: "",
    link: "",
    github: "",
  });

  const [achievement, setAchievement] = useState({
    title: "",
    organization: "",
    date: "",
    description: "",
    link: "",
    imageId: "",
  });

  const [article, setArticle] = useState({
    title: "",
    content: "",
    date: "",
    readTime: "",
    tags: [] as string[],
    imageId: "",
    slug: "",
  });

  const [blog, setBlog] = useState({
    title: "",
    excerpt: "",
    content: "",
    date: "",
    readTime: "",
    tags: [] as string[],
    imageId: "",
    slug: "",
    author: "",
  });

  const [education, setEducation] = useState({
    institution: "",
    degree: "",
    field: "",
    duration: "",
    grade: "",
    description: "",
    location: "",
    imageId: "",
    
  });


  const [experience, setExperience] = useState({
    company: "",
    position: "",
    duration: "",
    sessionTag: "",
    description: [] as string[],
    technologies: [] as string[],
    logoId: "",
    
  });

  const [skill, setSkill] = useState({
    name: "",
    category: "",
    proficiency: 0,
    iconId: "",
  });




  useEffect(() => {
    fetchData();
  }, [activeTab]);
  const fetchData = async () => {
    try {
      setIsLoading(true);
      switch (activeTab) {
        case 'intro':
          const introData = await getAdminIntro();
          setFormData(introData || {});
          break;
        case 'about':
          const aboutData = await getAdminAbout();
          setFormData(aboutData || {});
          break;
        default:
          setFormData({});
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
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage('');
    try {
      let result;
      switch (activeTab) {
        case 'intro':
          result = await updateIntroData(formData);
          break;
        case 'about':
          result = await updateAboutData(formData);
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
        <div className="space-y-6">

          <Input
            placeholder="Title"
            value={article.title}
            onChange={(e) => {
              const title = e.target.value;

              setArticle({
                ...article,
                title,
                slug: title.toLowerCase().replace(/\s+/g, "-") // ✅ auto slug
              });
            }}
          />

          <Input
            placeholder="Slug"
            value={article.slug}
            onChange={(e) => setArticle({ ...article, slug: e.target.value })}
          />

          <Input
            placeholder="Date"
            value={article.date}
            onChange={(e) => setArticle({ ...article, date: e.target.value })}
          />

          <Input
            placeholder="Read Time"
            value={article.readTime}
            onChange={(e) => setArticle({ ...article, readTime: e.target.value })}
          />

          {/* IMAGE UPLOAD */}
          <label className="flex flex-col items-center justify-center h-44 border-2 border-dashed rounded-xl cursor-pointer overflow-hidden">

            {article.imageId ? (
              <img
                src={getFileView(article.imageId) || "/placeholder-image.jpg"}
                className="w-full h-full object-cover"
              />
            ) : (
              <p>Upload Article Image</p>
            )}

            <input
              type="file"
              className="hidden"
              onChange={async (e) => {
                const file = e.target.files?.[0];
                if (!file) return;

                const res = await uploadFile(file);

                setArticle(prev => ({
                  ...prev,
                  imageId: res.$id
                }));
              }}
            />
          </label>

          <Textarea
            placeholder="Content (HTML supported)"
            value={article.content}
            onChange={(e) => setArticle({ ...article, content: e.target.value })}
            rows={6}
          />

          {/* TAGS */}
          {article.tags.map((tag, i) => (
            <Input
              key={i}
              value={tag}
              onChange={(e) => {
                const t = [...article.tags];
                t[i] = e.target.value;
                setArticle({ ...article, tags: t });
              }}
            />
          ))}

          {/* ✅ FIX: prevent form submit */}
          <Button
            type="button"
            onClick={() =>
              setArticle({ ...article, tags: [...article.tags, ""] })
            }
          >
            Add Tag
          </Button>

          {/* ✅ FIX: prevent form submit */}
          <Button
            type="button"
            onClick={async () => {
              const res = await createArticleAction(article);

              if (res.success) {
                alert("Article Added ✅");

                // ✅ reset form
                setArticle({
                  title: "",
                  content: "",
                  date: "",
                  readTime: "",
                  tags: [],
                  imageId: "",
                  slug: "",
                });
              }
            }}
          >
            Add Article
          </Button>

        </div>
      )}

      {/* Skills Tab */}
      {activeTab === 'skills' && (
        <div className="space-y-6">

          <Input
            placeholder="Skill Name"
            value={skill.name}
            onChange={(e) => setSkill({ ...skill, name: e.target.value })}
          />

          <Input
            placeholder="Category (Frontend / Backend)"
            value={skill.category}
            onChange={(e) => setSkill({ ...skill, category: e.target.value })}
          />

          <div className="space-y-1">
            <Label>Proficiency (0-100)</Label>
            <Input
              type="number"
              value={skill.proficiency}
              onChange={(e) =>
                setSkill({ ...skill, proficiency: Number(e.target.value) })
              }
            />
          </div>



          {/* ICON UPLOAD */}
          <label className="flex flex-col items-center justify-center h-32 border-2 border-dashed rounded-xl cursor-pointer overflow-hidden">

            {skill.iconId ? (
              <img
                src={getFileView(skill.iconId)}
                className="w-full h-full object-cover"
              />
            ) : (
              <p>Upload Skill Icon</p>
            )}

            <input
              type="file"
              className="hidden"
              onChange={async (e) => {
                const file = e.target.files?.[0];
                if (!file) return;

                const res = await uploadFile(file);

                setSkill(prev => ({
                  ...prev,
                  iconId: res.$id
                }));
              }}
            />
          </label>

          <Button
            type="button"
            onClick={async () => {
              const res = await createSkillAction(skill);

              if (res.success) {
                alert("Skill Added ✅");

                setSkill({
                  name: "",
                  category: "",
                  proficiency: 0,
                  iconId: "",
              
                });
              }
            }}
          >
            Add Skill
          </Button>

        </div>
      )}
      {/* Experience Tab */}
      {activeTab === 'experience' && (
        <div className="space-y-6">

          <Input
            placeholder="Company"
            value={experience.company}
            onChange={(e) => setExperience({ ...experience, company: e.target.value })}
          />

          <Input
            placeholder="Position"
            value={experience.position}
            onChange={(e) => setExperience({ ...experience, position: e.target.value })}
          />

          <Input
            placeholder="Duration"
            value={experience.duration}
            onChange={(e) => setExperience({ ...experience, duration: e.target.value })}
          />

          <Input
            placeholder="Session Tag"
            value={experience.sessionTag}
            onChange={(e) => setExperience({ ...experience, sessionTag: e.target.value })}
          />
          {/* LOGO UPLOAD */}
          <label className="flex flex-col items-center justify-center h-32 border-2 border-dashed rounded-xl cursor-pointer overflow-hidden">

            {experience.logoId ? (
              <img
                src={getFileView(experience.logoId)}
                className="w-full h-full object-cover"
              />
            ) : (
              <p>Upload Company Logo</p>
            )}

            <input
              type="file"
              className="hidden"
              onChange={async (e) => {
                const file = e.target.files?.[0];
                if (!file) return;

                const res = await uploadFile(file);

                setExperience(prev => ({
                  ...prev,
                  logoId: res.$id
                }));
              }}
            />
          </label>

          {/* DESCRIPTION */}
          {experience.description.map((desc, i) => (
            <Input
              key={i}
              value={desc}
              onChange={(e) => {
                const arr = [...experience.description];
                arr[i] = e.target.value;
                setExperience({ ...experience, description: arr });
              }}
            />
          ))}

          <Button
            type="button"
            onClick={() =>
              setExperience({ ...experience, description: [...experience.description, ""] })
            }
          >
            Add Description
          </Button>

          {/* TECHNOLOGIES */}
          {experience.technologies.map((tech, i) => (
            <Input
              key={i}
              value={tech}
              onChange={(e) => {
                const arr = [...experience.technologies];
                arr[i] = e.target.value;
                setExperience({ ...experience, technologies: arr });
              }}
            />
          ))}

          <Button
            type="button"
            onClick={() =>
              setExperience({ ...experience, technologies: [...experience.technologies, ""] })
            }
          >
            Add Tech
          </Button>

          <Button
            type="button"
            onClick={async () => {
              const res = await createExperienceAction(experience);

              if (res.success) {
                alert("Experience Added ✅");

                setExperience({
                  company: "",
                  position: "",
                  duration: "",
                  sessionTag: "",
                  description: [],
                  technologies: [],
                  logoId: "",
                  
                });
              }
            }}
          >
            Add Experience
          </Button>

        </div>
      )}

      {/* Education Tab */}
      {activeTab === 'education' && (
        <div className="space-y-6">

          <Input
            placeholder="Institution"
            value={education.institution}
            onChange={(e) => setEducation({ ...education, institution: e.target.value })}
          />

          <Input
            placeholder="Degree"
            value={education.degree}
            onChange={(e) => setEducation({ ...education, degree: e.target.value })}
          />

          <Input
            placeholder="Field"
            value={education.field}
            onChange={(e) => setEducation({ ...education, field: e.target.value })}
          />

          <Input
            placeholder="Duration"
            value={education.duration}
            onChange={(e) => setEducation({ ...education, duration: e.target.value })}
          />

          <Input
            placeholder="Grade"
            value={education.grade}
            onChange={(e) => setEducation({ ...education, grade: e.target.value })}
          />

          <Input
            placeholder="Location"
            value={education.location}
            onChange={(e) => setEducation({ ...education, location: e.target.value })}
          />
          {/* IMAGE UPLOAD */}
          <label className="flex flex-col items-center justify-center h-40 border-2 border-dashed rounded-xl cursor-pointer overflow-hidden">

            {education.imageId ? (
              <img
                src={getFileView(education.imageId)}
                className="w-full h-full object-cover"
              />
            ) : (
              <p>Upload Education Image</p>
            )}

            <input
              type="file"
              className="hidden"
              onChange={async (e) => {
                const file = e.target.files?.[0];
                if (!file) return;

                const res = await uploadFile(file);

                setEducation(prev => ({
                  ...prev,
                  imageId: res.$id
                }));
              }}
            />
          </label>

          <Textarea
            placeholder="Description"
            value={education.description}
            onChange={(e) => setEducation({ ...education, description: e.target.value })}
          />

          <Button
            type="button"
            onClick={async () => {
              const res = await createEducationAction(education);

              if (res.success) {
                alert("Education Added ✅");

                // reset
                setEducation({
                  institution: "",
                  degree: "",
                  field: "",
                  duration: "",
                  grade: "",
                  description: "",
                  location: "",
                  imageId: "",
                 
                });
              }
            }}
          >
            Add Education
          </Button>

        </div>
      )}
      {/* Achievements Tab */}
      {activeTab === 'achievements' && (
        <div className="space-y-6">

          <div className="space-y-2">
            <Label>Title</Label>
            <Input
              value={achievement.title}
              onChange={(e) => setAchievement({ ...achievement, title: e.target.value })}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Input
              placeholder="Organization"
              value={achievement.organization}
              onChange={(e) => setAchievement({ ...achievement, organization: e.target.value })}
            />
            <Input
              placeholder="Date"
              value={achievement.date}
              onChange={(e) => setAchievement({ ...achievement, date: e.target.value })}
            />
          </div>

          {/* IMAGE UPLOAD */}
          <label className="flex flex-col items-center justify-center w-full h-44 border-2 border-dashed rounded-xl cursor-pointer hover:bg-gray-50">

            {achievement.imageId ? (
              <img
                src={getFileView(achievement.imageId) || "/placeholder-image.jpg"}
                className="w-full h-full object-cover"
              />
            ) : (
              <p className="text-gray-500">Click to upload certificate</p>
            )}

            <input
              type="file"
              className="hidden"
              onChange={async (e) => {
                const file = e.target.files?.[0];
                if (!file) return;

                const res = await uploadFile(file);

                setAchievement(prev => ({
                  ...prev,
                  imageId: res.$id
                }));
              }}
            />
          </label>

          <Textarea
            placeholder="Description"
            value={achievement.description}
            onChange={(e) => setAchievement({ ...achievement, description: e.target.value })}
          />

          <Button
            onClick={async () => {
              const res = await createAchievementAction(achievement);

              if (res.success) {
                alert("Achievement Added ✅");

                setAchievement({
                  title: "",
                  organization: "",
                  date: "",
                  description: "",
                  link: "",
                  imageId: "",
                });

                fetchData();
              } else {
                alert("Error ❌");
              }
            }}
          >
            Add Achievement
          </Button>

        </div>
      )}


      {/* Projects Tab */}
      {activeTab === 'projects' && (
        <div className="space-y-6">

          {/* Project Name */}
          <div className="space-y-2">
            <Label>Project Name</Label>
            <Input
              placeholder="Enter project name"
              value={project.name}
              onChange={(e) => setProject({ ...project, name: e.target.value })}
            />
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label>Description</Label>
            <Textarea
              placeholder="Write project description (points separated by . or new line)"
              value={project.description}
              onChange={(e) => setProject({ ...project, description: e.target.value })}
              rows={4}
            />
          </div>

          {/* IMAGE UPLOAD (🔥 IMPROVED UI) */}
          <div className="space-y-2">
            <Label>Project Image</Label>

            <label className="flex flex-col items-center justify-center w-full h-44 border-2 border-dashed border-gray-300 rounded-xl cursor-pointer hover:bg-gray-50 transition overflow-hidden">

              {project.imageId ? (
                <img
                  src={getFileView(project.imageId) || "/placeholder-image.jpg"}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="text-center text-gray-500">
                  <p className="text-sm font-medium">Click to upload image</p>
                  <p className="text-xs">PNG, JPG, WEBP</p>
                </div>
              )}

              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={async (e) => {
                  const file = e.target.files?.[0];
                  if (!file) return;

                  const res = await uploadFile(file);

                  setProject(prev => ({
                    ...prev,
                    imageId: res.$id
                  }));
                }}
              />
            </label>
          </div>

          {/* Technologies (Tags) */}
          <div className="space-y-2">
            <Label>Technologies Used</Label>

            {project.tags.map((tag, index) => (
              <div key={index} className="flex gap-2">
                <Input
                  value={tag}
                  onChange={(e) => {
                    const newTags = [...project.tags];
                    newTags[index] = e.target.value;
                    setProject({ ...project, tags: newTags });
                  }}
                  placeholder="e.g. React"
                />
                <Button
                  type="button"
                  variant="destructive"
                  onClick={() => {
                    const newTags = project.tags.filter((_, i) => i !== index);
                    setProject({ ...project, tags: newTags });
                  }}
                >
                  Remove
                </Button>
              </div>
            ))}

            <Button
              type="button"
              variant="outline"
              onClick={() =>
                setProject({ ...project, tags: [...project.tags, ""] })
              }
            >
              + Add Technology
            </Button>
          </div>

          {/* Links */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Project Link</Label>
              <Input
                placeholder="https://your-live-link.com"
                value={project.link}
                onChange={(e) => setProject({ ...project, link: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label>GitHub Link</Label>
              <Input
                placeholder="https://github.com/your-repo"
                value={project.github}
                onChange={(e) => setProject({ ...project, github: e.target.value })}
              />
            </div>
          </div>

          {/* ADD BUTTON */}
          <div className="pt-4">
            <Button
              className="w-full md:w-auto"
              onClick={async () => {
                const res = await createProjectAction(project);

                if (res.success) {
                  alert("Project Added ✅");

                  setProject({
                    name: "",
                    description: "",
                    tags: [],
                    imageId: "",
                    link: "",
                    github: "",
                  });

                  fetchData();
                } else {
                  alert("Error ❌");
                }
              }}
            >
              Add Project
            </Button>
          </div>

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
        <div className="space-y-6">

          <Input
            placeholder="Title"
            value={blog.title}
            onChange={(e) => {
              const title = e.target.value;
              setBlog({
                ...blog,
                title,
                slug: title.toLowerCase().replace(/\s+/g, "-")
              });
            }}
          />

          <Input
            placeholder="Slug"
            value={blog.slug}
            onChange={(e) => setBlog({ ...blog, slug: e.target.value })}
          />

          <Input
            placeholder="Author"
            value={blog.author}
            onChange={(e) => setBlog({ ...blog, author: e.target.value })}
          />

          <Input
            placeholder="Date"
            value={blog.date}
            onChange={(e) => setBlog({ ...blog, date: e.target.value })}
          />

          <Input
            placeholder="Read Time"
            value={blog.readTime}
            onChange={(e) => setBlog({ ...blog, readTime: e.target.value })}
          />

          {/* IMAGE */}
          <label className="flex flex-col items-center justify-center h-44 border-2 border-dashed rounded-xl cursor-pointer overflow-hidden">

            {blog.imageId ? (
              <img
                src={getFileView(blog.imageId)}
                className="w-full h-full object-cover"
              />
            ) : (
              <p>Upload Blog Image</p>
            )}

            <input
              type="file"
              className="hidden"
              onChange={async (e) => {
                const file = e.target.files?.[0];
                if (!file) return;

                const res = await uploadFile(file);

                setBlog(prev => ({
                  ...prev,
                  imageId: res.$id
                }));
              }}
            />
          </label>

          <Textarea
            placeholder="Content (HTML supported)"
            value={blog.content}
            onChange={(e) => setBlog({ ...blog, content: e.target.value })}
          />

          {/* TAGS */}
          {blog.tags.map((tag, i) => (
            <Input
              key={i}
              value={tag}
              onChange={(e) => {
                const t = [...blog.tags];
                t[i] = e.target.value;
                setBlog({ ...blog, tags: t });
              }}
            />
          ))}

          <Button
            type="button"
            onClick={() =>
              setBlog({ ...blog, tags: [...blog.tags, ""] })
            }
          >
            Add Tag
          </Button>

          <Button
            type="button"
            onClick={async () => {
              const res = await createBlogAction(blog);

              if (res.success) {
                alert("Blog Added ✅");

                // ✅ RESET
                setBlog({
                  title: "",
                  excerpt: "",
                  content: "",
                  date: "",
                  readTime: "",
                  tags: [],
                  imageId: "",
                  slug: "",
                  author: "",
                });
              }
            }}
          >
            Add Blog
          </Button>

        </div>
      )}


      {/* Submit Button */}
      {(activeTab === 'intro' || activeTab === 'about') && (
  <div className="flex justify-end pt-4 border-t">
    <Button
      onClick={handleSubmit}
      disabled={isLoading}
      className="px-4 py-2"
    >
      {isLoading ? 'Saving...' : 'Save Changes'}
    </Button>
  </div>
)}
    </form>
  );
}