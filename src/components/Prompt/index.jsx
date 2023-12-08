import React from 'react';
import PropTypes from 'prop-types';

import { useIntl } from '@edx/frontend-platform/i18n';
import { Collapsible } from '@edx/paragon';

import { useViewStep } from 'hooks/routing';

import messages from './messages';
import usePromptHooks from './hooks';

const Prompt = ({ prompt, defaultOpen }) => {
  const { open, toggleOpen } = usePromptHooks({ defaultOpen });
  const { formatMessage } = useIntl();
  const message = messages[useViewStep()];
  const title = message ? formatMessage(message) : '';
  return (
    <Collapsible title={(<h3>{title}</h3>)} open={open} onToggle={toggleOpen}>
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
