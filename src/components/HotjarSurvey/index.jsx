import React, { useEffect } from 'react';

import {
  useGlobalState,
  useStepInfo,
  useAssessmentStepConfig,
  useAssessmentStepOrder,
  useStepState,
} from 'hooks/app';
import { stepNames, stepStates } from 'constants';

export const HotjarSurvey = () => {
  const assessmentStepConfig = useAssessmentStepConfig();
  const stepInfo = useStepInfo();
  const assessmentStepOrder = useAssessmentStepOrder();
  const isSelfRequired = assessmentStepOrder.includes(stepNames.self);
  const isPeerRequired = assessmentStepOrder.includes(stepNames.peer);
  const isSelfDone = useStepState({ step: stepNames.self }) === stepStates.done;

  const globalState = useGlobalState();

  let isShowSurvey = false;

  /*
    Hotjar survey widget will show for the following scenarios:
    1. ORA is configured with self AND NOT peer assessment.
       After completing self assessment survey will render (xblock)
    2. ORA is configured with self AND peer assessment. Survey
       will render when learner completed their assignments
  */
  if (isSelfRequired && !isPeerRequired) {
    isShowSurvey = isSelfDone;
  } else if (isPeerRequired && globalState.activeStepName === stepNames.peer && stepInfo[stepNames.peer] != null) {
    const stepConfigInfo = assessmentStepConfig.settings[stepNames.peer];
    const { minNumberToGrade } = stepConfigInfo;
    const { numberOfAssessmentsCompleted } = stepInfo[stepNames.peer];
    isShowSurvey = isSelfDone && (minNumberToGrade === numberOfAssessmentsCompleted);
  }

  useEffect(() => {
    if (isShowSurvey && window.hj) {
      window.hj('event', 'lms_openassessment_survey');
    }
  });
  return (
    <div id="openassessment_hotjar" />
  );
};

export default HotjarSurvey;
