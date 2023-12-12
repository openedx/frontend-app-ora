import { useViewStep } from 'hooks/routing';
import { useGlobalState, useHasReceivedFinalGrade } from 'hooks/app';
import { useHasSubmitted } from 'hooks/assessment';

import { stepNames, stepStates } from 'constants/index';

import { useTrainingErrorAlerts } from './simpleAlerts';

import useRevisitAlerts from './useRevisitAlerts';
import useSuccessAlerts from './useSuccessAlerts';

const useModalAlerts = ({ step, showTrainingError }) => {
  const { stepState } = useGlobalState({ step });
  const isDone = useHasReceivedFinalGrade();
  const viewStep = useViewStep();
  const hasSubmitted = useHasSubmitted();
  const { revisitAlerts, isRevisit } = useRevisitAlerts({ step });
  const trainingErrorAlerts = useTrainingErrorAlerts({ step });
  const successAlerts = useSuccessAlerts({ step });

  // Do nothing if in xblock view
  if (viewStep === stepNames.xblock) {
    return [];
  }

  // No in-progress messages unless for submitted step
  if (stepState === stepStates.inProgress && !hasSubmitted) {
    return [];
  }
  // No modal alerts for graded state
  if (isDone) {
    return [];
  }

  if (isRevisit) {
    return revisitAlerts;
  }
  if (showTrainingError) {
    return trainingErrorAlerts;
  }
  if (hasSubmitted) {
    return successAlerts;
  }
  return [];
};

export default useModalAlerts;
