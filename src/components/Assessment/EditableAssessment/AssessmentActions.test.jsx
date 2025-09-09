import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { useExitWithoutSavingAction, useSubmitAssessmentAction } from 'hooks/actions';
import { IntlProvider } from '@edx/frontend-platform/i18n';
import userEvent from '@testing-library/user-event';
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
      isOpen: false,
      close: jest.fn(),
      title: 'mock exit title',
      description: 'mock exit description',
      action: {
        onClick: jest.fn().mockName('mock exit action'),
      },
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
      isOpen: false,
      close: jest.fn(),
      title: 'mock submit title',
      description: 'mock submit description',
      action: { onClick: jest.fn().mockName('mock submit action') },
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
  });

  it('renders both confirm dialogs when confirmProps is provided', () => {
    useExitWithoutSavingAction.mockReturnValueOnce({
      action: {
        onClick: jest.fn().mockName('useExitWithoutSavingAction.onClick'),
        children: 'Exit without saving',
      },
      confirmProps: {
        isOpen: true,
        close: jest.fn(),
        title: 'mock exit title',
        description: 'mock exit description',
        action: {
          onClick: jest.fn().mockName('mock exit action'),
        },
      },
    });

    useSubmitAssessmentAction.mockReturnValueOnce({
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
        action: { onClick: jest.fn().mockName('mock submit action') },
      },
    });

    render(<IntlProvider locale="en"><AssessmentActions /></IntlProvider>);

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
    const user = userEvent.setup();
    render(<IntlProvider locale="en"><AssessmentActions /></IntlProvider>);
    const submitAssessmentButton = screen.getByText('Submit assessment');
    await user.click(submitAssessmentButton);
    expect(mockSubmitAssessmentAction.action.onClick).toHaveBeenCalled();

    const exitWithoutSavingButton = screen.getByText('Exit without saving');
    await user.click(exitWithoutSavingButton);
    expect(mockExitWithoutSavingAction.action.onClick).toHaveBeenCalled();
  });
});
