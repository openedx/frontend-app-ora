import React from 'react';
import PropTypes from 'prop-types';

import { useIntl } from '@edx/frontend-platform/i18n';
import { Badge } from '@edx/paragon';
import { CheckCircle, Info, WarningFilled } from '@edx/paragon/icons';

import messages from './messages';

export const propsByStatus = {
  success: {
    variant: 'success',
    badgeMessage: messages.successBadge,
  },
  danger: {
    variant: 'danger',
    badgeMessage: messages.errorBadge,
  },
  cancelled: {
    variant: 'warning',
    badgeMessage: messages.cancelledBadge,
  },
  default: {
    variant: 'dark',
    badgeMessage: messages.inProgressBadge,
  },
};

const StatusAlert = ({
  status,
}) => {
  const { variant, badgeMessage } = alertMap[status];
  const { formatMessage } = useIntl();
  return (<Badge variant={variant}>{formatMessage(badgeMessage)}</Badge>);
};

StatusAlert.propTypes = {
  status: PropTypes.string.isRequired,
};

export default StatusAlert;
