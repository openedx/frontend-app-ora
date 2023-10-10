import React from 'react';
import PropTypes from 'prop-types';

import { Alert } from '@edx/paragon';

import StatusAlert from 'components/StatusAlert';

const CancelledState = ({
  headerText,
  message,
  title,
}) => (
  <StatusAlert status="cancelled" title={title}>
    <Alert.Heading>{headerText}</Alert.Heading>
    <p>{message}</p>
  </StatusAlert>
);

CancelledState.propTypes = {
  headerText: PropTypes.node.isRequired,
  message: PropTypes.node.isRequired,
  title: PropTypes.node.isRequired,
};

export default CancelledState;
