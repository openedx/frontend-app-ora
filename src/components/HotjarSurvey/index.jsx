import React, { useEffect } from 'react';
import { useGlobalState, useStepInfo, useAssessmentStepConfig, } from 'hooks/app';
import { stepNames, stepStates, } from 'constants';

function showSurvey() {
  const configInfo = useAssessmentStepConfig();
  const stepInfo = useStepInfo();
  const isSelfRequired = configInfo.settings[stepNames.self]['required']
  const isPeerRequired = configInfo.settings[stepNames.peer]['required']

  let isShowSurvey = false;

  if (isSelfRequired && !isPeerRequired) {
    const stepState = useGlobalState(stepNames.self)["activeStepState"]
    isShowSurvey = (stepState === stepStates.done);

  } else if (isPeerRequired && stepInfo[stepNames.peer] != null) {
    const stepConfigInfo = configInfo.settings[stepNames.peer];
    const { minNumberToGrade } = stepConfigInfo;
    const { numberOfAssessmentsCompleted } = stepInfo[stepNames.peer];

    isShowSurvey = (minNumberToGrade === numberOfAssessmentsCompleted)

  }
  return isShowSurvey;
};


export const HotjarSurvey = () => {
  const isShowSurvey = showSurvey()
  useEffect(() => {
    if (isShowSurvey && window.hj) {
      window.hj('event', 'lms_openassessment_survey');
    }
  });
  return (
    <div id="openassessment_hotjar"></div>

  )
}

export default HotjarSurvey;
