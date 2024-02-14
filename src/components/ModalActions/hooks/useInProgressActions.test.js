import { useGlobalState, useStepInfo } from 'hooks/app';
import { useHasSubmitted } from 'hooks/assessment';
import { useViewStep } from 'hooks/routing';
import { stepNames, stepStates } from 'constants/index';

import {
  useCloseModalAction,
  useLoadNextAction,
  useStartStepAction,
  useSubmitResponseAction,
} from 'hooks/actions';

import useInProgressActions from './useInProgressActions';

jest.mock('hooks/app', () => ({
  useGlobalState: jest.fn(),
  useStepInfo: jest.fn(),
}));
jest.mock('hooks/assessment', () => ({
  useHasSubmitted: jest.fn(),
}));
jest.mock('hooks/routing', () => ({
  useViewStep: jest.fn(),
}));
jest.mock('hooks/actions', () => ({
  useCloseModalAction: jest.fn(),
  useLoadNextAction: jest.fn(),
  useStartStepAction: jest.fn(),
  useSubmitResponseAction: jest.fn(),
}));

describe('useInProgressActions', () => {
  const mockCloseModalAction = jest.fn().mockName('closeModalAction');
  const mockLoadNextAction = jest.fn().mockName('loadNextAction');
  const mockStartStepAction = jest.fn().mockName('startStepAction');
  const mockSubmitResponseAction = jest.fn().mockName('submitResponseAction');
  useCloseModalAction.mockReturnValue(mockCloseModalAction);
  useLoadNextAction.mockReturnValue(mockLoadNextAction);
  useStartStepAction.mockReturnValue(mockStartStepAction);
  useSubmitResponseAction.mockReturnValue(mockSubmitResponseAction);

  useGlobalState.mockReturnValue({});
  useStepInfo.mockReturnValue({});
  useHasSubmitted.mockReturnValue(false);
  useViewStep.mockReturnValue(stepNames.submission);

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('return startStepAction and exitAction when hasReceivedFinalGrade is true', () => {
    useGlobalState.mockReturnValueOnce({ hasReceivedFinalGrade: true });
    const result = useInProgressActions({ options: {} });
    expect(result).toEqual({
      primary: mockStartStepAction,
      secondary: mockCloseModalAction,
    });
  });

  it('return null when hasSubmitted is true', () => {
    useGlobalState.mockReturnValueOnce({ hasReceivedFinalGrade: false });
    useHasSubmitted.mockReturnValueOnce(true);
    const result = useInProgressActions({ options: {} });
    expect(result).toBeNull();
  });

  it('return null when activeStepState is not inProgress', () => {
    useGlobalState.mockReturnValueOnce({
      hasReceivedFinalGrade: false,
      activeStepState: stepStates.done,
    });
    const result = useInProgressActions({ options: {} });
    expect(result).toBeNull();
  });

  it('return null if globalState.stepState is inProgress and step is not submission', () => {
    useGlobalState.mockReturnValueOnce({
      hasReceivedFinalGrade: false,
      activeStepState: stepStates.inProgress,
      stepState: stepStates.inProgress,
    });
    useViewStep.mockReturnValueOnce(stepNames.peer);
    const result = useInProgressActions({ options: {} });
    expect(result).toBeNull();
  });

  it('return activeSubmissionConfig when globalState.stepState is inProgress and step is submission', () => {
    useGlobalState.mockReturnValueOnce({
      hasReceivedFinalGrade: false,
      activeStepState: stepStates.inProgress,
      stepState: stepStates.inProgress,
    });
    const result = useInProgressActions({ options: {} });
    expect(result.primary.getMockName()).toBe(
      mockSubmitResponseAction.getMockName(),
    );
    expect(result.secondary.getMockName()).toBe(
      mockCloseModalAction.getMockName(),
    );
  });

  it('return loadNextAction and exitAction when activeStepName is peer and numberOfAssessmentsCompleted is true', () => {
    useGlobalState.mockReturnValueOnce({
      hasReceivedFinalGrade: false,
      activeStepState: stepStates.inProgress,
      stepState: stepStates.done,
      activeStepName: stepNames.peer,
    });
    useStepInfo.mockReturnValueOnce({
      peer: { numberOfAssessmentsCompleted: true },
    });
    const result = useInProgressActions({ options: {} });
    expect(result.primary.getMockName()).toBe(mockLoadNextAction.getMockName());
    expect(result.secondary.getMockName()).toBe(
      mockCloseModalAction.getMockName(),
    );
  });

  it('return loadNextAction and exitAction when activeStepName is studentTraining and numberOfAssessmentsCompleted is true', () => {
    useGlobalState.mockReturnValueOnce({
      hasReceivedFinalGrade: false,
      activeStepState: stepStates.inProgress,
      stepState: stepStates.done,
      activeStepName: stepNames.studentTraining,
    });
    useStepInfo.mockReturnValueOnce({
      studentTraining: { numberOfAssessmentsCompleted: true },
    });
    const result = useInProgressActions({ options: {} });
    expect(result.primary.getMockName()).toBe(mockLoadNextAction.getMockName());
    expect(result.secondary.getMockName()).toBe(
      mockCloseModalAction.getMockName(),
    );
  });

  it('return startStepAction and exitAction when activeStepName is peer and numberOfAssessmentsCompleted is false', () => {
    useGlobalState.mockReturnValueOnce({
      hasReceivedFinalGrade: false,
      activeStepState: stepStates.inProgress,
      stepState: stepStates.done,
      activeStepName: stepNames.peer,
    });
    useStepInfo.mockReturnValueOnce({
      peer: { numberOfAssessmentsCompleted: false },
    });
    const result = useInProgressActions({ options: {} });
    expect(result.primary.getMockName()).toBe(
      mockStartStepAction.getMockName(),
    );
    expect(result.secondary.getMockName()).toBe(
      mockCloseModalAction.getMockName(),
    );
  });
});
