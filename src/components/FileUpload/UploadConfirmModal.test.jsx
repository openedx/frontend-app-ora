import { screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import { renderWithIntl } from 'testUtils';
import { useUploadConfirmModalHooks } from './hooks';
import messages from './messages';
import UploadConfirmModal from './UploadConfirmModal';

jest.mock('./hooks', () => ({
  useUploadConfirmModalHooks: jest.fn(),
}));

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
    renderWithIntl(<UploadConfirmModal {...props} />, messages);

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
    renderWithIntl(<UploadConfirmModal {...props} file={null} />, messages);

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
    renderWithIntl(<UploadConfirmModal {...props} />, messages);

    const cancelButton = screen.getByRole('button', { name: /cancel upload/i });
    await user.click(cancelButton);

    expect(mockExitHandler).toHaveBeenCalled();
  });

  it('calls confirmUploadClickHandler when upload button is clicked', async () => {
    const user = userEvent.setup();
    renderWithIntl(<UploadConfirmModal {...props} />, messages);

    const uploadButton = screen.getByRole('button', { name: /upload files/i });
    await user.click(uploadButton);

    expect(mockConfirmUploadClickHandler).toHaveBeenCalledTimes(1);
  });

  it('calls onFileDescriptionChange when input value changes', async () => {
    const user = userEvent.setup();
    renderWithIntl(<UploadConfirmModal {...props} />, messages);

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

    renderWithIntl(<UploadConfirmModal {...props} />, messages);

    expect(
      screen.getByText(/please enter a file description/i),
    ).toBeInTheDocument();
    const descriptionInput = screen.getByLabelText(
      /description for: file name/i,
    );
    expect(descriptionInput).toHaveClass('is-invalid');
  });

  it('does not render modal when open is false', () => {
    renderWithIntl(<UploadConfirmModal {...props} open={false} />, messages);

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });
});
