import React from 'react';
import PropTypes from 'prop-types';

import { Collapsible } from '@edx/paragon';

export const Prompt = ({ prompt }) => {
  const [open, setOpen] = React.useState(true);
  return (
    <Collapsible title={open ? '' : 'Review the prompt'} open={open} onToggle={() => setOpen(!open)}>
      <div dangerouslySetInnerHTML={{ __html: prompt }} />
    </Collapsible>
  );
};

Prompt.propTypes = {
  prompt: PropTypes.string.isRequired,
};

export default Prompt;
