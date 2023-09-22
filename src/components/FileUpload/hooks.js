import { useState, useReducer, useCallback } from 'react';

export const useUploadConfirmModalHooks = ({
  files, closeHandler, uploadHandler,
}) => {
  const [errors, setErrors] = useState([]);

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
  const onFileDescriptionChange = (file) => (event) => file.description = event.target.value;

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
  const [uploadState, dispatchUploadState] = useReducer(
    (state, payload) => ({ ...state, ...payload }),
    {
      onProcessUploadArgs: {},
      openModal: false,
    },
  );

  const confirmUpload = useCallback(async () => {
    dispatchUploadState({ openModal: false });
    await onFileUploaded(uploadState.onProcessUploadArgs);
    dispatchUploadState({ onProcessUploadArgs: {} });
  }, [uploadState, onFileUploaded]);

  const closeUploadModal = useCallback(() => {
    dispatchUploadState({ openModal: false, onProcessUploadArgs: {} });
  }, []);

  const onProcessUpload = useCallback(({ fileData, handleError, requestConfig }) => {
    dispatchUploadState({
      onProcessUploadArgs: { fileData, handleError, requestConfig },
      openModal: true,
    });
  }, []);

  return {
    uploadState,
    confirmUpload,
    closeUploadModal,
    onProcessUpload,
  };
};

export default {
  useUploadConfirmModalHooks,
  useFileUploadHooks,
};
