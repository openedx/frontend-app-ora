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
  // when you completed peer assessment, no info being send back. This might need change in the future.
  // if we need to display how many peer assessments the student has completed.
  if (step === stepNames.peer && stepInfo) {
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
