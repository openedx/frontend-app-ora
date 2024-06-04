import React from 'react';
import PropTypes from 'prop-types';

import { Alert, Button } from '@openedx/paragon';
import { Info } from '@openedx/paragon/icons';
import { useIntl } from '@edx/frontend-platform/i18n';

const messageShape = PropTypes.shape({
  id: PropTypes.string,
  defaultMessage: PropTypes.string,
});

const ErrorBanner = ({ actions, headerMessage, children }) => {
  const { formatMessage } = useIntl();
  const actionButtons = actions.map(action => (
    <Button key={action.id} onClick={action.onClick} variant="outline-primary">
      {formatMessage(action.message)}
    </Button>
  ));

  return (
    <Alert variant="danger" icon={Info} actions={actionButtons}>
      <Alert.Heading>
        {formatMessage(headerMessage)}
      </Alert.Heading>
      {children}
    </Alert>
  );
};
ErrorBanner.defaultProps = {
  actions: [],
  children: null,
};
ErrorBanner.propTypes = {
  actions: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      onClick: PropTypes.func,
      message: messageShape,
    }),
  ),
  headerMessage: messageShape.isRequired,
  children: PropTypes.node,
};

export default ErrorBanner;
