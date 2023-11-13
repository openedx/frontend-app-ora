import React from 'react';

import { useResponseData } from 'hooks/app';
import { FileRenderer, isSupported } from './components';

const FilePreview = ({ defaultCollapsePreview }) => {
  const { uploadedFiles } = useResponseData();
  console.log({ files: uploadedFiles.filter(isSupported) });
  return (
    <div>
      {uploadedFiles.filter(isSupported).map((file) => (
        <FileRenderer key={file.fileName} file={file} defaultOpen={!defaultCollapsePreview} />
      ))}
    </div>
  );
};

export default FilePreview;
