import React from 'react';
import PropTypes from 'prop-types';

import { StatefulButton } from '@edx/paragon';
import { useIntl } from '@edx/frontend-platform/i18n';

import { useLoadNextAction } from 'hooks/actions';

import { stepNames } from 'constants';

import { useViewStep } from 'hooks/routing';
import {
  useAssessmentStepConfig,
  useGlobalState,
  useStepInfo,
  useHasSubmitted,
} from 'hooks/app';

import messages from './messages';
import './index.scss';

const StepProgressIndicator = ({ step }) => {
  const { formatMessage } = useIntl();
  const configInfo = useAssessmentStepConfig();
  const stepInfo = useStepInfo();
  const globalState = useGlobalState();
  const hasSubmitted = useHasSubmitted();
  const { activeStepName } = globalState;
  const loadNextAction = useLoadNextAction();
  if (![stepNames.peer, stepNames.studentTraining].includes(step)) {
    return null;
  }
  const stepConfigInfo = configInfo.settings[step];
  const needed = step === stepNames.peer
    ? stepConfigInfo.minNumberToGrade
    : stepConfigInfo.numberOfExamples;
  const done = activeStepName === step
    ? stepInfo[step].numberOfAssessmentsCompleted
    : needed;
  const showAction = hasSubmitted && (
    (step === stepNames.peer && !stepInfo[step].isWaitingForSubmissions)
    || (needed !== done)
  );
  return (
    <div className="step-progress-indicator">
      {formatMessage(messages.progress, { needed, done })}
      {showAction && (
        <StatefulButton className="ml-2" {...loadNextAction} />
      )}
    </div>
  );
};

StepProgressIndicator.propTypes = {
  step: PropTypes.string.isRequired,
};

export default StepProgressIndicator;
