import React from 'react';

import PropTypes from 'prop-types';

import {
  Alert,
  Skeleton,
} from '@openedx/paragon';
import ActionButton from 'components/ActionButton';
import { useIsPageDataLoading } from 'hooks/app';
import { useIsMounted } from 'hooks/utils';
import useStatusAlertData from './hooks/useStatusAlertData';

import './index.scss';

const StatusAlert = ({
  hasSubmitted,
  step,
}) => {
  const isMounted = useIsMounted();
  const isPageDataLoading = useIsPageDataLoading();
  const alerts = useStatusAlertData({ step });
  const customWrapper = ({ children }) => (
    <div className="w-100 h-100">
      {children}
    </div>
  );

  React.useEffect(() => {
    if (isMounted.current) {
      document.querySelector('html').scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    }
  }, [isMounted, hasSubmitted, step]);

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
};
StatusAlert.propTypes = {
  hasSubmitted: PropTypes.bool,
  step: PropTypes.string,
};

export default StatusAlert;
