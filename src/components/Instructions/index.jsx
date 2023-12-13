import React from 'react';

import { useIntl } from '@edx/frontend-platform/i18n';

import { stepStates } from 'constants/index';
import { useStepState } from 'hooks/app';

import useInstructionsMessage from './useInstructionsMessage';

import messages from './messages';

const Instructions = () => {
  const { formatMessage } = useIntl();
  const message = useInstructionsMessage();
  const stepState = useStepState({});
  if (stepState !== stepStates.inProgress) {
    return null;
  }
  return (
    <div className="pb-4">
      <h2 className="py-3">{formatMessage(messages.instructions)}</h2>
      {message}
    </div>
  );
};
export default Instructions;
