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
  useHasSubmitted,
} from 'hooks/assessment';

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
  step = null,
  showTrainingError,
}) => {
  const { formatMessage } = useIntl();
  const {
    activeStepName,
    activeStepState,
    cancellationInfo,
    stepState,
  } = useGlobalState({ step });
  const closeModal = useCloseModal();
  const isDone = useHasReceivedFinalGrade();
  const viewStep = useViewStep();
  const hasSubmitted = useHasSubmitted();

  const stepName = step || activeStepName;
  const isRevisit = stepName !== activeStepName;

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

  if (isDone) {
    return [alertConfig({
      message: messages.alerts.done.status,
      heading: messages.headings.done.status,
    })];
  }

  if (viewStep !== stepNames.xblock) {
    if (showTrainingError) {
      return [alertConfig({
        message: messages.alerts.studentTraining[stepStates.trainingValidation],
        variant: 'warning',
      })];
    }
    const out = [];
    if (hasSubmitted) {
      out.push(alertConfig({
        message: messages.alerts[viewStep].submitted,
        heading: messages.headings[viewStep].submitted,
        ...alertTypes.success,
      }));
      if (activeStepState !== stepStates.inProgress) {
        out.push(alertConfig({
          message: messages.alerts[activeStepName][activeStepState],
          heading: messages.headings[activeStepName][activeStepState],
          actions: [
            <Button onClick={closeModal}>{formatMessage(messages.exit)}</Button>,
          ],
        }));
      }
      if (activeStepName === stepNames.staff) {
        out.push(alertConfig({
          message: messages.alerts[activeStepName].staffAssessment,
          heading: messages.headings[activeStepName].staffAssessment,
          actions: [
            <Button onClick={closeModal}>{formatMessage(messages.exit)}</Button>,
          ],
        }));
      }
      return out;
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
  if (stepName === stepNames.staff) {
    return [alertConfig({
      message: messages.alerts[activeStepName].staffAssessment,
      heading: messages.headings[activeStepName].staffAssessment,
    })];
  }
  return [alertConfig({
    message: messages.alerts[stepName][stepState],
    heading: messages.headings[stepName][stepState],
  })];
};

export default useStatusAlertData;
