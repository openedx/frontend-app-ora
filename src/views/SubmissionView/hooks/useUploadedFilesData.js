import { useCallback } from 'react';

import { StrictDict, useKeyedState } from '@edx/react-unit-test-utils';

import {
  useResponseData,
  useUploadFiles,
  useDeleteFile,
} from 'hooks/app';

export const stateKeys = StrictDict({ uploadedFiles: 'uploadedFiles' });

const useUploadedFilesData = () => {
  const deleteFileMutation = useDeleteFile();
  const uploadFilesMutation = useUploadFiles();

  const response = useResponseData();

  const [value, setValue] = useKeyedState(
    stateKeys.uploadedFiles,
    response ? response.uploadedFiles : [],
  );

  const onFileUploaded = useCallback(async (data) => {
    // const { fileData, queryClient } = data;
    const uploadResponse = await uploadFilesMutation.mutateAsync(data);
    if (uploadResponse) {
      setValue((oldFiles) => [...oldFiles, uploadResponse.uploadedFiles[0]]);
    }
  }, [uploadFilesMutation, setValue]);

  const onDeletedFile = deleteFileMutation.mutateAsync;

  return {
    uploadedFiles: value,
    onFileUploaded,
    onDeletedFile,
  };
};

export default useUploadedFilesData;
