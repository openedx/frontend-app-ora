import { useParams } from 'react-router-dom';
import { useIsEmbedded, useViewStep } from 'hooks';
import {
  useEffectiveGrade,
  useHasReceivedFinalGrade,
  useStepInfo,
  useGlobalState,
} from 'data/services/lms/hooks/selectors';
import {
  stepRoutes,
  stepStates,
  stepNames,
} from 'data/services/lms/constants';

export const stepCanRevisit = {
  [stepNames.submission]: true,
  [stepNames.peer]: true,
  [stepNames.studentTraining]: false,
  [stepNames.self]: false,
  [stepNames.done]: true,
};

export const useProgressStepData = ({ step }) => {
  const { xblockId, courseId } = useParams();
  const isEmbedded = useIsEmbedded();
  const viewStep = useViewStep();
  const { stepState, activeStepName } = useGlobalState({ step });
  const hasReceivedFinalGrade = useHasReceivedFinalGrade();
  const stepInfo = useStepInfo();

  const href = `/${stepRoutes[step]}${isEmbedded ? '/embedded' : ''}/${courseId}/${xblockId}`;
  const isActive = viewStep === step;
  console.log({ step })
  const isEnabled = (
    isActive
    // always enabled on submission step
    || step === stepNames.submission
    // if we've received a final grade, we can always revisit the done step
    || (step === stepStates.done && hasReceivedFinalGrade)
    // if active step is done, we can use revisit map
    || activeStepName === stepStates.done && stepCanRevisit[step]
    || !!stepInfo[step]
  );

  const myGrade = useEffectiveGrade()?.stepScore;
  return {
    href,
    isEnabled,
    isActive,
    isComplete: stepState === stepStates.done,
    inProgress: stepState === stepStates.inProgress,
    isPastDue: stepState === stepStates.closed,
    myGrade,
    // myGrade: { earned: 8, possible: 10 },
    // isPastDue: step === 'self',
  };
};

export default { useProgressStepData };
