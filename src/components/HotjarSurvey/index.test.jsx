import React from 'react';
// import {cleanup, fireEvent, render} from '@testing-library/react';
import { shallow } from '@edx/react-unit-test-utils';

import {
  useGlobalState,
  useStepInfo,
  useAssessmentStepConfig,
} from 'hooks/app';
import { stepNames, stepStates } from 'constants/index';

import HotjarSurvey from './index';

jest.mock('hooks/app', () => ({
  useGlobalState: jest.fn(),
  useStepInfo: jest.fn(),
  useAssessmentStepConfig: jest.fn(),
}));

describe('<HotjarSurvey />', () => {
  // * These tests opts to use shallow instead of render because I want to trigger the useEffect
  // * manually.
  beforeEach(() => {
    window.hj = jest.fn();
  });
  afterEach(() => {
    delete window.hj;
    jest.clearAllMocks();
  });

  it('show survey when self is require and step is not while peer is not require', () => {
    useAssessmentStepConfig.mockReturnValueOnce({
      settings: {
        self: { required: true },
        peer: { required: false },
      },
    });
    useGlobalState.mockReturnValueOnce({
      activeStepState: stepStates.done,
    });

    expect(React.useEffect).not.toHaveBeenCalled();
    shallow(<HotjarSurvey />);

    const [[cb, [isShowSurvey]]] = React.useEffect.mock.calls;
    expect(isShowSurvey).toBe(true);
    cb();
    expect(window.hj).toHaveBeenCalledWith(
      'event',
      'lms_openassessment_survey_mfe',
    );
  });

  it('show survey when peer is require iif completed the peer grading', () => {
    useAssessmentStepConfig.mockReturnValueOnce({
      settings: {
        self: { required: false },
        peer: { required: true, minNumberToGrade: 2 },
      },
    });
    useStepInfo.mockReturnValueOnce({
      [stepNames.peer]: { numberOfAssessmentsCompleted: 2 },
    });
    useGlobalState.mockReturnValueOnce({
      activeStepState: 'abitrairy',
    });

    expect(React.useEffect).not.toHaveBeenCalled();
    shallow(<HotjarSurvey />);

    const [[, [isShowSurvey]]] = React.useEffect.mock.calls;
    expect(isShowSurvey).toBe(true);
  });

  it('should not show survey when peer is require but not completed the peer grading', () => {
    useAssessmentStepConfig.mockReturnValueOnce({
      settings: {
        self: { required: false },
        peer: { required: true, minNumberToGrade: 2 },
      },
    });
    useStepInfo.mockReturnValueOnce({
      [stepNames.peer]: { numberOfAssessmentsCompleted: 1 },
    });
    useGlobalState.mockReturnValueOnce({
      activeStepState: 'abitrairy',
    });

    expect(React.useEffect).not.toHaveBeenCalled();
    shallow(<HotjarSurvey />);

    const [[, [isShowSurvey]]] = React.useEffect.mock.calls;
    expect(isShowSurvey).toBe(false);
  });

  it('should not show survey neither step is required', () => {
    useAssessmentStepConfig.mockReturnValueOnce({
      settings: {
        [stepNames.self]: { required: false },
        [stepNames.peer]: { required: false },
      },
    });
    useGlobalState.mockReturnValueOnce({
      activeStepState: 'abitrairy',
    });

    expect(React.useEffect).not.toHaveBeenCalled();

    shallow(<HotjarSurvey />);
    const [[, [isShowSurvey]]] = React.useEffect.mock.calls;
    expect(isShowSurvey).toBe(false);
  });
});
