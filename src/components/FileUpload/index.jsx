import React from 'react';
import PropTypes from 'prop-types';

import { DataTable, Dropzone } from '@edx/paragon';
import { useIntl } from '@edx/frontend-platform/i18n';

import filesize from 'filesize';

import UploadConfirmModal from './UploadConfirmModal';
import ActionCell from './ActionCell';

import { useFileUploadHooks } from './hooks';
import messages from './messages';

import './styles.scss';

const FileUpload = ({
  isReadOnly, uploadedFiles, onFileUploaded, onDeletedFile,
}) => {
  const { formatMessage } = useIntl();

  const {
    uploadState,
    confirmUpload,
    closeUploadModal,
    onProcessUpload,
  } = useFileUploadHooks({
    onFileUploaded,
  });

  return (
    <div>
      <h3>File Upload</h3>
      {uploadedFiles.length > 0 && (
        <>
          <b>Uploaded Files</b>
          <DataTable
            itemCount={uploadedFiles.length}
            data={uploadedFiles.map((file) => ({
              ...file,
              size:
                typeof file.size === 'number' ? filesize(file.size) : 'Unknown',
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
              {
                Header: formatMessage(messages.fileActionsTitle),
                accessor: 'actions',
                // eslint-disable-next-line react/no-unstable-nested-components
                Cell: (props) => <ActionCell {...props} onDeletedFile={onDeletedFile} disabled={isReadOnly} />,
              },
            ]}
          />
        </>
      )}
      {!isReadOnly && (
        <Dropzone
          multiple
          onProcessUpload={onProcessUpload}
          progressVariant="bar"
        />
      )}
      <UploadConfirmModal
        open={uploadState.openModal}
        files={uploadState.onProcessUploadArgs.fileData?.getAll('file')}
        closeHandler={closeUploadModal}
        uploadHandler={confirmUpload}
      />
    </div>
  );
};

FileUpload.defaultProps = {
  isReadOnly: false,
  uploadedFiles: [],
  onFileUploaded: () => { },
  onDeletedFile: () => { },
};
FileUpload.propTypes = {
  isReadOnly: PropTypes.bool,
  uploadedFiles: PropTypes.arrayOf(
    PropTypes.shape({
      fileDescription: PropTypes.string,
      fileName: PropTypes.string,
      fileSize: PropTypes.number,
    }),
  ),
  onFileUploaded: PropTypes.func,
  onDeletedFile: PropTypes.func,
};

export default FileUpload;
