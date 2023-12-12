import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { useIntl } from '@edx/frontend-platform/i18n';
import { Navbar, Icon } from '@edx/paragon';
import { ArrowDropUpDown, ArrowForwardIos } from '@edx/paragon/icons';

import {
  useAssessmentStepOrder,
  useGlobalState,
  useHasReceivedFinalGrade,
  useIsPageDataLoaded,
} from 'hooks/app';
import { stepNames } from 'constants/index';

import { useViewStep } from 'hooks/routing';
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

export const ProgressBar = ({ className }) => {
  const isLoaded = useIsPageDataLoaded();
  const hasReceivedFinalGrade = useHasReceivedFinalGrade();

  const activeStep = useViewStep();
  const { activeStepName } = useGlobalState();

  const stepOrders = [
    stepNames.submission,
    ...useAssessmentStepOrder(),
    stepNames.done,
  ].filter(step => step !== stepNames.staff);
  const { formatMessage } = useIntl();

  if (!isLoaded) {
    return null;
  }

  const stepEl = (curStep) => (
    <ProgressStep
      step={curStep}
      key={curStep}
      label={formatMessage(stepLabels[curStep])}
      canRevisit={
          (curStep === 'done' && hasReceivedFinalGrade)
          || stepCanRevisit[curStep]
        }
    />
  );

  let activeStepTitle = activeStep === stepNames.xblock ? activeStepName : activeStep;
  if (activeStepTitle === stepNames.staff) {
    activeStepTitle = stepNames.submission;
  }

  return (
    <Navbar className={classNames('px-0', className)} expand="md">
      <Navbar.Toggle className="w-100 border-0">
        <div className="d-flex justify-content-between m-0 h3">
          <span className="d-flex">
            <Icon src={ArrowForwardIos} className="mr-2" />
            {formatMessage(stepLabels[activeStepTitle])}
          </span>
          <Icon src={ArrowDropUpDown} />
        </div>
      </Navbar.Toggle>
      <Navbar.Collapse className="ora-progress-nav-group bg-white">
        <hr className="ora-progress-divider" />
        {stepOrders.map(stepEl)}
      </Navbar.Collapse>
    </Navbar>
  );
};
ProgressBar.defaultProps = {
  className: '',
};
ProgressBar.propTypes = {
  className: PropTypes.string,
};

export default ProgressBar;
