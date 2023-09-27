import { useCallback } from 'react';

import { StrictDict, useKeyedState } from '@edx/react-unit-test-utils';

export const stateKeys = StrictDict({
  errors: 'errors',
  isModalOpen: 'isModalOpen',
  uploadArgs: 'uploadArgs',
  description: 'description',
});
export const useUploadConfirmModalHooks = ({
  files, closeHandler, uploadHandler,
}) => {
  const [description, setDescription] = useKeyedState(stateKeys.description, null);
  const [errors, setErrors] = useKeyedState(stateKeys.errors, []);

  const confirmUploadClickHandler = () => {
    const errorList = files.map((file) => (!file.description));
    setErrors(errorList);
    if (errorList.some((error) => error)) {
      return;
    }
    uploadHandler();
  };

  const exitHandler = () => {
    setErrors([]);
    closeHandler();
  };

  // Modifying pointer of file object. This is not a good practice.
  // eslint-disable-next-line no-param-reassign, no-return-assign
  const onFileDescriptionChange = (event) => setDescription(event.target.value);

  return {
    errors,
    confirmUploadClickHandler,
    exitHandler,
    onFileDescriptionChange,
  };
};

export const useFileUploadHooks = ({
  onFileUploaded,
}) => {
  const [uploadArgs, setUploadArgs] = useKeyedState(stateKeys.uploadArgs, {});
  const [isModalOpen, setIsModalOpen] = useKeyedState(stateKeys.isModalOpen, false);

  const confirmUpload = useCallback(async () => {
    setIsModalOpen(false);
    if (onFileUploaded) {
      await onFileUploaded(uploadArgs);
    }
    setUploadArgs({});
  }, [uploadArgs, onFileUploaded, setIsModalOpen, setUploadArgs]);

  const closeUploadModal = useCallback(() => {
    setIsModalOpen(false);
    setUploadArgs({});
  }, [setIsModalOpen, setUploadArgs]);

  const onProcessUpload = useCallback(({ fileData, handleError, requestConfig }) => {
    setIsModalOpen(true);
    setUploadArgs({ fileData, handleError, requestConfig });
  }, [setIsModalOpen, setUploadArgs]);

  return {
    isModalOpen,
    uploadArgs,
    confirmUpload,
    closeUploadModal,
    onProcessUpload,
  };
};

export default {
  useUploadConfirmModalHooks,
  useFileUploadHooks,
};
