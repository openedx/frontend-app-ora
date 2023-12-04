import React from 'react';
import PropTypes from 'prop-types';

import { Skeleton } from '@edx/paragon';

import ActionButton from 'components/ActionButton';
import { useIsPageDataLoading } from 'hooks/app';
import useModalActionConfig from './hooks/useModalActionConfig';

const className = 'w-100 mt-3';

const ModalActions = ({ options }) => {
  const actions = useModalActionConfig({ options });
  const isPageDataLoading = useIsPageDataLoading();
  const { primary, secondary } = actions || {};

  const actionButton = (variant, btnProps) => (
    <ActionButton {...{ ...btnProps, className, variant }} />
  );

  const customWrapper = ({ children }) => (
    <div className="w-100 h-100">
      {children}
    </div>
  );

  if (isPageDataLoading) {
    return (<Skeleton className="mt-2" wrapper={customWrapper} />);
  }

  return (
    <div className="mt-2">
      {secondary && actionButton('outline-primary', secondary)}
      {primary && actionButton('primary', primary)}
    </div>
  );
};
ModalActions.defaultProps = {
  options: {},
  step: null,
};
ModalActions.propTypes = {
  step: PropTypes.string,
  options: PropTypes.shape({
    save: PropTypes.func,
    saveStatus: PropTypes.string,
    submit: PropTypes.func,
    submitStatus: PropTypes.string,
  }),
};
export default ModalActions;
