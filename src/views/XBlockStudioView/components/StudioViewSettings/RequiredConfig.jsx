import React from 'react';
import PropTypes from 'prop-types';

import { useIntl } from '@edx/frontend-platform/i18n';

import messages from '../messages';

const RequiredConfig = ({
  required,
}) => {
  const { formatMessage } = useIntl();

  if (required == null) {
    return (
      <span>{formatMessage(messages.noneLabel)}</span>
    );
  }

  return (
    <span>{formatMessage(required ? messages.requiredLabel : messages.optionalLabel)}</span>
  );
};

RequiredConfig.defaultProps = {
  required: null,
};

RequiredConfig.propTypes = {
  required: PropTypes.bool,
};

export default RequiredConfig;
