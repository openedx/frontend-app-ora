import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { Button, StatefulButton } from '@edx/paragon';

import { MutationStatus } from 'constants/index';

export const disabledStates = [MutationStatus.loading];

export const baseClassName = 'w-100 mt-2';
const ActionButton = (props) => {
  const className = classNames(baseClassName, props.className);
  return props.state
    ? (
      <StatefulButton
        {...props}
        className={className}
        disabledStates={disabledStates}
      />
    ) : (
      <Button {...props} className={className} />
    );
};
ActionButton.defaultProps = {
  state: null,
  className: '',
};

ActionButton.propTypes = {
  state: PropTypes.string,
  className: PropTypes.string,
};

export default ActionButton;
