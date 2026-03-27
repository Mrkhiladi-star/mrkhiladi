'use client';

import ArticleLayout from '@/app/components/ArticleLayout';
import { useParams } from 'next/navigation';

export default function Page() {
  const params = useParams();
  return <ArticleLayout initialSlug={params.slug as string} />;
}