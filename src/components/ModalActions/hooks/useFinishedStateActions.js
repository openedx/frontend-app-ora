import { useGlobalState, useTrainingStepIsCompleted } from 'hooks/app';
import {
  useHasSubmitted,
  useSubmittedAssessment,
} from 'hooks/assessment';
import { useViewStep } from 'hooks/routing';
import {
  useStartStepAction,
  useLoadNextAction,
  useCloseModalAction,
} from 'hooks/actions';
import { stepNames, stepStates } from 'constants';

const useFinishedStateActions = () => {
  const step = useViewStep();
  const globalState = useGlobalState({ step });
  const hasSubmitted = useHasSubmitted();
  const startStepAction = useStartStepAction(step);
  const submittedAssessment = useSubmittedAssessment();
  const loadNextAction = useLoadNextAction();
  const trainingStepIsCompleted = useTrainingStepIsCompleted();

  const stepState = globalState.activeStepState;

  const exitAction = useCloseModalAction();

  if (!hasSubmitted) {
    if (step === stepNames.studentTraining && trainingStepIsCompleted) {
      return { primary: startStepAction, secondary: exitAction };
    }
    return null;
  }

  // assessment finished state
  if (submittedAssessment) {
    const { activeStepName } = globalState;
    if (activeStepName === stepNames.done) {
      return { primary: startStepAction };
    }
    if (activeStepName === stepNames.staff) {
      return { primary: exitAction };
    }
    // finished and moved to next step
    if ([stepNames.submission || stepNames.self].includes(step)) {
      return { primary: startStepAction, secondary: exitAction };
    }
    if (step !== activeStepName) {
      // next step is available
      if (stepState === stepStates.inProgress) {
        return { primary: startStepAction, secondary: exitAction };
      }
      // next step is not available
      return null;
    }

    // finished current assessment but not current step
    if (stepState === stepStates.inProgress) {
      return { primary: loadNextAction, secondary: exitAction };
    }
    // finished current assessment, but not step
    // and there are no more assessments available for the current step
    return { primary: exitAction };
  }
  // submission finished state
  return { primary: startStepAction, secondary: exitAction };
};

export default useFinishedStateActions;
