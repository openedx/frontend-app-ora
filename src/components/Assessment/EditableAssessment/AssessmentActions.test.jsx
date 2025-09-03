import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { useExitWithoutSavingAction, useSubmitAssessmentAction } from 'hooks/actions';
import AssessmentActions from './AssessmentActions';

jest.mock('hooks/actions', () => ({
  useExitWithoutSavingAction: jest.fn(),
  useSubmitAssessmentAction: jest.fn(),
}));

describe('AssessmentActions', () => {
  const mockClose = jest.fn().mockName('useExitWithoutSavingAction.closeConfirmProps');

  const mockExitWithoutSavingAction = {
    action: {
      onClick: jest.fn().mockName('useExitWithoutSavingAction.onClick'),
      children: 'Exit without saving',
    },
    confirmProps: {
      isOpen: true,
      close: mockClose,
      title: 'mock exit title',
      description: 'mock exit description',
      action: 'mock exit action',
    },
  };

  const mockSubmitAssessmentAction = {
    action: {
      onClick: jest.fn().mockName('useSubmitAssessmentAction.onClick'),
      children: 'Submit assessment',
      labels: {
        default: 'defaultLabel',
      },
    },
    confirmProps: {
      isOpen: true,
      close: () => jest.fn().mockName('useSubmitAssessmentAction.closeConfirmProps'),
      title: 'mock submit title',
      description: 'mock submit description',
      action: 'mock submit action',
    },
  };

  beforeEach(() => {
    jest.clearAllMocks();
    useExitWithoutSavingAction.mockReturnValue(mockExitWithoutSavingAction);
    useSubmitAssessmentAction.mockReturnValue(mockSubmitAssessmentAction);
  });

  it('renders both action buttons and confirm dialogs', () => {
    render(<AssessmentActions />);
    const exitWithoutSavingButton = screen.getByRole('button', { name: 'Exit without saving' });
    expect(exitWithoutSavingButton).toBeInTheDocument();

    const submitAssessmentButton = screen.getByRole('button', { name: 'Submit assessment' });
    expect(submitAssessmentButton).toBeInTheDocument();

    const confirmDialogExit = screen.getByTitle('mock exit title');
    expect(confirmDialogExit).toBeInTheDocument();

    const confirmDialogSubmit = screen.getByTitle('mock submit title');
    expect(confirmDialogSubmit).toBeInTheDocument();
  });

  it('renders without submit confirm dialog when confirmProps is null', () => {
    useSubmitAssessmentAction.mockReturnValueOnce({
      action: null,
      confirmProps: null,
    });
    render(<AssessmentActions />);
    expect(screen.queryByText(/Submit assessment/)).toBeNull();
  });

  it('calls the correct handlers when buttons are clicked', () => {
    render(<AssessmentActions />);

    const actionButtonExit = screen.getByRole('button', { name: 'Exit without saving' });
    fireEvent.click(actionButtonExit);
    expect(mockExitWithoutSavingAction.action.onClick).toHaveBeenCalled();

    const actionButtonSubmit = screen.getByRole('button', { name: 'Submit assessment' });
    fireEvent.click(actionButtonSubmit);
    expect(mockSubmitAssessmentAction.action.onClick).toHaveBeenCalled();
  });
});
