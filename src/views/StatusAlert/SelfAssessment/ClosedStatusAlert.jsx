import React from 'react';

import { useIntl } from '@edx/frontend-platform/i18n';

import { stepStates } from 'data/services/lms/constants';
import StatusAlert from 'components/StatusAlert';

import messages from './messages';

const SelfClosedStatusAlert = () => {
  const { formatMessage } = useIntl();
  return (
    <StatusAlert
      alertState={stepStates.closed}
      headerText={formatMessage(messages.closedHeader)}
      message={formatMessage(messages.closedMessage)}
    />
  );
};

export default SelfClosedStatusAlert;
