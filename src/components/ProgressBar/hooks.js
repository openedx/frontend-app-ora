import { useParams } from 'react-router-dom';

import { useIsEmbedded, useViewStep } from 'hooks/routing';
import { useGlobalState } from 'hooks/app';
import {
  stepRoutes,
  stepStates,
} from 'constants';

export const useProgressStepData = ({ step, canRevisit = false }) => {
  const { xblockId, courseId } = useParams();
  const isEmbedded = useIsEmbedded();
  const viewStep = useViewStep();
  const { effectiveGrade, stepState } = useGlobalState({ step });

  const href = `/${stepRoutes[step]}${isEmbedded ? '/embedded' : ''}/${courseId}/${xblockId}`;
  const isActive = viewStep === step;
  const isEnabled = (
    isActive
    || (stepState === stepStates.inProgress)
    || (canRevisit && stepState === stepStates.done)
  );
  console.log({ step, viewStep, stepState, canRevisit, isEnabled });
  return {
    href,
    isEnabled,
    isActive,
    isComplete: stepState === stepStates.done,
    inProgress: stepState === stepStates.inProgress,
    isPastDue: stepState === stepStates.closed,
    myGrade: effectiveGrade,
    // myGrade: { earned: 8, possible: 10 },
    // isPastDue: step === 'self',
  };
};

export default { useProgressStepData };
