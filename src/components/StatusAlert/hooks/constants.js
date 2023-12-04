import { CheckCircle, Info, WarningFilled } from '@edx/paragon/icons';

import { stepStates } from 'constants';

export const alertTypes = {
  success: { variant: 'success', icon: CheckCircle },
  danger: { variant: 'danger', icon: Info },
  warning: { variant: 'warning', icon: WarningFilled },
  light: { variant: 'light', icon: null },
  dark: { variant: 'dark', icon: null },
};

export const alertMap = {
  [stepStates.done]: alertTypes.success,
  [stepStates.submitted]: alertTypes.success,
  [stepStates.closed]: alertTypes.danger,
  [stepStates.teamAlreadySubmitted]: alertTypes.warning,
  [stepStates.needTeam]: alertTypes.warning,
  [stepStates.waiting]: alertTypes.warning,
  [stepStates.cancelled]: alertTypes.warning,
  [stepStates.notAvailable]: alertTypes.light,
  [stepStates.inProgress]: alertTypes.dark,
};
