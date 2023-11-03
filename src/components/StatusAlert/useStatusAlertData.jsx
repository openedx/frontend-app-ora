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

const useStatusAlertMessages = (step = null) => {
  const { formatMessage } = useIntl();
  const {
    activeStepName,
    stepState,
    cancellationInfo,
  } = useGlobalState({ step });
  const closeModal = useCloseModal();
  const viewStep = useViewStep();

  const stepName = step || activeStepName;
  const isRevisit = stepName !== activeStepName;
  if (viewStep !== stepNames.xblock) {
    if (activeStepName === stepNames.staff) {
      return {
        message: formatMessage(alertMessages.xblock.staffAssessment),
        heading: formatMessage(headingMessages.xblock.staffAssessment),
        actions: [
          <Button onClick={closeModal}>{formatMessage(alertMessages.xblock.exit)}</Button>,
        ],
      };
    }
  }
  if (cancellationInfo.hasCancelled) {
    const { cancelledBy, cancelledAt } = cancellationInfo;
    if (cancelledBy) {
      return {
        message: formatMessage(
          alertMessages.submission.cancelledBy,
          { cancelledBy, cancelledAt },
        ),
        heading: formatMessage(headingMessages.submission.cancelledBy),
      };
    }
    return {
      message: formatMessage(alertMessages.submission.cancelledAt, { cancelledAt }),
      heading: formatMessage(headingMessages.submission.cancelledAt),
    };
  }
  if (stepName === stepNames.submission && isRevisit) {
    return {
      message: formatMessage(alertMessages.submission.finished),
      heading: formatMessage(headingMessages.submission.finished),
    };
  }
  if (stepName === stepNames.peer && isRevisit && stepState !== stepStates.waiting) {
    return {
      message: formatMessage(alertMessages.peer.finished),
      heading: formatMessage(headingMessages.peer.finished),
    };
  }
  return {
    message: formatMessage(alertMessages[stepName][stepState]),
    heading: formatMessage(headingMessages[stepName][stepState]),
  };
};

const useStatusAlertData = (step = null) => {
  const globalState = useGlobalState({ step });
  const { variant, icon } = alertMap[globalState.stepState];
  const content = useStatusAlertMessages(step, globalState);
  return { variant, icon, ...content };
};

export default useStatusAlertData;
