import React from 'react';
import PropTypes from 'prop-types';
import { useLocation } from 'react-router-dom';
import classNames from 'classnames';

import { useIntl } from '@edx/frontend-platform/i18n';
import { Navbar, Nav, Icon } from '@edx/paragon';
import { Locked, CheckCircle, Error } from '@edx/paragon/icons';

import {
  useAssessmentStepConfig,
  useProgressData,
  useIsPageDataLoaded,
} from 'data/services/lms/hooks/selectors';

import messages from './messages';
import './index.scss';

export const ProgressStep = ({
  children,
  href,
  isActive,
  isEnabled,
  isComplete,
  isError,
  number,
}) => {
  let icon = <Icon className="nav-icon" src={Locked} />;
  if (isComplete) {
    icon = <Icon className="nav-icon" src={CheckCircle} />;
  } else if (isError) {
    icon = <Icon className="nav-icon text-danger-300" src={Error} />;
  } else if (number) {
    icon = <span className="nav-icon number-icon">{number}</span>;
  }
  return (
    <Nav.Link
      href={href}
      disabled={!isEnabled}
      className={classNames(
        'ora-progress-nav',
        'px-4',
        { 'is-active': isActive },
      )}
    >
      {icon}
      {children}
    </Nav.Link>
  );
};
ProgressStep.defaultProps = {
  href: '#',
  isActive: false,
  isEnabled: false,
  isComplete: false,
  isError: false,
  number: null,
};
ProgressStep.propTypes = {
  children: PropTypes.node.isRequired,
  href: PropTypes.string,
  isActive: PropTypes.bool,
  isEnabled: PropTypes.bool,
  isError: PropTypes.bool,
  isComplete: PropTypes.bool,
  number: PropTypes.number,
};

export const SubmissionStep = () => {
  const { formatMessage } = useIntl();
  return (
    <ProgressStep>{formatMessage(messages.createSubmission)}</ProgressStep>
  );
};

export const TrainingStep = () => {
  const { formatMessage } = useIntl();
  return (
    <ProgressStep>{formatMessage(messages.practice)}</ProgressStep>
  );
};

export const SelfAssessStep = () => {
  const { formatMessage } = useIntl();
  return (
    <ProgressStep>{formatMessage(messages.selfAssess)}</ProgressStep>
  );
};

export const PeerAssessStep = () => {
  const { formatMessage } = useIntl();
  return (
    <ProgressStep>{formatMessage(messages.peerAssess)}</ProgressStep>
  );
};

export const MyGradeStep = () => {
  const { formatMessage } = useIntl();
  return (
    <ProgressStep>{formatMessage(messages.myGrade)}</ProgressStep>
  );
};

export const ProgressBar = () => {
  const stepConfig = useAssessmentStepConfig();
  const progress = useProgressData();
  const isLoaded = useIsPageDataLoaded();
  const location = useLocation();
  if (!isLoaded) {
    return null;
  }
  console.log({
    stepConfig, progress, location,
  });
  return (
    <Navbar>
      <Navbar.Collapse className="ora-progress-nav-group">
        <hr className="ora-progress-divider" />
        <SubmissionStep />
        {stepConfig.order.map(step => {
          if (step === 'peer') {
            return <PeerAssessStep key={step} />;
          }
          if (step === 'training') {
            return <TrainingStep key={step} />;
          }
          if (step === 'self') {
            return <SelfAssessStep key={step} />;
          }
          return null;
        })}
        <MyGradeStep />
      </Navbar.Collapse>
    </Navbar>
  );
};

export default ProgressBar;
