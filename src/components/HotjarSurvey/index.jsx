import React, { useEffect } from 'react';
import { useGlobalState, useStepInfo, useAssessmentStepConfig } from 'hooks/app';
import { stepNames, stepStates } from 'constants';

export const HotjarSurvey = () => {
  const configInfo = useAssessmentStepConfig();
  const stepInfo = useStepInfo();
  const isSelfRequired = configInfo.settings[stepNames.self].required;
  const isPeerRequired = configInfo.settings[stepNames.peer].required;
  const stepState = useGlobalState(stepNames.self).activeStepState;

  let isShowSurvey = false;
  /*
    Hotjar survey widget will show for the following scenarios:
    1. ORA is configured with self AND NOT peer assessment.
       After completing self assessment survey will render (xblock)
    2. ORA is configured with self AND peer assessment. Survey
       will render when learner completed their assignments
  */
  if (isSelfRequired && !isPeerRequired) {
    isShowSurvey = (stepState === stepStates.done);
  } else if (isPeerRequired && stepInfo[stepNames.peer] != null) {
    const stepConfigInfo = configInfo.settings[stepNames.peer];
    const { minNumberToGrade } = stepConfigInfo;
    const { numberOfAssessmentsCompleted } = stepInfo[stepNames.peer];

    isShowSurvey = (minNumberToGrade === numberOfAssessmentsCompleted);
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
