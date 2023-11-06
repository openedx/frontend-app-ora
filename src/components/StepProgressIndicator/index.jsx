import React from 'react';
import PropTypes from 'prop-types';

import { useIntl } from '@edx/frontend-platform/i18n';

import { stepNames } from 'data/services/lms/constants';
import { useAssessmentStepConfig, useStepInfo } from 'data/services/lms/hooks/selectors';
import messages from './messages';

const StepProgressIndicator = ({ step }) => {
  const { formatMessage } = useIntl();
  const configInfo = useAssessmentStepConfig().settings[step];
  const stepInfo = useStepInfo()[step];
  if (step === stepNames.peer) {
    const needed = configInfo.minNumberToGrade;
    const done = stepInfo.numberOfAssessmentsCompleted;
    return (
      <div className="step-progress-indicator">
        {formatMessage(messages.progress, { needed, done })}
      </div>
    );
  }
  if (step === stepNames.studentTraining) {
    const needed = configInfo.numberOfExamples;
    const done = stepInfo.numberOfAssessmentsCompleted;
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
