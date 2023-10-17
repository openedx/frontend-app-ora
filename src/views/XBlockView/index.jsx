import React from 'react';

import { usePrompts } from 'data/services/lms/hooks/selectors';

import ProgressBar from 'components/ProgressBar';
import Prompt from 'components/Prompt';
import Rubric from 'components/Rubric';
import Instructions from 'components/Instructions';
import StatusAlert from 'components/StatusAlert';

import StatusRow from './StatusRow';

export const XBlockView = () => {
  const prompts = usePrompts();
  return (
    <div>
      <h1>Open Response Assessment</h1>
      <ProgressBar />
      <StatusRow />
      <StatusAlert />
      <Instructions />
      <div style={{ border: '2px solid black' }}>Actions</div>
      {prompts.map(prompt => <Prompt key={prompt} prompt={prompt} />)}
      <Rubric />
    </div>
  );
};

export default XBlockView;
