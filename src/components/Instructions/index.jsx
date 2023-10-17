import React from 'react';
import PropTypes from 'prop-types';

import useInstructionsMessage from './useInstructionsMessage';

const Instructions = ({ step }) => {
  const message = useInstructionsMessage(step);
  return (
    <div>
      <h2>Instructions</h2>
      {message}
    </div>
  );
};
Instructions.defaultProps = {
  step: null,
};
Instructions.propTypes = {
  step: PropTypes.string,
};
export default Instructions;
