interface BlogPostSummary {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  tags: string[];
  image: string | null;
  slug: string;
}
interface BlogListProps {
  posts: BlogPostSummary[];
  selectedSlug: string | null;
  onSelectPost: (slug: string) => void;
}
export default function BlogList({ posts, selectedSlug, onSelectPost }: BlogListProps) {
  return (
    <nav className="space-y-4">
      {posts.map((post) => (
        <div
          key={post.id}
          className={`p-4 rounded-lg transition-colors duration-200 cursor-pointer 
            ${post.slug === selectedSlug 
              ? 'bg-teal-700/50 border border-teal-500' 
              : 'bg-gray-800/50 hover:bg-gray-700/50 border border-gray-800'
            }`
          }
          onClick={() => onSelectPost(post.slug)}
        >
          <h3 className={`text-lg font-bold ${post.slug === selectedSlug ? 'text-white' : 'text-teal-400'}`}>
            {post.title}
          </h3>
          <p className="text-sm text-gray-400 mt-1 line-clamp-2">{post.excerpt}</p>
          <div className="flex justify-between items-center text-xs text-gray-500 mt-2">
            <span>{post.date}</span>
            <span>{post.readTime}</span>
          </div>
        </div>
      ))}
    </nav>
  );
}