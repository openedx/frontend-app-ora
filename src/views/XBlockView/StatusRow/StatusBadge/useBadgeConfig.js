import { StrictDict } from '@edx/react-unit-test-utils';

import { useGlobalState } from 'hooks/app';
import {
  stepNames,
  stepStates,
} from 'constants/index';

import messages from './messages';

const badgeConfig = StrictDict({
  [stepStates.cancelled]: { variant: 'danger', message: messages.cancelled },
  [stepStates.notAvailable]: { variant: 'light', message: messages.notAvailable },
  [stepStates.inProgress]: { variant: 'primary', message: messages.inProgress },
  [stepStates.closed]: { variant: 'danger', message: messages.pastDue },
  [stepStates.needTeam]: { variant: 'warning', message: messages.teamRequired },
  [stepStates.teamAlreadySubmitted]: { variant: 'warning', message: messages.closed },
  [stepStates.waiting]: { variant: 'warning', message: messages.notReady },
  [stepNames.done]: { variant: 'success', message: messages.complete },
  staffAfter: StrictDict({
    [stepNames.submission]: { variant: 'primary', message: messages.submitted },
    [stepNames.studentTraining]: { variant: 'primary', message: messages.practiceCompleted },
    [stepNames.self]: { variant: 'primary', message: messages.selfCompleted },
    [stepNames.peer]: { variant: 'primary', message: messages.peerCompleted },
  }),
});

const useBadgeConfig = () => {
  const {
    activeStepName,
    stepState,
    lastStep,
    hasReceivedFinalGrade,
  } = useGlobalState();
  if (hasReceivedFinalGrade) {
    return badgeConfig[stepNames.done];
  }
  if (stepState === stepStates.cancelled) {
    return badgeConfig[stepStates.cancelled];
  }
  if (activeStepName === stepNames.staff) {
    return badgeConfig.staffAfter[lastStep];
  }
  return badgeConfig[stepState];
};

export default useBadgeConfig;
