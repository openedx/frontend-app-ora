import React from 'react';

import { Button } from '@openedx/paragon';
import { Edit, Highlight, Lightbulb } from '@openedx/paragon/icons';
import { useIntl } from '@edx/frontend-platform/i18n';

import { useLoadNextAction } from 'hooks/actions';
import { stepNames, stepStates } from 'constants/index';
import {
  useAssessmentStepConfig,
  useGlobalState,
  useStepInfo,
} from 'hooks/app';
import { useOpenModal } from 'hooks/modal';

import messages from './messages';

const stepIcons = {
  [stepNames.submission]: Edit,
  [stepNames.studentTraining]: Lightbulb,
  [stepNames.self]: Highlight,
  [stepNames.peer]: Highlight,
};

const SubmissionActions = () => {
  const { activeStepName, stepState } = useGlobalState();
  const openModal = useOpenModal();
  const { formatMessage } = useIntl();
  const stepInfo = useStepInfo()[activeStepName];
  const loadNextAction = useLoadNextAction();
  const stepConfigInfo = useAssessmentStepConfig().settings[activeStepName];

  const onClick = React.useCallback(() => {
    openModal({ view: activeStepName, title: activeStepName });
  }, [activeStepName, openModal]);

  const action = (() => {
    if (
      [stepNames.studentTraining, stepNames.peer].includes(activeStepName)
      && stepState !== stepStates.waiting
      && stepInfo.numberOfAssessmentsCompleted > 0
      && !stepInfo.isWaitingForSubmissions
    ) {
      const isOptional = activeStepName === stepNames.peer
        && stepInfo.numberOfAssessmentsCompleted
          >= stepConfigInfo.minNumberToGrade;
      return (
        <Button
          className="mb-3"
          onClick={onClick}
          iconBefore={stepIcons[activeStepName]}
        >
          {loadNextAction.action.labels.default}
          {isOptional && formatMessage(messages.optional)}
        </Button>
      );
    }
    if (
      activeStepName !== stepNames.staff
      && (stepState === stepStates.inProgress || activeStepName === stepNames.done)
    ) {
      return (
        <Button
          className="mb-3"
          onClick={onClick}
          iconBefore={stepIcons[activeStepName]}
        >
          {formatMessage(messages[activeStepName])}
        </Button>
      );
    }
    return null;
  })();
  return <div className="text-center py-2">{action}</div>;
};

export default SubmissionActions;
