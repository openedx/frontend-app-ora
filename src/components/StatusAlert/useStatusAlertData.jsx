import { useIntl } from '@edx/frontend-platform/i18n';
import { CheckCircle, Info, WarningFilled } from '@edx/paragon/icons';
import { Button } from '@edx/paragon';

import { useCloseModal } from 'hooks/modal';
import { useViewStep } from 'hooks/routing';
import {
  useHasReceivedFinalGrade,
  useGlobalState,
} from 'hooks/app';

import {
  stepNames,
  stepStates,
} from 'constants';

import messages from './messages';

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
  [stepStates.submitted]: alertTypes.success,
  [stepStates.closed]: alertTypes.danger,
  [stepStates.teamAlreadySubmitted]: alertTypes.warning,
  [stepStates.needTeam]: alertTypes.warning,
  [stepStates.waiting]: alertTypes.warning,
  [stepStates.cancelled]: alertTypes.warning,
  [stepStates.inProgress]: alertTypes.dark,
  [stepStates.notAvailable]: alertTypes.light,
};

const useStatusAlertData = ({
  hasSubmitted,
  step = null,
  showTrainingError,
}) => {
  const { formatMessage } = useIntl();
  const globalState = useGlobalState({ step });
  const {
    activeStepName,
    cancellationInfo,
  } = useGlobalState({ step });
  const closeModal = useCloseModal();
  const isDone = useHasReceivedFinalGrade();
  const viewStep = useViewStep();

  const stepState = hasSubmitted ? stepStates.submitted : globalState.stepState;
  const stepName = step || activeStepName;
  const isRevisit = stepName !== activeStepName;

  console.log({
    hasSubmitted,
    step,
    stepName,
    showTrainingError,
    stepState,
  });

  const { variant, icon } = alertMap[stepState];

  const alertConfig = ({
    heading,
    message,
    actions,
    headingVals = {},
    messageVals = {},
    ...overrides
  }) => ({
    variant,
    icon,
    message: formatMessage(message, messageVals),
    heading: heading && formatMessage(heading, headingVals),
    actions,
    ...overrides,
  });

  if (showTrainingError) {
    return [alertConfig({
      message: messages.alerts.studentTraining.validation,
      variant: 'warning',
    })];
  }

  if (isDone) {
    return [alertConfig({
      message: messages.alerts.done.status,
      heading: messages.headings.done.status,
    })];
  }

  if (stepName === stepNames.staff) {
    return [alertConfig({
      message: messages.alerts.xblock.staffAssessment,
      heading: messages.headings.xblock.staffAssessment,
    })];
  }

  if (viewStep !== stepNames.xblock) {
    if (activeStepName === stepNames.staff) {
      return [alertConfig({
        message: messages.alerts.xblock.staffAssessment,
        heading: messages.headings.xblock.staffAssessment,
        actions: [
          <Button onClick={closeModal}>{formatMessage(messages.alerts.xblock.exit)}</Button>,
        ],
      })];
    }
  }
  if (cancellationInfo.hasCancelled) {
    const { cancelledBy, cancelledAt } = cancellationInfo;
    if (cancelledBy) {
      return [alertConfig({
        message: messages.alerts.submission.cancelledBy,
        messageVals: { cancelledBy, cancelledAt },
        heading: messages.headings.submission.cancelledBy,
      })];
    }
    return [alertConfig({
      message: messages.alerts.submission.cancelledAt,
      messageVals: { cancelledAt },
      heading: messages.headings.submission.cancelledAt,
    })];
  }
  if (stepName === stepNames.submission && isRevisit) {
    return [alertConfig({
      message: messages.alerts.submission.finished,
      heading: messages.headings.submission.finished,
    })];
  }
  if (stepName === stepNames.peer && isRevisit && stepState !== stepStates.waiting) {
    return [alertConfig({
      message: messages.alerts.peer.finished,
      heading: messages.headings.peer.finished,
    })];
  }
  return [alertConfig({
    message: messages.alerts[stepName][stepState],
    heading: messages.headings[stepName][stepState],
  })];
};

export default useStatusAlertData;
