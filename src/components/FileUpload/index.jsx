import React from 'react';
import PropTypes from 'prop-types';
import { DataTable, Dropzone } from '@edx/paragon';

import { useSubmissionResponse } from 'data/services/lms/hooks/selectors';

import { useIntl } from '@edx/frontend-platform/i18n';
import filesize from 'filesize';

import messages from './messages';

const FileUpload = ({ isReadOnly }) => {
  const { uploadedFiles } = useSubmissionResponse();
  const { formatMessage } = useIntl();
  return (
    <div>
      <h3>File Upload</h3>
      {uploadedFiles && (
        <>
          <b>Uploaded Files</b>
          <DataTable
            itemCount={uploadedFiles.length}
            data={uploadedFiles.map(file => ({
              ...file,
              size: typeof file.size === 'number' ? filesize(file.size) : 'Unknown',
            }))}
            columns={[
              {
                Header: formatMessage(messages.fileNameTitle),
                accessor: 'fileName',
              },
              {
                Header: formatMessage(messages.fileDescriptionTitle),
                accessor: 'fileDescription',
              },
              {
                Header: formatMessage(messages.fileSizeTitle),
                accessor: 'fileSize',
              },
            ]}
          />
        </>
      )}
      {!isReadOnly && <Dropzone />}
    </div>
  );
};

FileUpload.defaultProps = {
  isReadOnly: false,
};
FileUpload.propTypes = {
  isReadOnly: PropTypes.bool,
};

export default FileUpload;
