import { useViewStep } from 'hooks/routing';
import { useGlobalState } from 'hooks/app';
import { useHasSubmitted } from 'hooks/assessment';
import { useStartStepAction } from 'hooks/actions';

import { stepNames, stepStates } from 'constants';

import messages from '../messages';
import { alertTypes } from './constants';
import useCreateAlert from './useCreateAlert';
import { useCreateExitAlert } from './simpleAlerts';

const useSuccessAlerts = ({ step }) => {
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
  }
  return out;
};

export default useSuccessAlerts;
