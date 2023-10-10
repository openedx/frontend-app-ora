import React from 'react';
import PropTypes from 'prop-types';

import { Alert } from '@edx/paragon';
import { useIntl } from '@edx/frontend-platform/i18n';

import StatusAlert from 'components/StatusAlert';

const ErrorState = ({
  headerText,
  message,
  title,
}) => (
  <StatusAlert title={title} status="error">
    <Alert.Heading>{headerText}</Alert.Heading>
    <p>{message}</p>
  </StatusAlert>
);
ErrorState.propTypes = {
  headerText: PropTypes.node.isRequired,
  message: PropTypes.node.isRequired,
  title: PropTypes.node.isRequired,
};

export default ErrorState;
