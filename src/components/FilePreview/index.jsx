import React from 'react';
import PropTypes from 'prop-types';

import { useResponse } from 'hooks/app';
import { FileRenderer, isSupported } from './components';

const FilePreview = ({ defaultCollapsePreview }) => {
  const { uploadedFiles } = useResponse() || {};
  if (!uploadedFiles) {
    return null;
  }
  // console.log({ files: uploadedFiles.filter(isSupported) });
  return (
    <div>
      {uploadedFiles.filter(isSupported).map((file) => (
        <FileRenderer key={file.fileName} file={file} defaultOpen={!defaultCollapsePreview} />
      ))}
    </div>
  );
};
FilePreview.propTypes = {
  defaultCollapsePreview: PropTypes.bool.isRequired,
};

export default FilePreview;
