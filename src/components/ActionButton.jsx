import React from 'react';
import PropTypes from 'prop-types';

import { Button, StatefulButton } from '@edx/paragon';

import { MutationStatus } from 'constants';

export const disabledStates = [MutationStatus.loading];

const ActionButton = (props) => (
  props.state
    ? <StatefulButton {...props} disabledStates={disabledStates} />
    : <Button {...props} />
);
ActionButton.defaultProps = {
  state: null,
};
ActionButton.propTypes = {
  state: PropTypes.string,
};

export default ActionButton;
