import React from 'react';

import { stepNames, stepStates } from 'data/services/lms/constants';
import { useStepState } from 'data/services/lms/hooks/selectors';

import SelfCancelledStatusAlert from './CancelledStatusAlert';
import SelfClosedStatusAlert from './ClosedStatusAlert';
import SelfCompleteStatusAlert from './CompleteStatusAlert';

const SelfAssessmentStatusAlert = () => {
  const stepState = useStepState({ step: stepNames.self });
  if (stepState === stepStates.cancelled) {
    return <SelfCancelledStatusAlert />;
  }
  if (stepState === stepStates.done) {
    return <SelfCompleteStatusAlert />;
  }
  if (stepState === stepStates.closed) {
    return <SelfClosedStatusAlert />;
  }
  return null;
};

export default SelfAssessmentStatusAlert;
