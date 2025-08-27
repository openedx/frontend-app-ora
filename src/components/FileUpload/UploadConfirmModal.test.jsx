import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import { IntlProvider } from '@edx/frontend-platform/i18n';

import { useUploadConfirmModalHooks } from './hooks';
import messages from './messages';
import UploadConfirmModal from './UploadConfirmModal';

jest.unmock('@openedx/paragon');
jest.unmock('react');
jest.unmock('@edx/frontend-platform/i18n');

jest.mock('./hooks', () => ({
  useUploadConfirmModalHooks: jest.fn(),
}));

const renderWithIntl = (ui) => {
  const testMessages = {
    'frontend-app-ora.FileCellContent.uploadFileModalTitle':
      messages.uploadFileModalTitle.defaultMessage,
    'frontend-app-ora.FileCellContent.uploadFileDescriptionFieldLabel':
      messages.uploadFileDescriptionFieldLabel.defaultMessage,
    'frontend-app-ora.FileCellContent.cancelUploadFileButton':
      messages.cancelUploadFileButton.defaultMessage,
    'frontend-app-ora.FileCellContent.confirmUploadFileButton':
      messages.confirmUploadFileButton.defaultMessage,
    'frontend-app-ora.FileCellContent.fileDescriptionMissingError':
      messages.fileDescriptionMissingError.defaultMessage,
  };

  return render(
    <IntlProvider locale="en" messages={testMessages}>
      {ui}
    </IntlProvider>,
  );
};

describe('<UploadConfirmModal />', () => {
  const mockExitHandler = jest.fn();
  const mockConfirmUploadClickHandler = jest.fn();
  const mockOnFileDescriptionChange = jest.fn();

  const props = {
    open: true,
    file: {
      name: 'file name',
    },
    closeHandler: jest.fn(),
    uploadHandler: jest.fn(),
  };

  const mockHooksReturn = {
    shouldShowError: false,
    exitHandler: mockExitHandler,
    confirmUploadClickHandler: mockConfirmUploadClickHandler,
    onFileDescriptionChange: mockOnFileDescriptionChange,
  };

  beforeEach(() => {
    jest.clearAllMocks();
    useUploadConfirmModalHooks.mockReturnValue(mockHooksReturn);
  });

  it('renders modal with file description form when file is provided', () => {
    renderWithIntl(<UploadConfirmModal {...props} />);

    expect(screen.getByRole('dialog')).toBeInTheDocument();
    expect(
      screen.getByText(/add a text description to your file/i),
    ).toBeInTheDocument();
    expect(
      screen.getByLabelText(/description for: file name/i),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /cancel upload/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /upload files/i }),
    ).toBeInTheDocument();
  });

  it('renders modal without file description form when no file is provided', () => {
    renderWithIntl(<UploadConfirmModal {...props} file={null} />);

    expect(screen.getByRole('dialog')).toBeInTheDocument();
    expect(
      screen.getByText(/add a text description to your file/i),
    ).toBeInTheDocument();
    expect(screen.queryByRole('textbox')).not.toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /cancel upload/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /upload files/i }),
    ).toBeInTheDocument();
  });

  it('calls exitHandler when cancel button is clicked', async () => {
    const user = userEvent.setup();
    renderWithIntl(<UploadConfirmModal {...props} />);

    const cancelButton = screen.getByRole('button', { name: /cancel upload/i });
    await user.click(cancelButton);

    expect(mockExitHandler).toHaveBeenCalled();
  });

  it('calls confirmUploadClickHandler when upload button is clicked', async () => {
    const user = userEvent.setup();
    renderWithIntl(<UploadConfirmModal {...props} />);

    const uploadButton = screen.getByRole('button', { name: /upload files/i });
    await user.click(uploadButton);

    expect(mockConfirmUploadClickHandler).toHaveBeenCalledTimes(1);
  });

  it('calls onFileDescriptionChange when input value changes', async () => {
    const user = userEvent.setup();
    renderWithIntl(<UploadConfirmModal {...props} />);

    const descriptionInput = screen.getByLabelText(
      /description for: file name/i,
    );
    await user.type(descriptionInput, 'test description');

    expect(mockOnFileDescriptionChange).toHaveBeenCalled();
  });

  it('shows error message when shouldShowError is true', () => {
    useUploadConfirmModalHooks.mockReturnValue({
      ...mockHooksReturn,
      shouldShowError: true,
    });

    renderWithIntl(<UploadConfirmModal {...props} />);

    expect(
      screen.getByText(/please enter a file description/i),
    ).toBeInTheDocument();
    const descriptionInput = screen.getByLabelText(
      /description for: file name/i,
    );
    expect(descriptionInput).toHaveClass('is-invalid');
  });

  it('does not render modal when open is false', () => {
    renderWithIntl(<UploadConfirmModal {...props} open={false} />);

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });
});
