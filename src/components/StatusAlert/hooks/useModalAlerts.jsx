import { useIntl } from '@edx/frontend-platform/i18n';
import { CheckCircle, Info, WarningFilled } from '@edx/paragon/icons';

import { useViewStep } from 'hooks/routing';
import {
  useActiveStepName,
  useGlobalState,
  useHasReceivedFinalGrade,
  useStepState,
} from 'hooks/app';
import { useHasSubmitted } from 'hooks/assessment';
import { useExitAction, useStartStepAction } from 'hooks/actions';

import { stepNames, stepStates } from 'constants';

import messages from './messages';

const alertTypes = {
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

export const useAlertConfig = ({ step }) => alertMap[useStepState({ step })];

export const useCreateAlert = ({ step }) => {
  const { formatMessage } = useIntl();
  const alertConfig = useAlertConfig({ step });
  return ({
    heading,
    message,
    actions,
    headingVals = {},
    messageVals = {},
    ...overrides
  }) => ({
    ...alertConfig,
    message: formatMessage(message, messageVals),
    heading: heading && formatMessage(heading, headingVals),
    actions,
    ...overrides,
  });
};

export const useGradedAlerts = ({ step }) => ([
  useAlertConfig({ step })({
    message: messages.alerts.done.status,
    heading: messages.headings.done.status,
  }),
]);

export const useTrainingErrorAlerts = ({ step }) => ([
  useAlertConfig({ step })({
    message: messages.alerts.studentTraining[stepStates.trainingValidation],
    variant: 'warning',
  }),
]);

export const useStaffAlerts = ({ step }) => {
  const activeStepName = useActiveStepName();
  return [
    useAlertConfig({ step })({
      message: messages.alerts[activeStepName].staffAssessment,
      heading: messages.headings[activeStepName].staffAssessment,
    }),
  ];
};

export const useCreateFinishedAlert = ({ step }) => {
  const createAlert = useCreateAlert({ step });
  return (target) => createAlert({
    message: messages.alerts[target].finished,
    heading: messages.headings[target].finished,
  });
};

export const useCreateExitAlert = ({ step }) => {
  const createAlert = useCreateAlert({ step });
  const exitAction = useExitAction();
  const activeStepName = useActiveStepName();
  return (target) => createAlert({
    message: messages.alerts[activeStepName][target],
    heading: messages.headings[activeStepName][target],
    actions: [exitAction],
  });
};

export const useRevisitAlerts = ({ step }) => {
  const { activeStepName, stepState } = useGlobalState({ step });
  const viewStep = useViewStep();
  const stepName = step || activeStepName;
  const finishedAlert = useCreateFinishedAlert({ step });
  const isRevisit = viewStep !== stepNames.xblock && stepName !== activeStepName;
  let out = [];
  if (isRevisit) {
    if (stepName === stepNames.submission) {
      out = [finishedAlert(stepNames.submission)];
    } else if (stepName === stepNames.peer && stepState !== stepStates.waiting) {
      out = [finishedAlert(stepNames.peer)];
    }
  }
  return { revisitAlerts: out, isRevisit };
};

export const useSuccessAlerts = ({ step }) => {
  const { activeStepName, activeStepState } = useGlobalState({ step });
  const viewStep = useViewStep();
  const hasSubmitted = useHasSubmitted();
  const startStepAction = useStartStepAction();
  const exitAlert = useCreateExitAlert({ step });

  const createAlert = useCreateAlert({ step });

  const out = [];
  if (hasSubmitted) {
    const successAlert = {
      message: messages.alerts[viewStep].submitted,
      heading: messages.headings[viewStep].submitted,
      ...alertTypes.success,
    };
    if (activeStepState === stepStates.inProgress && activeStepName !== viewStep) {
      successAlert.actions = [startStepAction];
    }
    out.push(createAlert(successAlert));

    if (activeStepState !== stepStates.inProgress) {
      out.push(exitAlert(activeStepState));
    }
    if (activeStepName === stepNames.staff) {
      out.push(exitAlert(stepNames.staff));
    }
    return out;
  }
  return null;
};

export const useCancelledAlerts = ({ step }) => {
  const alertConfig = useAlertConfig({ step });
  return (cancellationInfo) => {
    let out = null;
    const {
      hasCancelled,
      cancelledBy,
      cancelledAt,
    } = cancellationInfo;
    const alertMessages = messages.alerts.submission;
    const headingMessages = messages.headings.submission;
    if (hasCancelled) {
      out = [
        alertConfig({
          message: cancelledBy ? alertMessages.cancelledBy : alertMessages.cancelledAt,
          heading: cancelledBy ? headingMeadings.cancelledBy : headingMessages.cancelledAt,
          messageVals: { cancelledAt, cancelledBy },
        }),
      ];
    }
    return { cancelledAlerts: out, hasCancelled };
};

export const useModalAlerts = ({ step, showTrainingError }) => {
  const { stepState } = useGlobalState({ step });
  const isDone = useHasReceivedFinalGrade();
  const viewStep = useViewStep();
  const hasSubmitted = useHasSubmitted();
  const { revisitAlerts, isRevisit } = useRevisitAlerts({ step });
  const trainingErrorAlerts = useTrainingErrorAlerts({ step });
  const successAlerts = useSuccessAlerts({ step });

  // Do nothing if in xblock view
  if (viewStep === stepNames.xblock) {
    return null;
  }

  // No in-progress messages unless for submitted step
  if (stepState === stepStates.inProgress && !hasSubmitted) {
    return null;
  }
  // No modal alerts for graded state
  if (isDone) {
    return null;
  }

  if (isRevisit) {
    return revisitAlerts;
  }
  if (showTrainingError) {
    return trainingErrorAlerts;
  }
  if (hasSubmitted) {
    return successAlerts;
  }
  return null;
};


const useStatusAlertData = ({
  step = null,
  showTrainingError,
}) => {
  const {
    activeStepName,
    stepState,
  } = useGlobalState({ step });
  const isDone = useHasReceivedFinalGrade();
  const viewStep = useViewStep();

  const createAlert = useCreateAlert({ step });
  const modalAlerts = useModalAlerts({ step, showTrainingError });
  const gradedAlerts = useGradedAlerts({ step });
  const { hasCancelled, cancelledAlerts } = useCancelledAlerts({ step });
  const staffAlerts = useStaffAlerts({ step });

  const stepName = step || activeStepName;

  if (isDone) {
    return gradedAlerts;
  }
  if (viewStep !== stepNames.xblock) {
    return modalAlerts;
  }
  if (hasCancelled) {
    return cancelledAlerts;
  }

  if (stepName === stepNames.staff) {
    return staffAlerts;
  }

  return [createAlert({
    message: messages.alerts[stepName][stepState],
    heading: messages.headings[stepName][stepState],
  })];
};

export default useStatusAlertData;
