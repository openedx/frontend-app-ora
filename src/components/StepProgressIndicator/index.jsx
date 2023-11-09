import React from 'react';
import PropTypes from 'prop-types';

import { useIntl } from '@edx/frontend-platform/i18n';

import { stepNames } from 'constants';

import { useAssessmentStepConfig, useStepInfo } from 'hooks/app';

import messages from './messages';

const StepProgressIndicator = ({ step }) => {
  const { formatMessage } = useIntl();
  const configInfo = useAssessmentStepConfig();
  const stepInfo = useStepInfo();
  if (![stepNames.peer, stepNames.studentTraining].includes(step)) {
    return null;
  }
  console.log({ step, stepInfo, configInfo });
  const done = stepInfo[step].numberOfAssessmentsCompleted;
  const stepConfigInfo = configInfo.settings[step];
  if (step === stepNames.peer) {
    const needed = stepConfigInfo.minNumberToGrade;
    return (
      <div className="step-progress-indicator">
        {formatMessage(messages.progress, { needed, done })}
      </div>
    );
  }
  if (step === stepNames.studentTraining) {
    const needed = stepConfigInfo.numberOfExamples;
    return (
      <div className="step-progress-indicator">
        {formatMessage(messages.progress, { needed, done })}
      </div>
    );
  }
  return null;
};

StepProgressIndicator.propTypes = {
  step: PropTypes.string.isRequired,
};

export default StepProgressIndicator;
