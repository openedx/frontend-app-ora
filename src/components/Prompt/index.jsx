import React from 'react';
import PropTypes from 'prop-types';

import { useORAConfigData } from 'data/services/lms/hooks/selectors';

export const Prompt = ({ promptIndex }) => {
  const { prompts } = useORAConfigData();
  return (
    <div className="m-1 p-1">
      <h3>Prompt {promptIndex + 1}</h3>
      <div dangerouslySetInnerHTML={{ __html: prompts[promptIndex] }} />
    </div>
  );
};

Prompt.propTypes = {
  promptIndex: PropTypes.number.isRequired,
};

export default Prompt;
