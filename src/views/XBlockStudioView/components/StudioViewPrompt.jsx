import React from 'react';

import { useIntl } from '@edx/frontend-platform/i18n';

import { usePrompts } from 'hooks/app';
import Prompt from 'components/Prompt';

import { useXBlockStudioViewContext } from './XBlockStudioViewProvider';
import messages from './messages';

const StudioViewPrompt = () => {
  const { formatMessage } = useIntl();
  const prompts = usePrompts();

  const { promptIsOpen, togglePrompt } = useXBlockStudioViewContext();

  return (
    <>
      {prompts.map((prompt, index) => (
        <Prompt
          key={prompt}
          prompt={prompt}
          title={`${formatMessage(messages.promptHeader)} ${index + 1}`}
          open={promptIsOpen}
          onToggle={togglePrompt}
        />
      ))}
    </>
  );
};

export default StudioViewPrompt;
