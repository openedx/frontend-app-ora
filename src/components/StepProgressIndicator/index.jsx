import React from 'react';
import PropTypes from 'prop-types';

import { Skeleton, StatefulButton } from '@edx/paragon';
import { useIntl } from '@edx/frontend-platform/i18n';

import { useLoadNextAction } from 'hooks/actions';

import { stepNames } from 'constants/index';

import {
  useAssessmentStepConfig,
  useGlobalState,
  useStepInfo,
  useHasSubmitted,
  useIsPageDataLoading,
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

  const isPageDataLoading = useIsPageDataLoading();
  const className = 'step-progress-indicator';

  const customWrapper = ({ children }) => (
    <div className="w-50 h-100">
      {children}
    </div>
  );

  if (isPageDataLoading) {
    return (<div className={className}><Skeleton wrapper={customWrapper} /></div>);
  }

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
  const showAction = hasSubmitted
    && !(step === stepNames.peer && stepInfo[step].isWaitingForSubmissions)
    && (needed !== done);

  return (
    <div className={className}>
      {formatMessage(messages.progress, { needed, done })}
      {showAction && (
        <StatefulButton className="ml-2" {...loadNextAction.action} />
      )}
    </div>
  );
};

StepProgressIndicator.propTypes = {
  step: PropTypes.string.isRequired,
};

export default StepProgressIndicator;
