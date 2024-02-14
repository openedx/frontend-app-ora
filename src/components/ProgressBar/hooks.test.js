import { useViewStep } from 'hooks/routing';
import { useGlobalState, useStepInfo } from 'hooks/app';
import { useOpenModal } from 'hooks/modal';
import { isXblockStep } from 'utils';

import { stepRoutes, stepStates, stepNames } from 'constants/index';
import { useProgressStepData } from './hooks';

jest.mock('hooks/routing', () => ({
  useViewStep: jest.fn(),
}));
jest.mock('hooks/app', () => ({
  useGlobalState: jest.fn(),
  useStepInfo: jest.fn(),
}));
jest.mock('hooks/modal', () => ({
  useOpenModal: jest.fn(),
}));
jest.mock('utils', () => ({
  isXblockStep: jest.fn(),
}));
jest.mock('react-router-dom', () => ({
  useParams: jest.fn(() => ({
    xblockId: 'xblockId',
    courseId: 'courseId',
  })),
}));

describe('useProgressStepData', () => {
  const mockOpenModal = jest.fn();
  const props = {
    step: stepNames.self,
    canRevisit: false,
  };
  beforeEach(() => {
    useViewStep.mockReturnValue(stepNames.self);
    useGlobalState.mockReturnValue({
      effectiveGrade: 8,
      stepState: stepStates.done,
      activeStepName: stepNames.self,
      stepIsUnavailable: false,
    });
    useStepInfo.mockReturnValue({
      peer: {
        numberOfReceivedAssessments: 0,
        isWaitingForSubmissions: false,
      },
    });
    useOpenModal.mockReturnValue(mockOpenModal);
    isXblockStep.mockReturnValue(false);
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should have on click when is xblock', () => {
    isXblockStep.mockReturnValueOnce(true);
    const result = useProgressStepData(props);
    result.onClick();
    expect(mockOpenModal).toHaveBeenCalledWith({ view: stepNames.self, title: stepNames.self });
  });

  it('should have href when is not xblock', () => {
    const result = useProgressStepData(props);
    expect(result.href).toBe(`/${stepRoutes[stepNames.self]}/courseId/xblockId`);
  });

  it('is complete when step state is done', () => {
    const result = useProgressStepData(props);
    expect(result.isComplete).toBe(true);
  });

  it('is in progress when step state is in progress', () => {
    useGlobalState.mockReturnValue({
      stepState: stepStates.inProgress,
    });
    const result = useProgressStepData(props);
    expect(result.inProgress).toBe(true);
  });

  it('is past due when step state is closed', () => {
    useGlobalState.mockReturnValue({
      stepState: stepStates.closed,
    });
    const result = useProgressStepData(props);
    expect(result.isPastDue).toBe(true);
  });

  it('is active when step is active', () => {
    const result = useProgressStepData(props);
    expect(result.isActive).toBe(true);
  });

  it('is not enabled when step is unavailable', () => {
    useGlobalState.mockReturnValue({
      stepIsUnavailable: true,
    });
    const result = useProgressStepData(props);
    expect(result.isEnabled).toBe(false);
  });

  it('use effect grade from global state', () => {
    const result = useProgressStepData(props);
    expect(result.myGrade).toBe(8);
  });

  test('for peer step is not enabled when waiting for submissions', () => {
    useStepInfo.mockReturnValue({
      peer: {
        numberOfReceivedAssessments: 0,
        isWaitingForSubmissions: true,
      },
    });
    const result = useProgressStepData({ ...props, step: stepNames.peer });
    expect(result.isEnabled).toBe(false);
  });

  test('for peer step is enabled iif peer is complete and no waiting for submission', () => {
    useStepInfo.mockReturnValue({
      peer: {
        numberOfReceivedAssessments: 1,
        isWaitingForSubmissions: false,
      },
    });
    const result = useProgressStepData({ ...props, step: stepNames.peer });
    expect(result.isEnabled).toBe(true);
  });
});
