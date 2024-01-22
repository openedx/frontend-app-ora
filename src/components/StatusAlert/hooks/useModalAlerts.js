import { useViewStep } from 'hooks/routing';
import { useGlobalState, useHasReceivedFinalGrade } from 'hooks/app';
import { useHasSubmitted, useShowTrainingError } from 'hooks/assessment';

import { stepStates } from 'constants/index';

import { isXblockStep } from 'utils';
import { useTrainingErrorAlerts } from './simpleAlerts';

import useRevisitAlerts from './useRevisitAlerts';
import useSuccessAlerts from './useSuccessAlerts';

const useModalAlerts = ({ step }) => {
  const { stepState } = useGlobalState({ step });
  const isDone = useHasReceivedFinalGrade();
  const viewStep = useViewStep();
  const hasSubmitted = useHasSubmitted();
  const { revisitAlerts, isRevisit } = useRevisitAlerts({ step });
  const showTrainingError = useShowTrainingError();
  const trainingErrorAlerts = useTrainingErrorAlerts({ step });
  const successAlerts = useSuccessAlerts({ step });

  // Do nothing if in xblock view
  if (isXblockStep(viewStep)) {
    return [];
  }
  if (showTrainingError) {
    return trainingErrorAlerts;
  }
  // No in-progress messages unless for submitted step
  if (stepState === stepStates.inProgress && !hasSubmitted) {
    return [];
  }
  // No modal alerts for graded state
  if (isDone) {
    return [];
  }

  if (isRevisit && !hasSubmitted) {
    return revisitAlerts;
  }
  if (hasSubmitted) {
    return successAlerts;
  }
  return [];
};

export default useModalAlerts;
