import { useGlobalState } from 'hooks/app';
import { useHasSubmitted } from 'hooks/assessment';
import { useViewStep } from 'hooks/routing';
import {
  stepNames,
  stepStates,
} from 'constants';

import { useExitAction } from 'hooks/actions';
import useFinishedStateActions from './useFinishedStateActions';
import useInProgressActions from './useInProgressActions';

const useModalActionConfig = ({ options }) => {
  const step = useViewStep();
  const globalState = useGlobalState({ step });
  const hasSubmitted = useHasSubmitted();
  const finishedStateActions = useFinishedStateActions();
  const inProgressActions = useInProgressActions({ options });

  const exitAction = useExitAction();

  console.log({ useModalActionConfig: { step, globalState, hasSubmitted } });
  // finished state
  if (hasSubmitted) {
    return finishedStateActions;
  }

  // In Progress states
  if (globalState.activeStepState === stepStates.inProgress) {
    return inProgressActions;
  }

  // Graded step
  if (step === stepNames.done) {
    return { primary: exitAction };
  }
  return null;
};

export default useModalActionConfig;
