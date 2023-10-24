import React from 'react';

import { useIntl } from '@edx/frontend-platform/i18n';

import { stepStates } from 'data/services/lms/constants';
import StatusAlert from 'components/StatusAlert';

import messages from './messages';

const SelfCancelledAlertStatus = () => {
  const { formatMessage } = useIntl();
  return (
    <StatusAlert
      alertState={stepStates.cancelled}
      headerText={formatMessage(messages.cancelledHeader)}
      message={formatMessage(messages.cancelledMessage)}
    />
  );
};

export default SelfCancelledAlertStatus;
