import { screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { renderWithIntl } from 'testUtils';

import { useViewStep } from 'hooks/routing';
import { stepNames } from 'constants/index';
import messages from '../messages';
import BaseAssessmentView from './index';

/* eslint-disable react/prop-types */

const mockAssessmentData = {
  criteria: [
    {
      selectedOption: 0,
      feedback: 'Mock feedback 1',
    },
    {
      selectedOption: 1,
      feedback: 'Mock feedback 2',
    },
  ],
  overallFeedback: 'Overall, mock feedback!',
};

const mockGlobalState = {
  activeStepName: 'activeStepNameMock',
  activeStepState: 'activeStepStateMock',
  cancellationInfo: {
    hasCancelled: 'hasCancelledMock',
    cancelledBy: 'cancelledByMock',
    cancelledAt: 'cancelledAtMock',
  },
  effectiveGrade: {
    stepScore: {
      earned: 'earnedMock',
      possible: 'possibleMock',
    },
    assessments: [{}],
  },
  stepScore: {
    earned: 'earnedMock',
    possible: 'possibleMock',
  },
  assessment: { ...mockAssessmentData},
  hasReceivedFinalGrade: true,
  lastStep: 'lastStepMock',
  stepState: 'stepStateMock',
  stepIsUnavailable: false,
}

jest.unmock('@openedx/paragon');
jest.unmock('react');
jest.unmock('@edx/frontend-platform/i18n');

jest.mock('hooks/routing', () => ({
  useViewStep: jest.fn(),
}));

jest.mock('hooks/app', () => ({
  useIsPageDataLoading: () => true, // or false, depending on your test case
  useGlobalState: () => (mockGlobalState),
  useHasReceivedFinalGrade: () => true,
  useStepInfo: () => ({
    self: {
      numberOfAssessmentsCompleted: 1,
      isWaitingForSubmissions: false,
    },
    peer: {
      numberOfAssessmentsCompleted: 2,
      isWaitingForSubmissions: false,
    },
    studentTraining: {
      numberOfAssessmentsCompleted: 1,
      isWaitingForSubmissions: false,
    },
  }),
  useAssessmentStepConfig: () => ({
    settings: {
      self: { required: true },
      peer: { required: true, minNumberToGrade: 2 },
      studentTraining: { required: false, numberOfExamples: 1 },
    },
  }),
  useHasSubmitted: () => true, // or false, depending on your test case
  useStepState: () => null, // or a mock implementation
}));



const mockChildren = <div>Mocked Children</div>;


describe('<BaseAssessmentView />', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders with self assessment step', () => {
    useViewStep.mockReturnValue(stepNames.self);
    renderWithIntl(<BaseAssessmentView {...mockChildren} />, messages)
    screen.debug();

  });

  it('renders with peer assessment step', () => {
    useViewStep.mockReturnValue(stepNames.peer);
    renderWithIntl(
      <BaseAssessmentView>
        <div>Peer content</div>
      </BaseAssessmentView>,
    );

    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      'Grade your peers',
    );
    expect(
      screen.getByText('Step Progress Indicator: peer'),
    ).toBeInTheDocument();
    expect(screen.getByText('Peer content')).toBeInTheDocument();
  });

  it('renders with student training step', () => {
    useViewStep.mockReturnValue(stepNames.studentTraining);
    renderWithIntl(
      <BaseAssessmentView>
        <div>Training content</div>
      </BaseAssessmentView>,
    );

    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      'Practice grading',
    );
    expect(
      screen.getByText('Step Progress Indicator: studentTraining'),
    ).toBeInTheDocument();
    expect(screen.getByText('Training content')).toBeInTheDocument();
  });

  it('renders all required components', () => {
    useViewStep.mockReturnValue(stepNames.self);
    renderWithIntl(
      <BaseAssessmentView>
        <div>Child component</div>
      </BaseAssessmentView>,
    );

    expect(screen.getByText('Status Alert')).toBeInTheDocument();
    expect(screen.getByText('Instructions')).toBeInTheDocument();
    expect(screen.getByText('Modal Actions')).toBeInTheDocument();
    expect(screen.getByText('Assessment')).toBeInTheDocument();
    expect(
      screen.getByText('Step Progress Indicator: self'),
    ).toBeInTheDocument();
    expect(screen.getByText('Child component')).toBeInTheDocument();
  });
});
