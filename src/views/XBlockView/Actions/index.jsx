import React from 'react';

import { Button } from '@edx/paragon';
import { Edit, Highlight, Lightbulb } from '@edx/paragon/icons';
import { useIntl } from '@edx/frontend-platform/i18n';

import { stepNames, stepStates } from 'constants';
import { useGlobalState } from 'hooks/app';
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
  let action = null;
  if (
    activeStepName !== stepNames.staff
    && (stepState === stepStates.inProgress || activeStepName === stepNames.done)
  ) {
    const onClick = () => openModal({ view: activeStepName, title: activeStepName });
    action = (
      <Button onClick={onClick} iconBefore={stepIcons[activeStepName]}>
        {formatMessage(messages[activeStepName])}
      </Button>
    );
  }
  return (
    <div className="text-center">
      {action}
    </div>
  );
};

export default SubmissionActions;
