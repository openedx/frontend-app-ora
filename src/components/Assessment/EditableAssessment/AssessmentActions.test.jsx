import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import AssessmentActions from './AssessmentActions';
import { useExitWithoutSavingAction, useSubmitAssessmentAction } from 'hooks/actions';

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
      onClick: jest.fn().mockName('useExitWithoutSavingAction.onClick'),
      title: 'Exit without saving',
    },
  };

  const mockSubmitAssessmentAction = {
    action: {
      onClick: jest.fn().mockName('useSubmitAssessmentAction.onClick'),
      children: 'Submit assessment',
    },
    confirmProps: {
      onClick: jest.fn().mockName('useSubmitAssessmentAction.onClick'),
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
    let exitWithoutSavingButton = screen.getByRole('button', { name: 'Exit without saving' });
    expect(exitWithoutSavingButton).toBeInTheDocument();

    let submitAssessmentButton = screen.getByRole('button', { name: 'Submit assessment' });
    expect(submitAssessmentButton).toBeInTheDocument();
    
  });

  it('renders without submit confirm dialog when confirmProps is null', () => {
    useSubmitAssessmentAction.mockReturnValueOnce({
      action: null,
      confirmProps: null,
    });
    render(<AssessmentActions />);

    expect(screen.queryByText(/Submit assessment/)).toBeNull();
  
  });

  it('calls the correct handlers when buttons and dialogs are clicked', () => {
    render(<AssessmentActions />);
    screen.debug();

    let exitButton = screen.getByRole('button', { name: 'Exit without saving' });
    fireEvent.click(exitButton);
    expect(mockExitWithoutSavingAction.action.onClick).toHaveBeenCalled();

    let submitAssessmentButton = screen.getByRole('button', { name: 'Submit assessment' });
    fireEvent.click(submitAssessmentButton);
    expect(mockSubmitAssessmentAction.action.onClick).toHaveBeenCalled();

    // screen.debug();

    let alertModal = screen.getByTitle("Exit without saving");
    fireEvent.click(alertModal);
    
    // expect(mockExitWithoutSavingAction.confirmProps.onClick).toHaveBeenCalled();

  //   const submitDialog = screen.getByLabelText(
  //     'Confirm Dialog Submit assessment',
  //   );
  //   fireEvent.click(submitDialog);
  //   expect(
  //     mockSubmitAssessmentAction.confirmProps.onConfirm,
  //   ).toHaveBeenCalled();
  });
});
