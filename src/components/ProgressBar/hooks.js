import { useParams } from 'react-router-dom';

import { useViewStep } from 'hooks/routing';
import { useGlobalState, useStepInfo } from 'hooks/app';
import { useOpenModal } from 'hooks/modal';
import { stepRoutes, stepStates, stepNames } from 'constants/index';
import { isXblockStep } from 'utils';

export const useProgressStepData = ({ step, canRevisit = false }) => {
  const { xblockId, courseId } = useParams();
  const viewStep = useViewStep();
  const {
    effectiveGrade,
    stepState,
    activeStepName,
  } = useGlobalState({ step });
  const stepInfo = useStepInfo();
  const openModal = useOpenModal();
  const isXblock = isXblockStep(viewStep);

  const href = `/${stepRoutes[step]}/${courseId}/${xblockId}`;
  const onClick = () => openModal({ view: step, title: step });
  const isActive = isXblock
    ? activeStepName === step
    : viewStep === step;
  let isEnabled = isActive
    || stepState === stepStates.inProgress
    || (canRevisit && stepState === stepStates.done);

  if (step === stepNames.peer) {
    const isPeerComplete = stepInfo.peer?.numberOfReceivedAssessments > 0;
    const isWaitingForSubmissions = stepInfo.peer?.isWaitingForSubmissions;
    isEnabled = !isWaitingForSubmissions && (isEnabled || isPeerComplete);
  }
  return {
    ...(isXblock ? { onClick } : { href }),
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
