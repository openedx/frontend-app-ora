import { useGlobalState, useTrainingStepIsCompleted } from 'hooks/app';
import {
  useHasSubmitted,
  useSubmittedAssessment,
} from 'hooks/assessment';
import { useViewStep } from 'hooks/routing';
import {
  useStartStepAction,
  useLoadNextAction,
  useFinishLaterAction,
  useExitAction,
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

  const finishLaterAction = useFinishLaterAction();
  const exitAction = useExitAction();

  if (!hasSubmitted) {
    if (step === stepNames.studentTraining && trainingStepIsCompleted) {
      return { primary: startStepAction, secondary: finishLaterAction };
    }
    return null;
  }

  // console.log({ step, submittedAssessment, startStepAction });
  // assessment finished state
  if (submittedAssessment) {
    const { activeStepName } = globalState;
    console.log({ activeStepName });
    if (activeStepName === stepNames.staff) {
      return { primary: exitAction };
    }
    // finished and moved to next step
    if ([stepNames.submission || stepNames.self].includes(step)) {
      console.log("self or submission");
      return { primary: startStepAction, secondary: finishLaterAction };
    }
    if (step !== activeStepName) {
      // next step is available
      console.log("next step");
      if (stepState === stepStates.inProgress) {
        console.log({ startStepAction });
        return { primary: startStepAction, secondary: finishLaterAction };
      }
      console.log("next step not available");
      // next step is not available
      return null;
    }

    console.log({ step, activeStepName });
    // finished current assessment but not current step
    if (stepState === stepStates.inProgress) {
      console.log("finished intermediate");
      return { primary: loadNextAction, secondary: finishLaterAction };
    }
    // finished current assessment, but not step
    // and there are no more assessments available for the current step
    return { primary: exitAction };
  }
  console.log("?");
  // submission finished state
  console.log({ startStepAction });
  return { primary: startStepAction, secondary: finishLaterAction };
};

export default useFinishedStateActions;
