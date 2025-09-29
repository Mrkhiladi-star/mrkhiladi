import { storage } from '@/models/client/config';
import { portfolioImagesBucket } from '@/models/name';
// Function to get file preview URL
export const getFilePreview = (fileId: string, width: number = 400, height: number = 300) => {
  return storage.getFilePreview(portfolioImagesBucket, fileId, width, height);
};
// Function to get file view URL
export const getFileView = (fileId: string) => {
  return storage.getFileView(portfolioImagesBucket, fileId);
};
// Function to upload file
export const uploadFile = async (file: File) => {
  return await storage.createFile(portfolioImagesBucket, 'unique()', file);
};
// Function to delete file
export const deleteFile = async (fileId: string) => {
  return await storage.deleteFile(portfolioImagesBucket, fileId);
};
// Function to get file information
export const getFile = async (fileId: string) => {
  return await storage.getFile(portfolioImagesBucket, fileId);
};
// Function to list files
export const listFiles = async () => {
  return await storage.listFiles(portfolioImagesBucket);
};