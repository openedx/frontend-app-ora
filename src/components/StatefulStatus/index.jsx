import React from 'react';
import PropTypes from 'prop-types';

import { Alert, Badge } from '@edx/paragon';
import { CheckCircle, Info, WarningFilled } from '@edx/paragon/icons';

const alertMap = {
  success: {
    variant: 'success',
    icon: CheckCircle,
  },
  error: {
    variant: 'danger',
    icon: Info,
  },
  cancelled: {
    variant: 'warning',
    icon: WarningFilled,
  },
  default: {
    variant: 'dark',
    icon: null,
  },
};

export const statefulStates = Object.keys(alertMap);

const StatefulStatus = ({ state, status }) => {
  const { headerText, badgeText, content } = status[state];

  const { variant, icon } = alertMap[state];

  return (
    <>
      <Badge variant={variant}>{badgeText}</Badge>
      <span className="ml-2">{headerText}</span>
      {state !== 'default' ? (
        <Alert variant={variant} icon={icon}>
          {content}
        </Alert>
      ) : (
        content
      )}
    </>
  );
};

const statusProps = PropTypes.shape({
  badgeText: PropTypes.string.isRequired,
  headerText: PropTypes.string.isRequired,
  content: PropTypes.node,
});

StatefulStatus.propTypes = {
  state: PropTypes.oneOf(statefulStates)
    .isRequired,
  status: PropTypes.objectOf(statusProps).isRequired,
};

export default StatefulStatus;
