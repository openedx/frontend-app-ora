import React from 'react';
import PropTypes from 'prop-types';

import { Button, StatefulButton } from '@edx/paragon';

import { MutationStatus } from 'data/services/lms/constants';
import { useCloseModal } from 'hooks';

const ModalActions = (props) => {
  // const { secondary } = props;
  const closeModal = useCloseModal();
  const { primary } = props;
  const secondary = props.secondary && {
    ...props.secondary,
    onClick: closeModal,
  };
  const className = 'w-100';
  const disabledStates = [MutationStatus.loading];
  console.log(props);
  const genButton = (variant, btnProps) => (btnProps.state
    ? <StatefulButton {...btnProps} {...{ className, disabledStates, variant }} />
    : <Button {...btnProps} {...{ className, variant }} />);

  return (
    <div>
      {secondary && genButton('outline-primary', secondary)}
      {primary && genButton('primary', primary)}
    </div>
  );
};
const actionProps = PropTypes.shape({
  onClick: PropTypes.func,
  state: PropTypes.string,
  disabledStates: PropTypes.arrayOf(PropTypes.string),
  labels: PropTypes.objectOf(PropTypes.node),
});
ModalActions.defaultProps = {
  secondary: null,
  primary: null,
};
ModalActions.propTypes = {
  secondary: actionProps,
  primary: actionProps,
};
export default ModalActions;
