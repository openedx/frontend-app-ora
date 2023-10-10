import React from 'react';
import PropTypes from 'prop-types';

import { useIntl } from '@edx/frontend-platform/i18n';

import StatusAlert from 'components/StatusAlert';
import messages from './messages';

const InProgressState = ({
  inProgressText,
  actions,
  title,
}) => {
  const { formatMessage } = useIntl();
  return (
    <StatusAlert status="default" title={title}>
      <div>
        <p><strong>{formatMessage(messages.instructions)}: </strong>{inProgressText}</p>
        {actions}
      </div>
    </StatusAlert>
  );
};
InProgressState.defaultProps = {
  inProgressText: null,
  actions: null,
};
InProgressState.propTypes = {
  inProgressText: PropTypes.node,
  actions: PropTypes.arrayOf(PropTypes.node),
  title: PropTypes.node.isRequired,
};

export default InProgressState;
