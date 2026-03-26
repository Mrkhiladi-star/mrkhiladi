import { storage } from '@/models/client/config';
import { portfolioImagesBucket } from '@/models/name';

export const getFileView = (fileId: string): string => {
  if (!fileId) return ""; // ✅ NEVER return null

  return `${process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT}/storage/buckets/${portfolioImagesBucket}/files/${fileId}/view?project=${process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID}`;
};

export const uploadFile = async (file: File) => {
  return await storage.createFile(portfolioImagesBucket, 'unique()', file);
};