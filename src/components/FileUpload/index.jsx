import React from 'react';
import PropTypes from 'prop-types';
import filesize from 'filesize';

import { DataTable, Dropzone } from '@edx/paragon';
import { useIntl } from '@edx/frontend-platform/i18n';

import { nullMethod } from 'hooks';

import UploadConfirmModal from './UploadConfirmModal';
import ActionCell from './ActionCell';
import { useFileUploadHooks } from './hooks';
import messages from './messages';
import FilePreview from 'components/FilePreview';

import './styles.scss';

export const createFileActionCell = ({ onDeletedFile, isReadOnly }) => (props) => (
  <ActionCell {...props} onDeletedFile={onDeletedFile} disabled={isReadOnly} />
);

const FileUpload = ({
  isReadOnly,
  uploadedFiles,
  onFileUploaded,
  onDeletedFile,
}) => {
  const { formatMessage } = useIntl();

  const {
    confirmUpload,
    closeUploadModal,
    isModalOpen,
    onProcessUpload,
    uploadArgs,
  } = useFileUploadHooks({
    onFileUploaded,
  });
  return (
    <div>
      <h3>File Upload</h3>
      {isReadOnly && <FilePreview />}
      {uploadedFiles.length > 0 && (
        <>
          <b>Uploaded Files</b>
          <DataTable
            itemCount={uploadedFiles.length}
            data={uploadedFiles.map((file) => ({
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
              {
                Header: formatMessage(messages.fileActionsTitle),
                accessor: 'actions',
                Cell: createFileActionCell({ onDeletedFile, isReadOnly }),
              },
            ]}
          />
        </>
      )}
      {!isReadOnly && (
        <Dropzone multiple onProcessUpload={onProcessUpload} progressVariant="bar" />
      )}
      {!isReadOnly && isModalOpen && (
        <UploadConfirmModal
          open={isModalOpen}
          file={uploadArgs.fileData?.getAll('file')[0]}
          closeHandler={closeUploadModal}
          uploadHandler={confirmUpload}
        />
      )}
    </div>
  );
};

FileUpload.defaultProps = {
  isReadOnly: false,
  uploadedFiles: [],
  onFileUploaded: nullMethod,
  onDeletedFile: nullMethod,
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
