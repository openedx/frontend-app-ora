import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { useExitWithoutSavingAction, useSubmitAssessmentAction } from 'hooks/actions';
import { IntlProvider } from '@edx/frontend-platform/i18n';
import AssessmentActions from './AssessmentActions';

jest.unmock('@openedx/paragon');
jest.unmock('react');
jest.unmock('@edx/frontend-platform/i18n');

jest.mock('hooks/actions', () => ({
  useExitWithoutSavingAction: jest.fn(),
  useSubmitAssessmentAction: jest.fn(),
}));

describe('AssessmentActions', () => {
  const mockExitWithoutSavingAction = {
    action: {
      onClick: jest.fn().mockName('useExitWithoutSavingAction.onClick'),
      children: 'Exit without saving',
    },
    confirmProps: {
      isOpen: true,
      close: jest.fn(),
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
      close: jest.fn(),
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
    render(<IntlProvider locale="en"><AssessmentActions /></IntlProvider>);
    const exitWithoutSavingButton = screen.getByText('Exit without saving');
    expect(exitWithoutSavingButton).toBeInTheDocument();

    const submitAssessmentButton = screen.getByText('Submit assessment');
    expect(submitAssessmentButton).toBeInTheDocument();

    const confirmDialogExit = screen.getByLabelText('mock exit title');
    expect(confirmDialogExit).toBeInTheDocument();

    const confirmDialogSubmit = screen.getByLabelText('mock submit title');
    expect(confirmDialogSubmit).toBeInTheDocument();
  });

  it('renders without submit confirm dialog when confirmProps is null', () => {
    useSubmitAssessmentAction.mockReturnValueOnce({
      action: null,
      confirmProps: null,
    });
    render(<IntlProvider locale="en"><AssessmentActions /></IntlProvider>);
    expect(screen.queryByText(/Submit assessment/)).toBeNull();
  });

  it('calls the correct handlers when buttons are clicked', async () => {
    render(<IntlProvider locale="en"><AssessmentActions /></IntlProvider>);
    const submitAssessmentButton = screen.getByText('Submit assessment');
    fireEvent.click(submitAssessmentButton);
    expect(mockSubmitAssessmentAction.action.onClick).toHaveBeenCalled();

    const exitWithoutSavingButton = screen.getByText('Exit without saving');
    fireEvent.click(exitWithoutSavingButton);
    expect(mockExitWithoutSavingAction.action.onClick).toHaveBeenCalled();
  });
});
