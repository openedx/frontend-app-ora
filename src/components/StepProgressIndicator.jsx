import React from 'react';

import { stepNames } from 'data/services/lms/constants';
import { useAssessmentStepConfig, useStepInfo } from 'data/services/lms/hooks/selectors';

const StepProgressIndicator = ({ step }) => {
  const configInfo = useAssessmentStepConfig();
  const stepInfo = useStepInfo()[step];
  console.log({ configInfo, stepInfo });
  if (step === stepNames.peer) {
    return (
      <div className="step-progress-indicator">
        Some peer info
      </div>
    );
  }
  if (step === stepNames.studentTraining) {
    return (
      <div className="step-progress-indicator">
        some training info
      </div>
    );
  }
  return null;
};

export default StepProgressIndicator;
