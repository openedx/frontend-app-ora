import React from 'react';
import { Badge } from '@edx/paragon';
import { useIntl } from '@edx/frontend-platform/i18n';

import useBadgeConfig from './useBadgeConfig';

const StatusBadge = () => {
  const { formatMessage } = useIntl();
  const { variant, message } = useBadgeConfig();
  return <Badge variant={variant}>{formatMessage(message)}</Badge>;
};

export default StatusBadge;
