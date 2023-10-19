import React from 'react';
import PropTypes from 'prop-types';

import { stepStates } from 'data/services/lms/constants';
import { useStepState } from 'data/services/lms/hooks/selectors';

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
