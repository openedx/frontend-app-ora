import { useParams } from 'react-router-dom';
import { useActiveView, useIsEmbedded } from 'hooks';
import {
  useEffectiveGrade,
  useGlobalState,
} from 'data/services/lms/hooks/selectors';
import {
  routeSteps,
  stepRoutes,
  stepStates,
} from 'data/services/lms/constants';

export const useProgressStepData = ({ step, canRevisit = false }) => {
  const { xblockId, courseId } = useParams();
  const isEmbedded = useIsEmbedded();
  const activeView = useActiveView();
  const viewStep = routeSteps[activeView];
  const { stepState } = useGlobalState({ step });

  const href = `/${stepRoutes[step]}${isEmbedded ? '/embedded' : ''}/${courseId}/${xblockId}`;
  const isActive = viewStep === step;
  const isEnabled = (
    isActive
    || (stepState === stepStates.inProgress)
    || (canRevisit && stepState === stepStates.completed)
  );
  const myGrade = useEffectiveGrade()?.stepScore;
  return {
    href,
    isEnabled,
    isActive,
    isComplete: stepState === stepStates.completed,
    inProgress: stepState === stepStates.inProgress,
    isPastDue: stepState === stepStates.closed,
    myGrade,
    // myGrade: { earned: 8, possible: 10 },
    // isPastDue: step === 'self',
  };
};

export default { useProgressStepData };
