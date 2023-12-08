import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { useRef } from 'react';
import { useGlobalState, useStepInfo, useAssessmentStepConfig, } from 'hooks/app';
import { stepNames, stepStates, } from 'constants';

function showSurvey() {
  const configInfo = useAssessmentStepConfig();
  const stepInfo = useStepInfo();
  const isSelfRequired = configInfo.settings[stepNames.self]['required']
  const isPeerRequired = configInfo.settings[stepNames.peer]['required']

  let show = false;

  if (isSelfRequired && !isPeerRequired) {
    const stepState = useGlobalState(stepNames.self)["activeStepState"]
    show = (stepState === stepStates.done);

  } else if (isPeerRequired && stepInfo[stepNames.peer] != null) {
    const stepConfigInfo = configInfo.settings[stepNames.peer];
    const { minNumberToGrade } = stepConfigInfo;
    const { numberOfAssessmentsCompleted } = stepInfo[stepNames.peer];

    show = (minNumberToGrade === numberOfAssessmentsCompleted)

  }
  return show;
};

function TriggerHotjar() {
  // check to see if hotjar is available, then trigger hotjar event
  const domRef = useRef(null);
  const hasWindow = typeof domRef.window !== 'undefined';
  if (hasWindow && domRef.window.hj) {
    domRef.window.hj('event', 'lms_openassessment_survey');
  }
  return null;
}

export const HotjarSurvey = () => {
  console.log(showSurvey())
  if (showSurvey()) {
    return (
      <div id="openassessment_hotjar">
        <TriggerHotjar />
      </div>
    );
  } else {
    return null;
  }
}

export default HotjarSurvey;
