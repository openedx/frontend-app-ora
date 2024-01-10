import React from 'react';
import PropTypes from 'prop-types';

import { Skeleton } from '@edx/paragon';

import ActionButton from 'components/ActionButton';
import ConfirmDialog from 'components/ConfirmDialog';

import { useIsPageDataLoading } from 'hooks/app';

import useModalActionConfig from './hooks/useModalActionConfig';

const ModalActions = ({ options }) => {
  const actions = useModalActionConfig({ options });
  const isPageDataLoading = useIsPageDataLoading();
  const { primary, secondary } = actions || {};

  const actionButton = (variant, btnProps) => (
    <ActionButton key={variant} {...{ ...btnProps, variant }} />
  );

  const customWrapper = ({ children }) => (
    <div className="w-100 h-100">
      {children}
    </div>
  );

  if (isPageDataLoading) {
    return (<Skeleton className="mt-2" wrapper={customWrapper} />);
  }

  const renderedActions = [];
  if (secondary) {
    if (secondary.confirmProps) {
      renderedActions.push(actionButton('outline-primary', secondary.action));
      renderedActions.push(<ConfirmDialog key="confirm-primary" {...secondary.confirmProps} />);
    } else {
      renderedActions.push(actionButton('outline-primary', secondary.action));
    }
  }
  if (primary) {
    if (primary.confirmProps) {
      renderedActions.push(actionButton('primary', primary.action));
      renderedActions.push(<ConfirmDialog key="confirm-primary" {...primary.confirmProps} />);
    } else {
      renderedActions.push(actionButton('primary', primary.action));
    }
  }

  return (
    <div className="mt-2">
      {renderedActions}
    </div>
  );
};
ModalActions.defaultProps = {
  options: {},
};
ModalActions.propTypes = {
  options: PropTypes.shape({
    save: PropTypes.func,
    saveStatus: PropTypes.string,
    submit: PropTypes.func,
    submitStatus: PropTypes.string,
  }),
};
export default ModalActions;
