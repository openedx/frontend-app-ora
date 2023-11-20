import React from 'react';
import { useParams } from 'react-router-dom';

import { useIsEmbedded, useViewStep } from 'hooks/routing';
import { useGlobalState, useStepInfo } from 'hooks/app';
import { useOpenModal } from 'hooks/modal';
import { stepRoutes, stepStates, stepNames } from 'constants';

export const useProgressStepData = ({ step, canRevisit = false }) => {
  const { xblockId, courseId } = useParams();
  const isEmbedded = useIsEmbedded();
  const viewStep = useViewStep();
  const { effectiveGrade, stepState } = useGlobalState({ step });
  const stepInfo = useStepInfo();
  const openModal = useOpenModal();

  const href = `/${stepRoutes[step]}${
    isEmbedded ? '/embedded' : ''
  }/${courseId}/${xblockId}`;
  const onClick = () => openModal({ view: step, title: step });
  const isActive = viewStep === step;
  const isEnabled =
    isActive ||
    stepState === stepStates.inProgress ||
    (canRevisit &&
      (stepState === stepStates.done ||
        (step === stepNames.peer &&
          stepInfo.peer?.numberOfReceivedAssessments > 0)));

  return {
    ...(viewStep === stepNames.xblock ? { onClick } : { href }),
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
