import { useViewStep } from 'hooks/routing';
import { useGlobalState } from 'hooks/app';

import { stepNames, stepStates } from 'constants';

import { useIsRevisit } from 'hooks';

import { useCreateFinishedAlert } from './simpleAlerts';

const useRevisitAlerts = () => {
  const step = useViewStep();
  const { stepState } = useGlobalState({ step });
  const finishedAlert = useCreateFinishedAlert({ step });
  const isRevisit = useIsRevisit();
  let out = [];
  if (isRevisit) {
    if (step === stepNames.submission) {
      out = [finishedAlert(stepNames.submission)];
    } else if (step === stepNames.peer && stepState !== stepStates.waiting) {
      out = [finishedAlert(stepNames.peer)];
    }
  }
  return { revisitAlerts: out, isRevisit };
};

export default useRevisitAlerts;
