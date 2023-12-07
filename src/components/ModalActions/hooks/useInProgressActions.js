import { useGlobalState, useStepInfo } from 'hooks/app';
import { useHasSubmitted } from 'hooks/assessment';
import { useViewStep } from 'hooks/routing';
import { stepNames, stepStates } from 'constants';

import {
  useCloseModalAction,
  useLoadNextAction,
  useStartStepAction,
  useSubmitResponseAction,
} from 'hooks/actions';

const useInProgressActions = ({ options }) => {
  const step = useViewStep();
  const globalState = useGlobalState({ step });
  const hasSubmitted = useHasSubmitted();
  const startStepAction = useStartStepAction(step);
  const stepInfo = useStepInfo();

  const exitAction = useCloseModalAction();
  const activeSubmissionConfig = {
    primary: useSubmitResponseAction({ options }),
    secondary: exitAction,
  };
  const loadNextAction = useLoadNextAction();

  if (globalState.hasReceivedFinalGrade) {
    return { primary: startStepAction, secondary: exitAction };
  }

  // finished state
  if (hasSubmitted) { return null; }
  if (globalState.activeStepState !== stepStates.inProgress) {
    return null;
  }

  // current step is in-progress and unblocked
  if (globalState.stepState === stepStates.inProgress) {
    // only submission step has inProgress modal actions.
    // assessment step inProgress actions are in the Assessment
    // graded step is never inProgress
    return step === stepNames.submission ? activeSubmissionConfig : null;
  }

  // current step is in progress, but you are not viewing it currently
  const { activeStepName } = globalState;
  // if current step has more assessments
  if (
    [stepNames.peer, stepNames.studentTraining].includes(activeStepName)
    && stepInfo[activeStepName].numberOfAssessmentsCompleted
  ) {
    return { primary: loadNextAction, secondary: exitAction };
  }
  // current step has only one assessment, or is on first one
  return { primary: startStepAction, secondary: exitAction };
};

export default useInProgressActions;
