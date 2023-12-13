import React from 'react';

import { Button } from '@edx/paragon';
import { Edit, Highlight, Lightbulb } from '@edx/paragon/icons';
import { useIntl } from '@edx/frontend-platform/i18n';

import { useLoadNextAction } from 'hooks/actions';
import { stepNames, stepStates } from 'constants/index';
import {
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
  const action = (() => {
    if (
      [stepNames.studentTraining, stepNames.peer].includes(activeStepName)
      && stepState !== stepStates.waiting
      && stepInfo.numberOfAssessmentsCompleted > 0
      && !stepInfo.isWaitingForSubmissions
    ) {
      const onClick = () => openModal({ view: activeStepName, title: activeStepName });
      return (
        <Button className="mb-3" onClick={onClick} iconBefore={stepIcons[activeStepName]}>
          {loadNextAction.action.labels.default}
        </Button>
      );
    }
    if (
      activeStepName !== stepNames.staff
      && (stepState === stepStates.inProgress || activeStepName === stepNames.done)
    ) {
      const onClick = () => openModal({ view: activeStepName, title: activeStepName });
      return (
        <Button className="mb-3" onClick={onClick} iconBefore={stepIcons[activeStepName]}>
          {formatMessage(messages[activeStepName])}
        </Button>
      );
    }
    return null;
  })();
  return (
    <div className="text-center py-2">
      {action}
    </div>
  );
};

export default SubmissionActions;
