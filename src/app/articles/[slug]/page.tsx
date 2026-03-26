'use client';

import ArticleListLayout from '@/app/articles/page';
import { useParams } from 'next/navigation';

export default function ArticleSlugPage() {
  const params = useParams();
  const slug = params?.slug as string;

  return <ArticleListLayout initialSlug={slug} />;
}