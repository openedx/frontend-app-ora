import React from 'react';

import PropTypes from 'prop-types';

import {
  Alert,
  Skeleton,
} from '@edx/paragon';
import ActionButton from 'components/ActionButton';
import { useIsPageDataLoading } from 'hooks/app';
import useStatusAlertData from './hooks/useStatusAlertData';

import './index.scss';

const StatusAlert = ({
  hasSubmitted,
  step,
  showTrainingError,
}) => {
  const isPageDataLoading = useIsPageDataLoading();
  const alerts = useStatusAlertData({ hasSubmitted, step, showTrainingError });
  const customWrapper = ({ children }) => (
    <div className="w-100 h-100">
      {children}
    </div>
  );

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [hasSubmitted, step, showTrainingError]);

  if (isPageDataLoading) {
    return (<Skeleton wrapper={customWrapper} />);
  }

  return alerts.map(({
    variant,
    icon,
    heading,
    message,
    actions = [],
  }) => (
    <Alert
      key={message}
      variant={variant}
      icon={icon}
      className="ora-status-alert"
      actions={actions.map(action => <ActionButton {...action} />)}
    >
      <Alert.Heading>{heading}</Alert.Heading>
      <p>{message}</p>
    </Alert>
  ));
};
StatusAlert.defaultProps = {
  hasSubmitted: false,
  step: null,
  showTrainingError: false,
};
StatusAlert.propTypes = {
  hasSubmitted: PropTypes.bool,
  step: PropTypes.string,
  showTrainingError: PropTypes.bool,
};

export default StatusAlert;
