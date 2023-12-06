import { useViewStep } from 'hooks/routing';
import { useGlobalState } from 'hooks/app';

import { stepNames, stepStates } from 'constants';

import { useCreateFinishedAlert } from './simpleAlerts';

const useRevisitAlerts = ({ step }) => {
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

export default useRevisitAlerts;
