import { stepNames, stepStates } from 'constants';

import { useGlobalState } from 'hooks/app';
import { useHasSubmitted } from 'hooks/assessment';
import { useViewStep } from 'hooks/routing';
import { useStartStepAction, useCloseModalAction } from 'hooks/actions';

import useFinishedStateActions from './useFinishedStateActions';
import useInProgressActions from './useInProgressActions';

const useModalActionConfig = ({ options }) => {
  const step = useViewStep();
  const globalState = useGlobalState({ step });
  const hasSubmitted = useHasSubmitted();
  const finishedStateActions = useFinishedStateActions();
  const inProgressActions = useInProgressActions({ options });

  const startStepAction = useStartStepAction();
  const exitAction = useCloseModalAction();

  if (globalState.hasReceivedFinalGrade) {
    return step === stepNames.done
      ? { primary: exitAction }
      : { primary: startStepAction, secondary: exitAction };
  }
  // finished state
  if (hasSubmitted) {
    if (globalState.activeStepState !== stepStates.inProgress) {
      return { primary: exitAction };
    }
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
