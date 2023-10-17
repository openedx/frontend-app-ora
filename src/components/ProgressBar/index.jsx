import React from 'react';

import { useIntl } from '@edx/frontend-platform/i18n';
import { Navbar } from '@edx/paragon';

import {
  useAssessmentStepOrder,
  useIsPageDataLoaded,
} from 'data/services/lms/hooks/selectors';
import { stepNames } from 'data/services/lms/constants';

import ProgressStep from './ProgressStep';

import messages from './messages';
import './index.scss';

export const stepLabels = {
  [stepNames.submission]: messages.createSubmission,
  [stepNames.peer]: messages.peerAssess,
  [stepNames.studentTraining]: messages.studentTraining,
  [stepNames.self]: messages.selfAssess,
  [stepNames.done]: messages.myGrade,
};

export const stepCanRevisit = {
  [stepNames.submission]: true,
  [stepNames.peer]: true,
  [stepNames.studentTraining]: false,
  [stepNames.self]: false,
  [stepNames.done]: true,
};

export const ProgressBar = () => {
  const isLoaded = useIsPageDataLoaded();

  const stepOrder = useAssessmentStepOrder();
  const { formatMessage } = useIntl();

  if (!isLoaded) {
    return null;
  }

  const stepEl = (step) => (
    stepLabels[step]
      ? (
        <ProgressStep
          step={step}
          key={step}
          label={formatMessage(stepLabels[step])}
          canRevisit={stepCanRevisit[step]}
        />
      ) : null
  );

  return (
    <Navbar>
      <Navbar.Collapse className="ora-progress-nav-group bg-white">
        <hr className="ora-progress-divider" />
        {stepEl(stepNames.submission)}
        {stepOrder.map(stepEl)}
        {stepEl(stepNames.done)}
      </Navbar.Collapse>
    </Navbar>
  );
};

export default ProgressBar;
