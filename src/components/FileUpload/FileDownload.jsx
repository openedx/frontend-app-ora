import React from 'react';
import PropTypes from 'prop-types';
import { useParams } from 'react-router';

import { FormattedMessage } from '@edx/frontend-platform/i18n';
import { StatefulButton, Icon } from '@edx/paragon';

import { MutationStatus } from 'constants';

import { useFileDownloadHooks } from './hooks';
import messages from './messages';

/**
 * <FileDownload />
 */
const FileDownload = ({ files }) => {
  const { xblockId } = useParams();
  const { downloadFiles, status } = useFileDownloadHooks({
    files,
    zipFileName: xblockId,
  });
  return (
    <StatefulButton
      state={status}
      disabledStates={[MutationStatus.loading, MutationStatus.success]}
      onClick={downloadFiles}
      icons={{
        [MutationStatus.idle]: <Icon className="fa fa-download" />,
        [MutationStatus.loading]: <Icon className="fa fa-spinner fa-spin" />,
        [MutationStatus.success]: <Icon className="fa fa-check" />,
        [MutationStatus.error]: <Icon className="fa fa-refresh" />,
      }}
      labels={{
        [MutationStatus.idle]: <FormattedMessage {...messages.downloadFiles} />,
        [MutationStatus.loading]: (
          <FormattedMessage {...messages.downloading} />
        ),
        [MutationStatus.success]: <FormattedMessage {...messages.downloaded} />,
        [MutationStatus.error]: (
          <FormattedMessage {...messages.retryDownload} />
        ),
      }}
    />
  );
};

FileDownload.defaultProps = {};
FileDownload.propTypes = {
  files: PropTypes.arrayOf(
    PropTypes.shape({
      fileUrl: PropTypes.string.isRequired,
      fileName: PropTypes.string.isRequired,
      fileDescription: PropTypes.string,
    })
  ).isRequired,
};

export default FileDownload;
