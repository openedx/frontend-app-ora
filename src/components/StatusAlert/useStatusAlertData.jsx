import { useIntl } from '@edx/frontend-platform/i18n';
import { CheckCircle, Info, WarningFilled } from '@edx/paragon/icons';
import { Button } from '@edx/paragon';

import { useCloseModal, useViewStep } from 'hooks';
import {
  stepNames,
  stepStates,
  routeSteps,
} from 'data/services/lms/constants';
import { useGlobalState } from 'data/services/lms/hooks/selectors';

import actionMessages from 'components/ModalActions/messages';
import alertMessages from './alertMessages';
import headingMessages from './alertHeadingMessages';

export const alertMap = {
  [stepStates.done]: {
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

const useStatusAlertData = ({ step = null, showTrainingError }) => {
  const { formatMessage } = useIntl();
  const {
    activeStepName,
    stepState,
    cancellationInfo,
  } = useGlobalState({ step });
  const closeModal = useCloseModal();
  const viewStep = useViewStep();

  if (showTrainingError) {
    return {
      message: formatMessage(alertMessages.studentTraining.validation),
      variant: 'warning',
    };
  }

  const { variant, icon } = alertMap[stepState];
  const stepName = step || activeStepName;
  const isRevisit = stepName !== activeStepName;

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
