import { useState, useEffect } from 'react';

import {
  useResponseData,
  useUploadFiles,
  useDeleteFile,
} from 'hooks/app';

const useUploadedFilesData = () => {
  const deleteFileMutation = useDeleteFile();
  const uploadFilesMutation = useUploadFiles();

  const response = useResponseData() || {};

  const [value, setValue] = useState(
    response?.uploadedFiles ? response.uploadedFiles : [],
  );

  useEffect(() => {
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
