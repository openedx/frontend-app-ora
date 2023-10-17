import React from 'react';
import PropTypes from 'prop-types';

import { Alert } from '@edx/paragon';
import useStatusAlert from './useStatusAlert';

const StatusAlert = ({
  step,
}) => {
  const {
    variant,
    icon,
    header,
    message,
  } = useStatusAlert(step);
  return (
    <Alert
      variant={variant}
      icon={icon}
    >
      <Alert.Heading>{header}</Alert.Heading>
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
