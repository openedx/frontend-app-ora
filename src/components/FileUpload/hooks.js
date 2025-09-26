import { useCallback, useState } from 'react';
import { useDownloadFiles } from 'hooks/app';

export const useUploadConfirmModalHooks = ({
  file,
  closeHandler,
  uploadHandler,
}) => {
  const [description, setDescription] = useState('');
  const [shouldShowError, setShouldShowError] = useState(false);

  const confirmUploadClickHandler = () => {
    if (description !== '') {
      uploadHandler(file, description);
    } else {
      setShouldShowError(true);
    }
  };

  const exitHandler = () => {
    setShouldShowError(false);
    setDescription('');
    closeHandler();
  };

  // Modifying pointer of file object. This is not a good practice.
  // eslint-disable-next-line no-param-reassign, no-return-assign
  const onFileDescriptionChange = (event) => setDescription(event.target.value);

  return {
    shouldShowError,
    confirmUploadClickHandler,
    exitHandler,
    onFileDescriptionChange,
  };
};

export const useFileUploadHooks = ({ onFileUploaded }) => {
  const [uploadArgs, setUploadArgs] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);

  const confirmUpload = useCallback(async (file, description) => {
    setIsModalOpen(false);
    if (onFileUploaded) {
      await onFileUploaded({ ...uploadArgs, description });
    }
    setUploadArgs({});
  }, [uploadArgs, onFileUploaded, setIsModalOpen, setUploadArgs]);

  const closeUploadModal = useCallback(() => {
    setIsModalOpen(false);
    setUploadArgs({});
  }, [setIsModalOpen, setUploadArgs]);

  const onProcessUpload = useCallback(
    ({ fileData, handleError, requestConfig }) => {
      setIsModalOpen(true);
      setUploadArgs({ fileData, handleError, requestConfig });
    },
    [setIsModalOpen, setUploadArgs],
  );

  return {
    isModalOpen,
    uploadArgs,
    confirmUpload,
    closeUploadModal,
    onProcessUpload,
  };
};

export const useFileDownloadHooks = ({ files, zipFileName }) => {
  const downloadFileMation = useDownloadFiles();
  const downloadFiles = () => downloadFileMation.mutate({
    files,
    zipFileName,
  });
  return {
    downloadFiles,
    status: downloadFileMation.status,
  };
};

export default {
  useUploadConfirmModalHooks,
  useFileUploadHooks,
  useFileDownloadHooks,
};
