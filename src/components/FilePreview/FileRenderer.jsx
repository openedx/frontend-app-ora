import React from 'react';
import PropTypes from 'prop-types';

import { useIntl } from '@edx/frontend-platform/i18n';

import FileCard from './FileCard';
import { ErrorBanner, LoadingBanner } from './Banners';
import { renderHooks } from './hooks';

/**
 * <FileRenderer />
 */
export const FileRenderer = ({
  file,
}) => {
  const { formatMessage } = useIntl();
  const {
    Renderer,
    isLoading,
    errorStatus,
    error,
    rendererProps,
  } = renderHooks({ file, formatMessage });

  return (
    <FileCard key={file.downloadUrl} file={file}>
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
    name: PropTypes.string,
    downloadUrl: PropTypes.string,
  }).isRequired,
  // injected
  // intl: intlShape.isRequired,
};

export default FileRenderer;
