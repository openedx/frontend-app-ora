import React from 'react';
import { DataTable, Dropzone } from '@edx/paragon';

import { useSubmissionResponse } from 'data/services/lms/hooks/selectors';

import { useIntl } from '@edx/frontend-platform/i18n';
import filesize from 'filesize';

import messages from './messages';

const FileUpload = () => {
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
                accessor: 'name',
              },
              {
                Header: formatMessage(messages.fileDescriptionTitle),
                accessor: 'description',
              },
              {
                Header: formatMessage(messages.fileSizeTitle),
                accessor: 'size',
              },
            ]}
          />
        </>
      )}
      <Dropzone />
    </div>
  );
};

export default FileUpload;
