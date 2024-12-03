import React from 'react';
import PropTypes from 'prop-types';

import { Skeleton, StatefulButton } from '@openedx/paragon';
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

const StepProgressIndicator = ({ step }) => {
  const { formatMessage } = useIntl();
  const configInfo = useAssessmentStepConfig();
  const stepInfo = useStepInfo();
  const globalState = useGlobalState();
  const hasSubmitted = useHasSubmitted();
  const { activeStepName } = globalState;
  const loadNextAction = useLoadNextAction();

  const isPageDataLoading = useIsPageDataLoading();

  const customWrapper = ({ children }) => (
    <div className="w-50 h-100">
      {children}
    </div>
  );

  if (isPageDataLoading) {
    return (<div className="float-right"><Skeleton wrapper={customWrapper} /></div>);
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
    && !(step === stepNames.studentTraining && needed === done);

  if (showAction && stepNames.peer === step && done >= needed) {
    loadNextAction.action.labels.default = formatMessage(messages.gradeNextPeerOptional);
  }
  return (
    <div className="float-right">
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
