import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';

import {
  useExitWithoutSavingAction,
  useSubmitAssessmentAction,
} from 'hooks/actions';
import AssessmentActions from './AssessmentActions';

/* eslint-disable react/prop-types */

jest.unmock('@openedx/paragon');
jest.unmock('react');
jest.unmock('@edx/frontend-platform/i18n');

jest.mock('hooks/actions', () => ({
  useExitWithoutSavingAction: jest.fn(),
  useSubmitAssessmentAction: jest.fn(),
}));

jest.mock(
  'components/ActionButton',
  () => ({
    children, variant, onClick, ...props
  }) => (
    <button
      type="button"
      data-testid={`action-button-${variant}`}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  ),
);

jest.mock(
  'components/ConfirmDialog',
  () => ({ title, onConfirm, ...props }) => (
    <button
      type="button"
      data-testid={`confirm-dialog-${title}`}
      onClick={onConfirm}
      onKeyDown={(e) => e.key === 'Enter' && onConfirm()}
      {...props}
    />
  ),
);

describe('AssessmentActions', () => {
  const mockExitWithoutSavingAction = {
    action: {
      onClick: jest.fn().mockName('useExitWithoutSavingAction.onClick'),
      children: 'Exit without saving',
    },
    confirmProps: {
      onConfirm: jest.fn().mockName('useExitWithoutSavingAction.onConfirm'),
      title: 'Exit without saving',
    },
  };
  const mockSubmitAssessmentAction = {
    action: {
      onClick: jest.fn().mockName('useSubmitAssessmentAction.onClick'),
      children: 'Submit assessment',
    },
    confirmProps: {
      onConfirm: jest.fn().mockName('useSubmitAssessmentAction.onConfirm'),
      title: 'Submit assessment',
    },
  };

  beforeEach(() => {
    jest.clearAllMocks();
    useExitWithoutSavingAction.mockReturnValue(mockExitWithoutSavingAction);
    useSubmitAssessmentAction.mockReturnValue(mockSubmitAssessmentAction);
  });

  it('renders both action buttons and confirm dialogs', () => {
    render(<AssessmentActions />);

    expect(
      screen.getByTestId('action-button-outline-primary'),
    ).toBeInTheDocument();
    expect(screen.getByTestId('action-button-primary')).toBeInTheDocument();
    expect(
      screen.getByTestId('confirm-dialog-Exit without saving'),
    ).toBeInTheDocument();
    expect(
      screen.getByTestId('confirm-dialog-Submit assessment'),
    ).toBeInTheDocument();
  });

  it('renders without submit confirm dialog when confirmProps is null', () => {
    useSubmitAssessmentAction.mockReturnValueOnce({
      action: mockSubmitAssessmentAction.action,
      confirmProps: null,
    });
    render(<AssessmentActions />);

    expect(
      screen.getByTestId('action-button-outline-primary'),
    ).toBeInTheDocument();
    expect(screen.getByTestId('action-button-primary')).toBeInTheDocument();
    expect(
      screen.getByTestId('confirm-dialog-Exit without saving'),
    ).toBeInTheDocument();
    expect(
      screen.queryByTestId('confirm-dialog-Submit assessment'),
    ).not.toBeInTheDocument();
  });

  it('calls the correct handlers when buttons and dialogs are clicked', () => {
    render(<AssessmentActions />);

    const exitButton = screen.getByTestId('action-button-outline-primary');
    expect(exitButton).toHaveTextContent('Exit without saving');
    fireEvent.click(exitButton);
    expect(mockExitWithoutSavingAction.action.onClick).toHaveBeenCalled();

    const submitButton = screen.getByTestId('action-button-primary');
    expect(submitButton).toHaveTextContent('Submit assessment');
    fireEvent.click(submitButton);
    expect(mockSubmitAssessmentAction.action.onClick).toHaveBeenCalled();

    const exitDialog = screen.getByTestId('confirm-dialog-Exit without saving');
    fireEvent.click(exitDialog);
    expect(
      mockExitWithoutSavingAction.confirmProps.onConfirm,
    ).toHaveBeenCalled();

    const submitDialog = screen.getByTestId('confirm-dialog-Submit assessment');
    fireEvent.click(submitDialog);
    expect(
      mockSubmitAssessmentAction.confirmProps.onConfirm,
    ).toHaveBeenCalled();
  });
});
