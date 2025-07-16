import { useSnackbar } from 'notistack';
import { useState, useCallback } from 'react';

import { useFileDownload } from 'src/hooks/use-file-download';

import { useTranslate } from 'src/locales';

import {
  ListFilesDocument,
  File as GraphQLFile,
  useDeleteFileMutation,
  useCreateFilesMutation,
  useListFilesInFolderQuery,
  ListFilesInFolderDocument,
} from 'src/types/graphql/typeDefs';

type UseFileDrawerProps = {
  item: GraphQLFile;
  onClose: () => void;
};

export function useFileDrawer({ item, onClose }: UseFileDrawerProps) {
  const { t } = useTranslate();
  const { enqueueSnackbar } = useSnackbar();
  const { downloadFile, isDownloading } = useFileDownload();
  const [files, setFiles] = useState<File[]>([]);
  const [openCreateFolder, setOpenCreateFolder] = useState(false);
  const [upload, setUpload] = useState({ value: false, onTrue: () => {} });

  const [createFiles, { loading }] = useCreateFilesMutation({
    onCompleted: () => {
      enqueueSnackbar(t('common.files_uploaded'), { variant: 'success' });
      setFiles([]);
      setUpload({ value: false, onTrue: () => {} });
    },
    refetchQueries: [ListFilesDocument, ListFilesInFolderDocument],
  });

  const [deleteFile, { loading: isDeleting }] = useDeleteFileMutation({
    onCompleted: () => {
      enqueueSnackbar(t('profile.files.delete_success'), { variant: 'success' });
      onClose();
    },
    refetchQueries: [ListFilesDocument, ListFilesInFolderDocument],
  });

  const { data: folderData } = useListFilesInFolderQuery({
    variables: { folderId: item.id },
    skip: !item.isFolder,
  });

  const folderFiles = folderData?.listFilesInFolder || [];

  const handleDrop = useCallback(
    (acceptedFiles: File[]) => {
      setFiles([...files, ...acceptedFiles]);
    },
    [files]
  );

  const handleUpload = () => {
    createFiles({
      variables: {
        files,
        parentFolderId: item.id,
      },
    });
  };

  const handleRemoveFile = (inputFile: File) => {
    const filtered = files.filter((file) => file !== inputFile);
    setFiles(filtered);
  };

  const handleDownload = async () => {
    try {
      if (item.downloadUrl) {
        await downloadFile(item.downloadUrl, item.displayName);
        enqueueSnackbar(t('profile.files.download_success'), { variant: 'success' });
      }
    } catch (error) {
      enqueueSnackbar(t('profile.files.download_error'), { variant: 'error' });
    }
  };

  const handleDelete = async () => {
    try {
      await deleteFile({
        variables: {
          id: item.id,
        },
      });
    } catch (error) {
      enqueueSnackbar(t('common.error'), { variant: 'error' });
    }
  };

  return {
    files,
    upload,
    loading,
    isDeleting,
    isDownloading,
    folderFiles,
    handleDrop,
    handleUpload,
    handleDelete,
    handleRemoveFile,
    handleDownload,
    setOpenCreateFolder,
    setUpload,
    openCreateFolder,
  };
}
