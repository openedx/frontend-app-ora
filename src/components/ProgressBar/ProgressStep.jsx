import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { Nav, Icon } from '@openedx/paragon';
import {
  CheckCircle,
  Edit,
  Error,
  Highlight,
  Rule,
} from '@openedx/paragon/icons';

import { stepNames } from 'constants/index';
import { useProgressStepData } from './hooks';

export const stepIcons = {
  [stepNames.submission]: Edit,
  [stepNames.studentTraining]: Highlight,
  [stepNames.self]: Highlight,
  [stepNames.peer]: Highlight,
  [stepNames.done]: Rule,
};

const ProgressStep = ({
  step,
  canRevisit,
  label,
}) => {
  const {
    onClick,
    href,
    isActive,
    isEnabled,
    isComplete,
    isPastDue,
    myGrade,
  } = useProgressStepData({ step, canRevisit });
  let iconSrc = stepIcons[step];
  let subLabel = null;
  let colorClass = null;
  if (isPastDue) {
    colorClass = 'text-danger-500';
    iconSrc = Error;
    subLabel = 'Past due!';
  } else if (isComplete) {
    iconSrc = CheckCircle;
    if (step === stepNames.done && myGrade) {
      subLabel = `${myGrade.stepScore.earned} / ${myGrade.stepScore.possible}`;
    }
  }
  return (
    <Nav.Link
      {...(isEnabled && { onClick, href })}
      disabled={!isEnabled}
      className={classNames(
        'ora-progress-nav',
        'px-0',
        { 'is-active': isActive },
      )}
    >
      <Icon
        className={classNames('nav-icon', 'my-auto', colorClass)}
        src={iconSrc}
        {...subLabel && { style: { position: 'relative', bottom: '0.7rem' } }}
      />
      <div className="d-inline-block">
        {label}
        {subLabel && (
          <p data-testid="sublabel-test-id" className={classNames('x-small', 'm-0', colorClass)}>{subLabel}</p>
        )}
      </div>
    </Nav.Link>
  );
};
ProgressStep.propTypes = {
  label: PropTypes.node.isRequired,
  step: PropTypes.string.isRequired,
  canRevisit: PropTypes.bool.isRequired,
};

export default ProgressStep;
