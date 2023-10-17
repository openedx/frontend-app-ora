import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { StrictDict } from '@edx/react-unit-test-utils';
import { Nav, Icon } from '@edx/paragon';
import {
  CheckCircle,
  Edit,
  Error,
  Highlight,
  Rule,
} from '@edx/paragon/icons';

import { stepNames } from 'data/services/lms/constants';
import { useProgressStepData } from './hooks';

export const stepIcons = StrictDict({
  [stepNames.submission]: Edit,
  [stepNames.studentTraining]: Highlight,
  [stepNames.self]: Highlight,
  [stepNames.peer]: Highlight,
  [stepNames.done]: Rule,
});

const ProgressStep = ({
  step,
  canRevisit,
  label,
}) => {
  const {
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
      subLabel = `${myGrade.earned} / ${myGrade.possible}`;
    }
  }
  return (
    <Nav.Link
      {...(!isActive && { href })}
      disabled={!isEnabled}
      className={classNames(
        'ora-progress-nav',
        'px-4',
        { 'is-active': isActive },
      )}
    >
      <Icon className={classNames('nav-icon', colorClass)} src={iconSrc} />
      <div className="d-inline-block">
        {label}
        {subLabel && (
          <p className={classNames('x-small', colorClass)}>{subLabel}</p>
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
