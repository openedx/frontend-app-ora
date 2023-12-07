import { useActiveStepName } from 'hooks/app';
import { useExitAction } from 'hooks/actions';

import { stepNames, stepStates } from 'constants';

import useCreateAlert from './useCreateAlert';
import messages from '../messages';

export const useGradedAlerts = ({ step }) => ([
  useCreateAlert({ step })({
    message: messages.alerts.done.status,
    heading: messages.headings.done.status,
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
    message: messages.alerts[stepNames.staff],
    heading: messages.headings[stepNames.staff],
  }),
]);

export const useCreateFinishedAlert = ({ step }) => {
  const createAlert = useCreateAlert({ step });
  return (target) => createAlert({
    message: messages.alerts[target][stepStates.submitted],
    heading: messages.headings[target][stepStates.finished],
  });
};

export const useCreateExitAlert = ({ step }) => {
  const createAlert = useCreateAlert({ step });
  const exitAction = useExitAction();
  const activeStepName = useActiveStepName();
  return (target) => {
    console.log({ activeStepName, target });
    return createAlert({
      message: messages.alerts[activeStepName][target],
      heading: messages.headings[activeStepName][target],
      actions: [exitAction.action],
    });
  };
};
