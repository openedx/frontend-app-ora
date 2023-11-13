import React from 'react';
import PropTypes from 'prop-types';

import { stepStates } from 'constants';
import { useStepState } from 'hooks/app';

import useInstructionsMessage from './useInstructionsMessage';

const Instructions = ({ step }) => {
  const message = useInstructionsMessage(step);
  const stepState = useStepState({ step });
  if (stepState !== stepStates.inProgress) {
    return null;
  }
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
