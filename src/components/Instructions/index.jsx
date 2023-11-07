import React from 'react';
import PropTypes from 'prop-types';

import { useIntl } from '@edx/frontend-platform/i18n';

import messages from './messages';

const Instructions = ({ step }) => {
  const { formatMessage } = useIntl();
  if ( !step ) return null;
  return (
    <div>
      <h2>{formatMessage(messages.intructions)}</h2>
      {formatMessage(messages[step])}
    </div>
  );
};
Instructions.defaultProps = {
  step: null,
};
Instructions.propTypes = {
  step: PropTypes.string,
};
export default Instructions;
