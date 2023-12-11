import { useActiveStepName } from 'hooks/app';
import { useExitAction, useStartStepAction } from 'hooks/actions';

import { stepNames, stepStates } from 'constants/index';

import useCreateAlert from './useCreateAlert';
import messages from '../messages';

export const useGradedAlerts = ({ step }) => ([
  useCreateAlert({ step })({
    message: messages.alerts.done.status,
    heading: messages.headings.done.status,
    actions: [useStartStepAction().action],
  }),
]);

export const useTrainingErrorAlerts = ({ step }) => ([
  useCreateAlert({ step })({
    message: messages.alerts.studentTraining[stepStates.trainingValidation],
    variant: 'warning',
  }),
]);

export const useStaffAlerts = ({ step }) => ([
  useCreateAlert({ step })({
    message: messages.alerts[stepNames.staff][stepNames.staff],
    heading: messages.headings[stepNames.staff][stepNames.staff],
  }),
]);

export const useCreateFinishedAlert = ({ step }) => {
  const createAlert = useCreateAlert({ step });
  return (target) => createAlert({
    message: messages.alerts[target][stepStates.submitted],
    heading: messages.headings[target][stepStates.submitted],
  });
};

export const useCreateExitAlert = ({ step }) => {
  const createAlert = useCreateAlert({ step });
  const exitAction = useExitAction();
  const activeStepName = useActiveStepName();
  return (target) => {
    if (activeStepName === stepNames.done) {
      return {
        message: messages.alerts.done.status,
        heading: messages.headings.done.status,
        actions: [exitAction.action],
      };
    }
    return createAlert({
      message: messages.alerts[activeStepName][target],
      heading: messages.headings[activeStepName][target],
    });
  };
};
