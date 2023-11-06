import React from 'react';

import PropTypes from 'prop-types';

import { Alert } from '@edx/paragon';
import useStatusAlertData from './useStatusAlertData';

import './index.scss';

const StatusAlert = ({
  step,
  showTrainingError,
}) => {
  const {
    variant,
    icon,
    heading,
    message,
    actions,
  } = useStatusAlertData({ step, showTrainingError });
  return (
    <Alert
      variant={variant}
      icon={icon}
      className="ora-status-alert"
      actions={actions}
    >
      <Alert.Heading>{heading}</Alert.Heading>
      <p>{message}</p>
    </Alert>
  );
};
StatusAlert.defaultProps = {
  step: null,
  showTrainingError: false,
};
StatusAlert.propTypes = {
  step: PropTypes.string,
  showTrainingError: PropTypes.bool,
};

export default StatusAlert;
