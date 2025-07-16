import { useState } from 'react';

interface UseFileDownloadReturn {
  downloadFile: (url: string, filename: string) => Promise<void>;
  isDownloading: boolean;
}

export const useFileDownload = (): UseFileDownloadReturn => {
  const [isDownloading, setIsDownloading] = useState(false);

  const downloadFile = async (url: string, filename: string) => {
    try {
      setIsDownloading(true);

      const response = await fetch(url);

      if (!response.ok) {
        throw new Error('Erreur lors du téléchargement');
      }

      const blob = await response.blob();
      const downloadUrl = window.URL.createObjectURL(blob);

      const link = document.createElement('a');
      link.href = downloadUrl;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      link.remove();

      // Nettoyer l'URL créée
      window.URL.revokeObjectURL(downloadUrl);
    } catch (error) {
      console.error('Erreur de téléchargement:', error);
      throw error;
    } finally {
      setIsDownloading(false);
    }
  };

  return { downloadFile, isDownloading };
};
