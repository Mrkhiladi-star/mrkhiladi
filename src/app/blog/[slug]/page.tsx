'use client';

import BlogLayout from '@/app/components/BlogLayout';
import { useParams } from 'next/navigation';

export default function Page() {
  const params = useParams();
  return <BlogLayout initialSlug={params.slug as string} />;
}