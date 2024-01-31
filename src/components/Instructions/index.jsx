import React from 'react';

import { useIntl } from '@edx/frontend-platform/i18n';

import { stepNames, stepStates } from 'constants/index';

import { useGlobalState } from 'hooks/app';
import { useViewStep } from 'hooks/routing';
import { isXblockStep } from 'utils';

import useInstructionsMessage from './useInstructionsMessage';

import messages from './messages';

const Instructions = () => {
  const { formatMessage } = useIntl();
  const message = useInstructionsMessage();
  const viewStep = useViewStep();
  const { activeStepName, stepState } = useGlobalState();
  const stepName = isXblockStep(viewStep) ? activeStepName : viewStep;
  if (stepState !== stepStates.inProgress || stepName === stepNames.staff) {
    return null;
  }
  return (
    <div className='py-4'>
      <p className='mb-0'>
        <strong>{formatMessage(messages.instructions)}: </strong>
        {message}
      </p>
    </div>
  );
};
export default Instructions;
