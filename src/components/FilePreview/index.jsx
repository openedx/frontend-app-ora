import React from 'react';

import { useResponseData } from 'data/services/lms/hooks/selectors';
import { FileRenderer, isSupported } from './components';

const FilePreview = () => {
  const { uploadedFiles } = useResponseData();
  return (
    <div>
      {uploadedFiles.filter(isSupported).map((file) => (
        <FileRenderer key={file.name} file={file} />
      ))}
    </div>
  );
};

export default FilePreview;
