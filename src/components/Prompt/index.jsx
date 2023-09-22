import React from 'react';
import PropTypes from 'prop-types';

import { Collapsible } from '@edx/paragon';

import usePromptHooks from './hooks';

const Prompt = ({ prompt }) => {
  const { open, toggleOpen } = usePromptHooks();
  return (
    <Collapsible title={open ? '' : 'Review the prompt'} open={open} onToggle={toggleOpen}>
      <div dangerouslySetInnerHTML={{ __html: prompt }} />
    </Collapsible>
  );
};

Prompt.propTypes = {
  prompt: PropTypes.string.isRequired,
};

export default Prompt;
