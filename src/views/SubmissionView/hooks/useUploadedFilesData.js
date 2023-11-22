import React from 'react';

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

  React.useEffect(() => {
    setValue(response.uploadedFiles);
  }, [setValue, response.uploadedFiles]);

  const onFileUploaded = uploadFilesMutation.mutateAsync;
  const onDeletedFile = deleteFileMutation.mutateAsync;

  return {
    uploadedFiles: value,
    onFileUploaded,
    onDeletedFile,
  };
};

export default useUploadedFilesData;
