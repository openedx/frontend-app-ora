import { useGlobalState } from 'hooks/app';
import { stepNames, stepStates } from 'constants/index';
import useBadgeConfig, { badgeConfig } from './useBadgeConfig';

jest.mock('hooks/app', () => ({
  useGlobalState: jest.fn(),
}));

describe('useBadgeConfig', () => {
  const mockUseGlobalState = {
    activeStepName: stepNames.submission,
    stepState: stepStates.inProgress,
    lastStep: stepNames.submission,
    hasReceivedFinalGrade: false,
  };

  it('should return badge done when hasReceivedFinalGrade is true', () => {
    useGlobalState.mockReturnValue({
      ...mockUseGlobalState,
      hasReceivedFinalGrade: true,
    });
    const output = useBadgeConfig();
    expect(output).toEqual(badgeConfig[stepNames.done]);
  });

  it('should return badge cancelled when stepState is cancelled', () => {
    useGlobalState.mockReturnValue({
      ...mockUseGlobalState,
      stepState: stepStates.cancelled,
    });
    const output = useBadgeConfig();
    expect(output).toEqual(badgeConfig[stepStates.cancelled]);
  });

  it('should return badge staffAfter when activeStepName is staff', () => {
    useGlobalState.mockReturnValue({
      ...mockUseGlobalState,
      activeStepName: stepNames.staff,
    });
    const output = useBadgeConfig();
    expect(output).toEqual(badgeConfig.staffAfter[stepNames.submission]);
  });

  [
    stepStates.notAvailable,
    stepStates.inProgress,
    stepStates.closed,
    stepStates.needTeam,
    stepStates.teamAlreadySubmitted,
    stepStates.waiting,
    stepStates.waitingForPeerGrades,
  ].forEach((state) => {
    it(`should return badge ${state} when stepState is ${state}`, () => {
      useGlobalState.mockReturnValue({
        ...mockUseGlobalState,
        stepState: state,
      });
      const output = useBadgeConfig();
      expect(output).toEqual(badgeConfig[state]);
    });
  });
});
