import React from 'react';
import PropTypes from 'prop-types';

import { useIntl } from '@edx/frontend-platform/i18n';

import FileCard from './FileCard';
import { ErrorBanner, LoadingBanner } from './Banners';
import { useRenderData } from './hooks';

/**
 * <FileRenderer />
 */
export const FileRenderer = ({ file }) => {
  const { formatMessage } = useIntl();
  const {
    Renderer,
    isLoading,
    errorStatus,
    error,
    rendererProps,
  } = useRenderData({ file, formatMessage });

  return (
    <FileCard key={file.fileUrl} file={file}>
      {isLoading && <LoadingBanner />}
      {errorStatus ? (
        <ErrorBanner {...error} />
      ) : (
        <Renderer {...rendererProps} />
      )}
    </FileCard>
  );
};

FileRenderer.defaultProps = {};
FileRenderer.propTypes = {
  file: PropTypes.shape({
    fileName: PropTypes.string,
    fileUrl: PropTypes.string,
  }).isRequired,
  // injected
  // intl: intlShape.isRequired,
};

export default FileRenderer;
