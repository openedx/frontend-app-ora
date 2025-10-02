import { screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import { renderWithIntl } from 'testUtils';

import { useDeleteFileAction } from 'hooks/actions';

import ActionCell from './ActionCell';

/* eslint-disable react/prop-types */

jest.mock('hooks/actions', () => ({
  useDeleteFileAction: jest.fn(),
}));

describe('<ActionCell />', () => {
  const mockOnClick = jest.fn();
  const props = {
    onDeletedFile: jest.fn(),
    disabled: false,
    row: {
      original: {
        fileIndex: 1,
      },
    },
  };

  const deleteFileAction = {
    action: {
      onClick: mockOnClick,
    },
    confirmProps: {
      title: 'Delete File',
      description: 'Are you sure you want to delete this file?',
      onConfirm: jest.fn(),
      isOpen: false,
    },
  };

  beforeEach(() => {
    jest.clearAllMocks();
    useDeleteFileAction.mockReturnValue(deleteFileAction);
  });

  it('renders nothing when disabled', () => {
    const { container } = renderWithIntl(<ActionCell {...props} disabled />);
    expect(container.firstChild).toBeNull();
  });

  it('renders delete button when enabled', () => {
    renderWithIntl(<ActionCell {...props} />);

    const deleteButton = screen.getByRole('button', { name: /delete/i });
    expect(deleteButton).toBeInTheDocument();
    expect(deleteButton).not.toBeDisabled();
  });

  it('calls onClick when delete button is clicked', async () => {
    const user = userEvent.setup();
    renderWithIntl(<ActionCell {...props} />);

    const deleteButton = screen.getByRole('button', { name: /delete/i });
    await user.click(deleteButton);

    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });

  it('calls useDeleteFileAction with correct parameters', () => {
    renderWithIntl(<ActionCell {...props} />);

    expect(useDeleteFileAction).toHaveBeenCalledWith({
      fileIndex: 1,
      onDeletedFile: props.onDeletedFile,
    });
  });
});
