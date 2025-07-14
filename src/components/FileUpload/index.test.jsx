import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { IntlProvider } from '@edx/frontend-platform/i18n';
import { MemoryRouter } from 'react-router-dom';

import { useFileUploadConfig, useActiveStepName } from 'hooks/app';
import { useViewStep } from 'hooks/routing';
import { useFileUploadHooks } from './hooks';
import FileUpload from './index';
import messages from './messages';

jest.unmock('@openedx/paragon');
jest.unmock('react');
jest.unmock('@edx/frontend-platform/i18n');

jest.mock('hooks/app', () => ({
  useFileUploadConfig: jest.fn(),
  useActiveStepName: jest.fn(),
}));

jest.mock('hooks/routing', () => ({
  useViewStep: jest.fn(),
}));

jest.mock('./hooks', () => ({
  useFileUploadHooks: jest.fn(),
}));

jest.mock('./UploadConfirmModal', () => () => <div>Upload Confirm Modal</div>);
jest.mock('./ActionCell', () => () => <div>Action Cell</div>);
jest.mock('./FileDownload', () => () => <div>File Download</div>);
jest.mock('components/FilePreview', () => () => <div>File Preview</div>);

const renderComponent = (props = {}) => render(
  <MemoryRouter>
    <IntlProvider messages={messages} locale="en">
      <FileUpload {...props} />
    </IntlProvider>
  </MemoryRouter>,
);

describe('FileUpload', () => {
  const defaultProps = {
    isReadOnly: false,
    uploadedFiles: [],
    onFileUploaded: jest.fn(),
    onDeletedFile: jest.fn(),
    defaultCollapsePreview: false,
    hideHeader: false,
    isInValid: false,
  };

  beforeEach(() => {
    jest.clearAllMocks();
    useActiveStepName.mockReturnValue('submission');
    useViewStep.mockReturnValue('submission');
    useFileUploadHooks.mockReturnValue({
      confirmUpload: jest.fn(),
      closeUploadModal: jest.fn(),
      isModalOpen: false,
      onProcessUpload: jest.fn(),
      uploadArgs: {},
    });
  });

  it('renders empty state when no files are uploaded', () => {
    useFileUploadConfig.mockReturnValue({
      enabled: true,
      fileUploadLimit: 3,
      allowedExtensions: ['pdf', 'txt'],
      maxFileSize: 10,
    });

    renderComponent(defaultProps);

    expect(screen.getByText('File upload')).toBeInTheDocument();
    expect(screen.getByText('Uploaded files')).toBeInTheDocument();
    expect(screen.getByText('File name')).toBeInTheDocument();
    expect(screen.getByText('File description')).toBeInTheDocument();
    expect(screen.getByText('File size')).toBeInTheDocument();
    expect(screen.getByText('Actions')).toBeInTheDocument();
  });

  it('renders file table when files are uploaded', () => {
    useFileUploadConfig.mockReturnValue({
      enabled: true,
      fileUploadLimit: 3,
      allowedExtensions: ['pdf', 'txt'],
      maxFileSize: 10,
    });

    const props = {
      ...defaultProps,
      uploadedFiles: [
        {
          fileName: 'test.pdf',
          fileDescription: 'Test file',
          fileSize: 1024,
        },
      ],
    };

    renderComponent(props);

    expect(screen.getByText('test.pdf')).toBeInTheDocument();
    expect(screen.getByText('Test file')).toBeInTheDocument();
  });

  it('shows required validation message when isInValid is true', () => {
    useFileUploadConfig.mockReturnValue({
      enabled: true,
      fileUploadLimit: 3,
      allowedExtensions: ['pdf', 'txt'],
      maxFileSize: 10,
    });

    const props = {
      ...defaultProps,
      isInValid: true,
    };

    renderComponent(props);

    expect(screen.getByText('File Upload is required')).toBeInTheDocument();
  });
});
