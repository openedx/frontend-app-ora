import React from 'react';
import PropTypes from 'prop-types';

import {
  Button,
  Skeleton,
  StatefulButton,
} from '@edx/paragon';

import { MutationStatus } from 'constants';
import { useIsPageDataLoading } from 'hooks/app';
import useModalActionConfig from './hooks/useModalActionConfig';

const className = 'w-100';
const disabledStates = [MutationStatus.loading];

const ModalActions = ({ options }) => {
  const actions = useModalActionConfig({ options });
  const isPageDataLoading = useIsPageDataLoading();
  const { primary, secondary } = actions || {};

  const actionButton = (variant, btnProps) => (btnProps.state
    ? <StatefulButton {...btnProps} {...{ className, disabledStates, variant }} />
    : <Button {...btnProps} {...{ className, variant }} />);

  const customWrapper = ({ children }) => (
    <div className="w-100 h-100">
      {children}
    </div>
  );

  if (isPageDataLoading) {
    return (<Skeleton wrapper={customWrapper} />);
  }

  return (
    <div>
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
