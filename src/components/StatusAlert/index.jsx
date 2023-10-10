import React from 'react';
import PropTypes from 'prop-types';

import { Alert } from '@edx/paragon';
import { CheckCircle, Info, WarningFilled } from '@edx/paragon/icons';
import { useActiveView } from 'hooks';
import { routeSteps, stepStates } from 'data/services/lms/constants';
import { useStepState } from 'data/services/lms/hooks/selectors';

export const alertMap = {
  [stepStates.completed]: {
    variant: 'success',
    icon: CheckCircle,
  },
  [stepStates.closed]: {
    variant: 'danger',
    icon: Info,
  },
  [stepStates.teamAlreadySubmitted]: {
    variant: 'warning',
    icon: WarningFilled,
  },
  [stepStates.cancelled]: {
    variant: 'warning',
    icon: WarningFilled,
  },
  [stepStates.inProgress]: {
    variant: 'dark',
    icon: null,
  },
};

const StatusAlert = ({
  headerText,
  message,
  action,
  alertState,
}) => {
  // let stepState = useStepState({ step: routeSteps[useActiveView()] });
  const { variant, icon } = alertMap[alertState];
  const actions = action ? [action] : [];

  console.log({ alertState, variant, icon });

  return (
    <Alert
      variant={variant}
      icon={icon}
      actions={actions}
    >
      <Alert.Heading>{headerText}</Alert.Heading>
      <p>{message}</p>
    </Alert>
  );
};
StatusAlert.defaultProps = {
  action: null,
  alertState: null,
};
StatusAlert.propTypes = {
  headerText: PropTypes.node.isRequired,
  message: PropTypes.node.isRequired,
  action: PropTypes.node,
  alertState: PropTypes.string,
};

export default StatusAlert;
