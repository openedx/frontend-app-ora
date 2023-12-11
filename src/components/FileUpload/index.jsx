import React from 'react';
import PropTypes from 'prop-types';
import filesize from 'filesize';

import { DataTable, Dropzone } from '@edx/paragon';
import { useIntl } from '@edx/frontend-platform/i18n';

import { nullMethod } from 'utils';
import { useActiveStepName, useFileUploadConfig } from 'hooks/app';
import { useViewStep } from 'hooks/routing';
import FilePreview from 'components/FilePreview';
import { stepNames } from 'constants';

import UploadConfirmModal from './UploadConfirmModal';
import ActionCell from './ActionCell';
import { useFileUploadHooks } from './hooks';
import FileDownload from './FileDownload';
import messages from './messages';

import './styles.scss';

export const createFileActionCell =
  ({ onDeletedFile, isReadOnly }) =>
  (props) =>
    (
      <ActionCell
        {...props}
        onDeletedFile={onDeletedFile}
        disabled={isReadOnly}
      />
    );

const FileUpload = ({
  isReadOnly,
  uploadedFiles,
  onFileUploaded,
  onDeletedFile,
  defaultCollapsePreview,
}) => {
  const { formatMessage } = useIntl();
  const {
    confirmUpload,
    closeUploadModal,
    isModalOpen,
    onProcessUpload,
    uploadArgs,
  } = useFileUploadHooks({ onFileUploaded });
  const viewStep = useViewStep();
  const activeStepName = useActiveStepName();
  const { enabled, fileUploadLimit, allowedExtensions, maxFileSize } =
    useFileUploadConfig() || {};

  if (!enabled || viewStep === stepNames.studentTraining) {
    return null;
  }

  const columns = [
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
  ];
  if (activeStepName === stepNames.submission) {
    columns.push({
      Header: formatMessage(messages.fileActionsTitle),
      accessor: 'actions',
      Cell: createFileActionCell({ onDeletedFile, isReadOnly }),
    });
  }

  return (
    <div>
      <h3>{formatMessage(messages.fileUploadTitle)}</h3>
      {uploadedFiles.length > 0 && isReadOnly && (
        <FilePreview defaultCollapsePreview={defaultCollapsePreview} />
      )}
      <b>{formatMessage(messages.uploadedFilesTitle)}</b>
      <DataTable
        itemCount={uploadedFiles.length}
        data={uploadedFiles.map((file) => ({
          ...file,
          size: typeof file.size === 'number' ? filesize(file.size) : 'Unknown',
        }))}
        tableActions={[<FileDownload files={uploadedFiles} />]}
        columns={columns}
      />
      {!isReadOnly && fileUploadLimit > uploadedFiles.length && (
        <Dropzone
          multiple
          onProcessUpload={onProcessUpload}
          progressVariant='bar'
          accept={{
            '*': (allowedExtensions || []).map((ext) => `.${ext}`),
          }}
          maxSize={maxFileSize}
        />
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
  defaultCollapsePreview: false,
};
FileUpload.propTypes = {
  isReadOnly: PropTypes.bool,
  uploadedFiles: PropTypes.arrayOf(
    PropTypes.shape({
      fileDescription: PropTypes.string,
      fileName: PropTypes.string,
      fileSize: PropTypes.number,
    })
  ),
  onFileUploaded: PropTypes.func,
  onDeletedFile: PropTypes.func,
  defaultCollapsePreview: PropTypes.bool,
};

export default FileUpload;
