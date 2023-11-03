import React from 'react';

import PropTypes from 'prop-types';

import { Alert } from '@edx/paragon';
import useStatusAlertData from './useStatusAlertData';

import './index.scss';

const StatusAlert = ({
  step,
}) => {
  const {
    variant,
    icon,
    heading,
    message,
    actions,
  } = useStatusAlertData(step);
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
};
StatusAlert.propTypes = {
  step: PropTypes.string,
};

export default StatusAlert;
