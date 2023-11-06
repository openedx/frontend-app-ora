import { useIntl } from '@edx/frontend-platform/i18n';
import { CheckCircle, Info, WarningFilled } from '@edx/paragon/icons';
import { Button } from '@edx/paragon';

import { useCloseModal, useViewStep } from 'hooks';
import {
  stepNames,
  stepStates,
} from 'data/services/lms/constants';
import { useHasReceivedFinalGrade, useGlobalState } from 'data/services/lms/hooks/selectors';

import alertMessages from './alertMessages';
import headingMessages from './alertHeadingMessages';

const alertTypes = {
  success: { variant: 'success', icon: CheckCircle },
  danger: { variant: 'danger', icon: Info },
  warning: { variant: 'warning', icon: WarningFilled },
  light: {
    variant: 'light',
    icon: null,
  },
  dark: {
    variant: 'dark',
    icon: null,
  },
};

export const alertMap = {
  [stepStates.done]: alertTypes.success,
  [stepStates.closed]: alertTypes.danger,
  [stepStates.teamAlreadySubmitted]: alertTypes.warning,
  [stepStates.needTeam]: alertTypes.warning,
  [stepStates.waiting]: alertTypes.warning,
  [stepStates.cancelled]: alertTypes.warning,
  [stepStates.inProgress]: alertTypes.dark,
  [stepStates.notAvailable]: alertTypes.light,
};

const useStatusAlertData = ({ step = null, showTrainingError }) => {
  const { formatMessage } = useIntl();
  const {
    activeStepName,
    stepState,
    cancellationInfo,
  } = useGlobalState({ step });
  const closeModal = useCloseModal();
  const isDone = useHasReceivedFinalGrade();
  const viewStep = useViewStep();

  const stepName = step || activeStepName;
  const isRevisit = stepName !== activeStepName;

  console.log({ step, stepName, showTrainingError, stepState });

  const { variant, icon } = alertMap[stepState];

  const returnVal = ({
    heading,
    message,
    actions,
    headingVals = {},
    messageVals = {},
  }) => ({
    variant,
    icon,
    message: formatMessage(message, messageVals),
    heading: formatMessage(heading, headingVals),
    actions,
  });

  if (showTrainingError) {
    return returnVal({
      message: alertMessages.studentTraining.validation,
      variant: 'warning',
    });
  }

  if (isDone) {
    return returnVal({
      message: alertMessages.done.status,
      heading: headingMessages.done.status,
    });
  }

  if (stepName === stepNames.staff) {
    return returnVal({
      message: alertMessages.xblock.staffAssessment,
      heading: headingMessages.xblock.staffAssessment,
    });
  }

  if (viewStep !== stepNames.xblock) {
    if (activeStepName === stepNames.staff) {
      return returnVal({
        message: alertMessages.xblock.staffAssessment,
        heading: headingMessages.xblock.staffAssessment,
        actions: [
          <Button onClick={closeModal}>{formatMessage(alertMessages.xblock.exit)}</Button>,
        ],
      });
    }
  }
  if (cancellationInfo.hasCancelled) {
    const { cancelledBy, cancelledAt } = cancellationInfo;
    if (cancelledBy) {
      return returnVal({
        message: alertMessages.submission.cancelledBy,
        messageVals: { cancelledBy, cancelledAt },
        heading: headingMessages.submission.cancelledBy,
      });
    }
    return returnVal({
      message: alertMessages.submission.cancelledAt,
      messageVals: { cancelledAt },
      heading: headingMessages.submission.cancelledAt,
    });
  }
  if (stepName === stepNames.submission && isRevisit) {
    return returnVal({
      message: alertMessages.submission.finished,
      heading: headingMessages.submission.finished,
    });
  }
  if (stepName === stepNames.peer && isRevisit && stepState !== stepStates.waiting) {
    return returnVal({
      message: alertMessages.peer.finished,
      heading: headingMessages.peer.finished,
    });
  }
  return returnVal({
    message: alertMessages[stepName][stepState],
    heading: headingMessages[stepName][stepState],
  });
};

export default useStatusAlertData;
