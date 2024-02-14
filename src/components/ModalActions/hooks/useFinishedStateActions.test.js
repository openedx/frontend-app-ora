import { useGlobalState, useTrainingStepIsCompleted } from 'hooks/app';
import {
  useHasSubmitted,
  useSubmittedAssessment,
} from 'hooks/assessment';
import { useViewStep } from 'hooks/routing';
import {
  useStartStepAction,
  useLoadNextAction,
  useCloseModalAction,
} from 'hooks/actions';
import { stepNames, stepStates } from 'constants/index';

import useFinishedStateActions from './useFinishedStateActions';

jest.mock('hooks/app', () => ({
  useGlobalState: jest.fn(),
  useTrainingStepIsCompleted: jest.fn(),
}));
jest.mock('hooks/assessment', () => ({
  useHasSubmitted: jest.fn(),
  useSubmittedAssessment: jest.fn(),
}));
jest.mock('hooks/routing', () => ({
  useViewStep: jest.fn(),
}));
jest.mock('hooks/actions', () => ({
  useStartStepAction: jest.fn(),
  useLoadNextAction: jest.fn(),
  useCloseModalAction: jest.fn(),
}));

describe('useFinishedStateActions', () => {
  const mockStartStepAction = jest.fn();
  const mockLoadNextAction = jest.fn();
  const mockCloseModalAction = jest.fn();

  useGlobalState.mockReturnValue({});
  useTrainingStepIsCompleted.mockReturnValue(false);
  useHasSubmitted.mockReturnValue(false);
  useSubmittedAssessment.mockReturnValue(false);
  useViewStep.mockReturnValue('abitrarilyViewStepName');

  useStartStepAction.mockReturnValue(mockStartStepAction);
  useLoadNextAction.mockReturnValue(mockLoadNextAction);
  useCloseModalAction.mockReturnValue(mockCloseModalAction);

  describe('when has submitted', () => {
    it('return null when has not submitted', () => {
      expect(useFinishedStateActions()).toBe(null);
    });

    it('return null when has not submitted and is in training but not completed', () => {
      useViewStep.mockReturnValue(stepNames.studentTraining);
      expect(useFinishedStateActions()).toBe(null);
    });

    it('return start action as primary when has submitted and is in done step', () => {
      useHasSubmitted.mockReturnValue(true);
      useSubmittedAssessment.mockReturnValue(true);
      useGlobalState.mockReturnValue({ activeStepName: stepNames.done });

      expect(useFinishedStateActions()).toEqual({ primary: mockStartStepAction });
    });
  });

  describe('when assessment submitted', () => {
    useHasSubmitted.mockReturnValue(true);
    useSubmittedAssessment.mockReturnValue(true);

    it('return start action as primary when step is done', () => {
      useGlobalState.mockReturnValue({ activeStepName: stepNames.done });

      expect(useFinishedStateActions()).toEqual({ primary: mockStartStepAction });
    });

    it('return exit action as primary action when step is staff', () => {
      useGlobalState.mockReturnValue({ activeStepName: stepNames.staff });

      expect(useFinishedStateActions()).toEqual({ primary: mockCloseModalAction });
    });

    it('return start and exit actions when view step is submission', () => {
      useGlobalState.mockReturnValue({ activeStepName: stepNames.submission });
      useViewStep.mockReturnValue(stepNames.submission);

      expect(useFinishedStateActions()).toEqual({ primary: mockStartStepAction, secondary: mockCloseModalAction });
    });

    it('return start and exit actions when view step is self', () => {
      useGlobalState.mockReturnValue({ activeStepName: stepNames.self });
      useViewStep.mockReturnValue(stepNames.submission);

      expect(useFinishedStateActions()).toEqual({ primary: mockStartStepAction, secondary: mockCloseModalAction });
    });

    it('return null when step is not active and step state is not in progress', () => {
      useGlobalState.mockReturnValue({ activeStepName: 'abitrarilyActiveStepName', activeStepState: stepStates.done });
      useViewStep.mockReturnValue('abitrarilyViewStepName');

      expect(useFinishedStateActions()).toBe(null);
    });

    it('return start and exit actions when step is not active and step state is in progress', () => {
      useGlobalState.mockReturnValue({ activeStepName: 'abitrarilyActiveStepName', activeStepState: stepStates.inProgress });
      useViewStep.mockReturnValue('abitrarilyViewStepName');

      expect(useFinishedStateActions()).toEqual({ primary: mockStartStepAction, secondary: mockCloseModalAction });
    });

    it('return load next and exit actions when step is active and step state is in progress', () => {
      useGlobalState.mockReturnValue({ activeStepName: 'active', activeStepState: stepStates.inProgress });
      useViewStep.mockReturnValue('active');

      expect(useFinishedStateActions()).toEqual({ primary: mockLoadNextAction, secondary: mockCloseModalAction });
    });

    it('return exit action when all steps are finished', () => {
      useGlobalState.mockReturnValue({ activeStepName: 'active' });
      useViewStep.mockReturnValue('active');

      expect(useFinishedStateActions()).toEqual({ primary: mockCloseModalAction });
    });
  });

  it('return start and exit actions when submission is finished', () => {
    useHasSubmitted.mockReturnValue(true);
    useSubmittedAssessment.mockReturnValue(false);

    expect(useFinishedStateActions()).toEqual({ primary: mockStartStepAction, secondary: mockCloseModalAction });
  });
});
