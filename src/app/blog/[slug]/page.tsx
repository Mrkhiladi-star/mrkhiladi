'use client';

import BlogListLayout from '@/app/blog/page'; // 👈 IMPORTANT
import { useParams } from 'next/navigation';

export default function BlogSlugPage() {
  const params = useParams();
  const slug = params?.slug as string;

  return <BlogListLayout initialSlug={slug} />;
}