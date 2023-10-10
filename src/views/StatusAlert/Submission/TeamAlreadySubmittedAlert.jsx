import React from 'react';

import { useIntl } from '@edx/frontend-platform/i18n';

import { stepStates } from 'data/services/lms/constants';
import StatusAlert from 'components/StatusAlert';

import messages from './messages';

const TeamAlreadySubmittedStatusAlert = () => {
  const { formatMessage } = useIntl();
  return (
    <StatusAlert
      alertState={stepStates.teamAlreadySubmitted}
      headerText={formatMessage(messages.teamAlreadySubmittedHeader)}
      message={formatMessage(messages.teamAlreadySubmittedMessage)}
    />
  );
};

export default TeamAlreadySubmittedStatusAlert;
