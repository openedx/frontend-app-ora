import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { Button, StatefulButton } from '@edx/paragon';

import { MutationStatus } from 'constants/index';

export const disabledStates = [MutationStatus.loading];

export const baseClassName = 'w-100 mt-2';
const ActionButton = (props) => {
  const className = classNames(baseClassName, props.className);
  if (!props.onClick && !props.href) {
    return null;
  }
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
  state: undefined,
  className: undefined,
  onClick: undefined,
  href: undefined,
};

ActionButton.propTypes = {
  onClick: PropTypes.func,
  state: PropTypes.string,
  className: PropTypes.string,
  href: PropTypes.string,
};

export default ActionButton;
