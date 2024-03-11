import React from 'react';

import { usePrompts } from 'hooks/app';
import Prompt from 'components/Prompt';

import { useXBlockStudioViewContext } from './XBlockStudioViewProvider';

const StudioViewPrompt = () => {
  const prompts = usePrompts();

  const { promptIsOpen, togglePrompt } = useXBlockStudioViewContext();

  return (
    <>
      {prompts.map((prompt) => (
        <Prompt
          key={prompt}
          prompt={prompt}
          open={promptIsOpen}
          onToggle={togglePrompt}
        />
      ))}
    </>
  );
};

export default StudioViewPrompt;
