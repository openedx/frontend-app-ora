import React from 'react';

import { Button, Icon } from '@edx/paragon';
import { Edit } from '@edx/paragon/icons';
import { useIntl } from '@edx/frontend-platform/i18n';

import { stepStates } from 'data/services/lms/constants';
import StatusAlert from 'components/StatusAlert';

import messages from './messages';

const SubmissionCompleteStatusAlert = () => {
  const { formatMessage } = useIntl();
  return (
    <StatusAlert
      alertState={stepStates.completed}
      headerText={formatMessage(messages.completedHeader)}
      message={formatMessage(messages.completedMessage)}
      action={(
        <Button className="d-flex m-auto" variant="primary" onClick={() => {}}>
          <Icon src={Edit} />
          {formatMessage(messages.completedButton)}
        </Button>
      )}
    />
  );
};

export default SubmissionCompleteStatusAlert;
