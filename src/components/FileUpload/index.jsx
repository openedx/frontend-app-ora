import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { DataTable, Dropzone } from '@edx/paragon';

import { useIntl } from '@edx/frontend-platform/i18n';

import filesize from 'filesize';

import messages from './messages';
import UploadConfirmModal from './UploadConfirmModal';

import './styles.scss';
import ActionCell from './ActionCell';

const FileUpload = ({ isReadOnly, uploadedFiles, onFileUploaded }) => {
  const { formatMessage } = useIntl();

  const [uploadState, dispatchUploadState] = React.useReducer(
    (state, payload) => ({ ...state, ...payload }),
    {
      onProcessUploadArgs: {},
      openModal: false,
    },
  );

  const confirmUpload = useCallback(async () => {
    dispatchUploadState({ openModal: false });
    await onFileUploaded(uploadState.onProcessUploadArgs);
    dispatchUploadState({ onProcessUploadArgs: {} });
  }, [uploadState, uploadedFiles, onFileUploaded]);

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
                Cell: ActionCell,
              },
            ]}
          />
        </>
      )}
      {!isReadOnly && (
        <Dropzone
          multiple
          onProcessUpload={({ fileData, handleError, requestConfig }) => {
            dispatchUploadState({
              onProcessUploadArgs: { fileData, handleError, requestConfig },
              openModal: true,
            });
          }}
          progressVariant="bar"
        />
      )}
      <UploadConfirmModal
        open={uploadState.openModal}
        files={uploadState.onProcessUploadArgs.fileData?.getAll('file')}
        closeHandler={() => dispatchUploadState({ openModal: false, onProcessUploadArgs: {} })}
        uploadHandler={confirmUpload}
      />
    </div>
  );
};

FileUpload.defaultProps = {
  isReadOnly: false,
  uploadedFiles: [],
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
  onFileUploaded: PropTypes.func.isRequired,
};

export default FileUpload;
