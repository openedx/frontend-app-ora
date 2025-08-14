import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { IntlProvider } from '@edx/frontend-platform/i18n';
import userEvent from '@testing-library/user-event';

import { stepNames, stepStates } from 'constants/index';
import {
  useAssessmentStepConfig,
  useGlobalState,
  useStepInfo,
} from 'hooks/app';
import { useOpenModal } from 'hooks/modal';

import SubmissionActions from './index';

jest.unmock('@openedx/paragon');
jest.unmock('react');
jest.unmock('@edx/frontend-platform/i18n');

jest.mock('hooks/actions', () => ({
  useLoadNextAction: () => ({
    action: {
      labels: {
        default: 'Load Next Assessment',
      },
    },
  }),
}));

jest.mock('hooks/app', () => ({
  useAssessmentStepConfig: jest.fn(),
  useGlobalState: jest.fn(),
  useStepInfo: jest.fn(),
}));

jest.mock('hooks/modal', () => ({
  useOpenModal: jest.fn(),
}));

describe('<SubmissionActions />', () => {
  const renderWithIntl = (component) => render(<IntlProvider locale="en">{component}</IntlProvider>);

  const mockOpenModal = jest.fn();

  beforeEach(() => {
    useOpenModal.mockReturnValue(mockOpenModal);
    jest.clearAllMocks();
  });

  it('renders load next button for student training step', async () => {
    useGlobalState.mockReturnValue({
      activeStepName: stepNames.studentTraining,
      stepState: stepStates.notAvailable,
    });
    useStepInfo.mockReturnValue({
      [stepNames.studentTraining]: {
        numberOfAssessmentsCompleted: 1,
        isWaitingForSubmissions: false,
      },
    });
    useAssessmentStepConfig.mockReturnValue({
      settings: {
        [stepNames.studentTraining]: {
          minNumberToGrade: 1,
        },
      },
    });

    renderWithIntl(<SubmissionActions />);

    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent('Load Next Assessment');

    const user = userEvent.setup();
    await user.click(button);

    expect(mockOpenModal).toHaveBeenCalledWith({
      view: stepNames.studentTraining,
      title: stepNames.studentTraining,
    });
  });

  it('does not render button when step is staff', () => {
    useGlobalState.mockReturnValue({
      activeStepName: stepNames.staff,
      stepState: stepStates.notAvailable,
    });
    useStepInfo.mockReturnValue({});
    useAssessmentStepConfig.mockReturnValue({ settings: {} });

    renderWithIntl(<SubmissionActions />);

    expect(screen.queryByRole('button')).not.toBeInTheDocument();
  });

  it('renders button for in-progress step state', () => {
    useGlobalState.mockReturnValue({
      activeStepName: stepNames.studentTraining,
      stepState: stepStates.inProgress,
    });
    useStepInfo.mockReturnValue({
      [stepNames.studentTraining]: {
        numberOfAssessmentsCompleted: 1,
        isWaitingForSubmissions: false,
      },
    });
    useAssessmentStepConfig.mockReturnValue({
      settings: {
        [stepNames.studentTraining]: {
          minNumberToGrade: 1,
        },
      },
    });

    renderWithIntl(<SubmissionActions />);

    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
  });

  it('renders container with correct CSS classes', () => {
    useGlobalState.mockReturnValue({
      activeStepName: stepNames.staff,
      stepState: stepStates.notAvailable,
    });
    useStepInfo.mockReturnValue({});
    useAssessmentStepConfig.mockReturnValue({ settings: {} });

    const { container } = renderWithIntl(<SubmissionActions />);

    const containerDiv = container.querySelector('.text-center.py-2');
    expect(containerDiv).toBeInTheDocument();
  });

  it('renders optional message for peer assessment when minimum assessments completed', () => {
    useGlobalState.mockReturnValue({
      activeStepName: stepNames.peer,
      stepState: stepStates.notAvailable,
    });
    useStepInfo.mockReturnValue({
      [stepNames.peer]: {
        numberOfAssessmentsCompleted: 3,
        isWaitingForSubmissions: false,
      },
    });
    useAssessmentStepConfig.mockReturnValue({
      settings: {
        [stepNames.peer]: {
          minNumberToGrade: 3,
        },
      },
    });

    renderWithIntl(<SubmissionActions />);

    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent(/Load Next Assessment.*optional/i);
  });

  it('does not render button when waiting for submissions', () => {
    useGlobalState.mockReturnValue({
      activeStepName: stepNames.peer,
      stepState: stepStates.notAvailable,
    });
    useStepInfo.mockReturnValue({
      [stepNames.peer]: {
        numberOfAssessmentsCompleted: 1,
        isWaitingForSubmissions: true,
      },
    });
    useAssessmentStepConfig.mockReturnValue({
      settings: {
        [stepNames.peer]: {
          minNumberToGrade: 3,
        },
      },
    });

    renderWithIntl(<SubmissionActions />);

    expect(screen.queryByRole('button')).not.toBeInTheDocument();
  });

  it('renders button for done step state', () => {
    useGlobalState.mockReturnValue({
      activeStepName: stepNames.done,
      stepState: stepStates.notAvailable,
    });
    useStepInfo.mockReturnValue({
      [stepNames.done]: {
        numberOfAssessmentsCompleted: 0,
        isWaitingForSubmissions: false,
      },
    });
    useAssessmentStepConfig.mockReturnValue({
      settings: {
        [stepNames.done]: {},
      },
    });

    renderWithIntl(<SubmissionActions />);

    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
  });
});
