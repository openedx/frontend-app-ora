import React from 'react';
import { shallow } from '@edx/react-unit-test-utils';

import { stepNames, stepStates } from 'constants/index';
import {
  useAssessmentStepConfig,
  useGlobalState,
  useStepInfo,
} from 'hooks/app';
import { useOpenModal } from 'hooks/modal';

import SubmissionActions from './index';

jest.mock('hooks/actions', () => ({
  useLoadNextAction: () => ({
    action: {
      labels: {
        default: 'default',
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
  const mockOpenModal = jest.fn();
  beforeEach(() => {
    useOpenModal.mockReturnValue(mockOpenModal);
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  [stepNames.studentTraining, stepNames.peer].forEach((stepName) => {
    it(`render load next when step ${stepName} is not waiting nor waiting for submission`, () => {
      useGlobalState.mockReturnValue({
        activeStepName: stepName,
        stepState: stepStates.notAvailable,
      });
      useStepInfo.mockReturnValue({
        [stepName]: {
          numberOfAssessmentsCompleted: 1,
          isWaitingForSubmissions: false,
        },
      });
      useAssessmentStepConfig.mockReturnValue({
        settings: {
          [stepName]: {
            minNumberToGrade: 1,
          },
        },
      });
      const wrapper = shallow(<SubmissionActions />);
      expect(wrapper.snapshot).toMatchSnapshot();

      expect(wrapper.instance.findByType('Button')).toHaveLength(1);

      React.useCallback.mock.calls[0][0]();
      expect(mockOpenModal).toHaveBeenCalledWith({ view: stepName, title: stepName });
    });
  });

  [stepStates.inProgress, stepNames.done].forEach((stepState) => {
    it(`render message step is not staff and step state ${stepState}`, () => {
      useGlobalState.mockReturnValue({
        activeStepName: stepNames.studentTraining,
        stepState,
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
      const wrapper = shallow(<SubmissionActions />);
      expect(wrapper.snapshot).toMatchSnapshot();

      expect(wrapper.instance.findByType('Button')).toHaveLength(1);
    });
  });

  it('does not render button when step is staff', () => {
    useGlobalState.mockReturnValue({
      activeStepName: stepNames.staff,
      stepState: stepStates.notAvailable,
    });

    const wrapper = shallow(<SubmissionActions />);
    expect(wrapper.snapshot).toMatchSnapshot();

    expect(wrapper.instance.findByType('Button')).toHaveLength(0);
  });
});
