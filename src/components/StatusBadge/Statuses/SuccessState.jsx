import React from 'react';
import PropTypes from 'prop-types';

import { Alert } from '@edx/paragon';

import StatusAlert from 'components/StatusAlert';

const SuccessState = ({
  headerText,
  message,
  actions,
  title,
}) => (
  <StatusAlert
    title={title}
    status="success"
  >
    <div className="d-flex align-items-center">
      <div className="d-flex flex-column">
        <Alert.Heading>{headerText}</Alert.Heading>
        <p>{message}</p>
      </div>
      {actions}
    </div>
  </StatusAlert>
);

SuccessState.propTypes = {
  headerText: PropTypes.node.isRequired,
  message: PropTypes.node.isRequired,
  actions: PropTypes.arrayOf(PropTypes.node),
  title: PropTypes.node.isRequired,
};
export default SuccessState;
