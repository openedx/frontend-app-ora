import { render } from '@testing-library/react';
import '@testing-library/jest-dom';

import {
  useGlobalState,
  useStepInfo,
  useAssessmentStepConfig,
} from 'hooks/app';
import { stepNames, stepStates } from 'constants/index';

import HotjarSurvey from './index';

jest.unmock('@openedx/paragon');
jest.unmock('react');
jest.unmock('@edx/frontend-platform/i18n');

jest.mock('hooks/app', () => ({
  useGlobalState: jest.fn(),
  useStepInfo: jest.fn(),
  useAssessmentStepConfig: jest.fn(),
}));

describe('<HotjarSurvey />', () => {
  beforeEach(() => {
    window.hj = jest.fn();
  });

  afterEach(() => {
    delete window.hj;
    jest.clearAllMocks();
  });

  it('renders survey container element', () => {
    useAssessmentStepConfig.mockReturnValue({
      settings: {
        self: { required: false },
        peer: { required: false },
      },
    });
    useGlobalState.mockReturnValue({
      activeStepState: stepStates.done,
    });
    useStepInfo.mockReturnValue({});

    const { container } = render(<HotjarSurvey />);
    const surveyElement = container.querySelector('#openassessment_hotjar');
    expect(surveyElement).toBeInTheDocument();
  });

  it('shows survey when self is required and step is done while peer is not required', () => {
    useAssessmentStepConfig.mockReturnValue({
      settings: {
        self: { required: true },
        peer: { required: false },
      },
    });
    useGlobalState.mockReturnValue({
      activeStepState: stepStates.done,
    });
    useStepInfo.mockReturnValue({});

    render(<HotjarSurvey />);

    expect(window.hj).toHaveBeenCalledWith(
      'event',
      'lms_openassessment_survey_mfe',
    );
  });

  it('does not show survey when self is required but step is not done', () => {
    useAssessmentStepConfig.mockReturnValue({
      settings: {
        self: { required: true },
        peer: { required: false },
      },
    });
    useGlobalState.mockReturnValue({
      activeStepState: stepStates.inProgress,
    });
    useStepInfo.mockReturnValue({});

    render(<HotjarSurvey />);

    expect(window.hj).not.toHaveBeenCalled();
  });

  it('shows survey when peer is required and completed the required peer grading', () => {
    useAssessmentStepConfig.mockReturnValue({
      settings: {
        self: { required: false },
        peer: { required: true, minNumberToGrade: 2 },
      },
    });
    useStepInfo.mockReturnValue({
      [stepNames.peer]: { numberOfAssessmentsCompleted: 2 },
    });
    useGlobalState.mockReturnValue({
      activeStepState: 'arbitrary',
    });

    render(<HotjarSurvey />);

    expect(window.hj).toHaveBeenCalledWith(
      'event',
      'lms_openassessment_survey_mfe',
    );
  });

  it('does not show survey when peer is required but not completed the peer grading', () => {
    useAssessmentStepConfig.mockReturnValue({
      settings: {
        self: { required: false },
        peer: { required: true, minNumberToGrade: 2 },
      },
    });
    useStepInfo.mockReturnValue({
      [stepNames.peer]: { numberOfAssessmentsCompleted: 1 },
    });
    useGlobalState.mockReturnValue({
      activeStepState: 'arbitrary',
    });

    render(<HotjarSurvey />);

    expect(window.hj).not.toHaveBeenCalled();
  });

  it('does not show survey when neither step is required', () => {
    useAssessmentStepConfig.mockReturnValue({
      settings: {
        [stepNames.self]: { required: false },
        [stepNames.peer]: { required: false },
      },
    });
    useGlobalState.mockReturnValue({
      activeStepState: 'arbitrary',
    });
    useStepInfo.mockReturnValue({});

    render(<HotjarSurvey />);

    expect(window.hj).not.toHaveBeenCalled();
  });

  it('does not show survey when window.hj is not available', () => {
    delete window.hj;

    useAssessmentStepConfig.mockReturnValue({
      settings: {
        self: { required: true },
        peer: { required: false },
      },
    });
    useGlobalState.mockReturnValue({
      activeStepState: stepStates.done,
    });
    useStepInfo.mockReturnValue({});

    // Should not throw error when window.hj is undefined
    expect(() => render(<HotjarSurvey />)).not.toThrow();
  });
});
