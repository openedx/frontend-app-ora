import React from 'react';

import { useResponseData } from 'data/services/lms/hooks/selectors';
import { FileRenderer, isSupported } from './components';

const FilePreview = ({ defaultCollapsePreview }) => {
  const { uploadedFiles } = useResponseData();
  return (
    <div>
      {uploadedFiles.filter(isSupported).map((file) => (
        <FileRenderer key={file.name} file={file} defaultOpen={!defaultCollapsePreview} />
      ))}
    </div>
  );
};

export default FilePreview;
