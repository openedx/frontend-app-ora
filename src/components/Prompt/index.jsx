import React from 'react';
import PropTypes from 'prop-types';

import { Collapsible } from '@edx/paragon';

import usePromptHooks from './hooks';

const Prompt = ({ prompt, defaultOpen }) => {
  const { open, toggleOpen } = usePromptHooks({ defaultOpen });
  return (
    <Collapsible title={open ? '' : 'Review the prompt'} open={open} onToggle={toggleOpen}>
      <div dangerouslySetInnerHTML={{ __html: prompt }} />
    </Collapsible>
  );
};

Prompt.defaultProps = {
  defaultOpen: true,
};

Prompt.propTypes = {
  defaultOpen: PropTypes.bool,
  prompt: PropTypes.string.isRequired,
};

export default Prompt;
