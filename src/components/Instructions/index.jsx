import React from 'react';

import { useIntl } from '@edx/frontend-platform/i18n';

import useInstructionsMessage from './useInstructionsMessage';

import messages from './messages';

const Instructions = () => {
  const { formatMessage } = useIntl();
  const message = useInstructionsMessage();
  if (!message) {
    return null;
  }
  return (
    <div className="py-4">
      <p className="mb-0">
        <strong>{formatMessage(messages.instructions)}: </strong>
        {message}
      </p>
    </div>
  );
};
export default Instructions;
