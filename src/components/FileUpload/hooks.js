import { useCallback } from 'react';

import { StrictDict, useKeyedState } from '@edx/react-unit-test-utils';
import { useDownloadFiles } from 'hooks/app';

export const stateKeys = StrictDict({
  shouldShowError: 'shouldShowError',
  isModalOpen: 'isModalOpen',
  uploadArgs: 'uploadArgs',
  description: 'description',
});

export const useUploadConfirmModalHooks = ({
  file,
  closeHandler,
  uploadHandler,
}) => {
  const [description, setDescription] = useKeyedState(stateKeys.description, '');
  const [shouldShowError, setShouldShowError] = useKeyedState(
    stateKeys.shouldShowError,
    false,
  );

  const confirmUploadClickHandler = () => {
    console.log({ confirmUploadClick: { description } });
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
  const [uploadArgs, setUploadArgs] = useKeyedState(stateKeys.uploadArgs, {});
  const [isModalOpen, setIsModalOpen] = useKeyedState(
    stateKeys.isModalOpen,
    false,
  );

  const confirmUpload = useCallback(async (file, description) => {
    console.log({ confirmUpload: { file, description } });
    setIsModalOpen(false);
    if (onFileUploaded) {
      console.log({ uploadArgs });
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
};
