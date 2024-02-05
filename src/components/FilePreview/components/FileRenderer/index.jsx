import React from 'react';
import PropTypes from 'prop-types';

import { useIntl } from '@edx/frontend-platform/i18n';

import FileCard from './FileCard';
import { ErrorBanner, LoadingBanner } from './Banners';
import { useRenderData } from './hooks';

/**
 * <FileRenderer />
 */
export const FileRenderer = ({ file, defaultOpen }) => {
  const { formatMessage } = useIntl();
  const {
    Renderer,
    isLoading,
    errorStatus,
    error,
    rendererProps,
  } = useRenderData({ file, formatMessage });

  if (isLoading) {
    return (
      <FileCard defaultOpen={defaultOpen} file={file}>
        <LoadingBanner />
      </FileCard>
    );
  }

  return (
    <FileCard defaultOpen={defaultOpen} file={file}>
      {errorStatus ? (
        <ErrorBanner {...error} />
      ) : (
        <Renderer {...rendererProps} />
      )}
    </FileCard>
  );
};

FileRenderer.defaultProps = {
  defaultOpen: true,
};
FileRenderer.propTypes = {
  file: PropTypes.shape({
    fileName: PropTypes.string,
    fileUrl: PropTypes.string,
  }).isRequired,
  defaultOpen: PropTypes.bool,
  // injected
  // intl: intlShape.isRequired,
};

export default FileRenderer;
