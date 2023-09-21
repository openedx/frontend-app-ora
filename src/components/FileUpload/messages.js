import { defineMessages } from '@edx/frontend-platform/i18n';

const messages = defineMessages({
  fileNameTitle: {
    id: 'ora-grading.FileContent.fileNameTitle',
    defaultMessage: 'File Name',
    description: ' title for file name',
  },
  fileDescriptionTitle: {
    id: 'ora-grading.FileCellContent.fileDescriptionTitle',
    defaultMessage: 'File Description',
    description: ' title for file description',
  },
  fileSizeTitle: {
    id: 'ora-grading.FileCellContent.fileSizeTitle',
    defaultMessage: 'File Size',
    description: ' title for file size',
  },
  fileActionsTitle: {
    id: 'ora-grading.FileCellContent.fileActionsTitle',
    defaultMessage: 'Actions',
    description: ' title for file actions',
  },
  deleteButtonAltText: {
    id: 'ora-grading.FileCellContent.deleteButtonAltText',
    defaultMessage: 'Delete',
    description: ' alt text for delete button',
  },
  previewButtonAltText: {
    id: 'ora-grading.FileCellContent.previewButtonAltText',
    defaultMessage: 'Preview',
    description: ' alt text for preview button',
  },
  uploadFileModalTitle: {
    id: 'ora-grading.FileCellContent.uploadFileModalTitle',
    defaultMessage: 'Add a text description to your file',
    description: 'Ask user to add a text description to the file',
  },
  uploadFileDescriptionFieldLabel: {
    id: 'ora-grading.FileCellContent.uploadFileDescriptionFieldLabel',
    defaultMessage: 'Description for: ',
    description: 'Label for file description field',
  },
  cancelUploadFileButton: {
    id: 'ora-grading.FileCellContent.cancelUploadFileButton',
    defaultMessage: 'Cancel upload',
    description: 'Label for cancel button',
  },
  confirmUploadFileButton: {
    id: 'ora-grading.FileCellContent.confirmUploadFileButton',
    defaultMessage: 'Upload files',
    description: 'Label for upload button',
  },
  fileDescriptionMissingError: {
    id: 'ora-grading.FileCellContent.fileDescriptionMissingError',
    defaultMessage: 'Please enter a file description',
    description: 'Error message when file description is missing',
  },
});

export default messages;
