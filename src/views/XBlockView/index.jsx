import React from 'react';

import { usePrompts } from 'data/services/lms/hooks/selectors';

import ProgressBar from 'components/ProgressBar';
import Prompt from 'components/Prompt';
import Rubric from 'components/Rubric';
import Instructions from 'components/Instructions';
import StatusAlert from 'components/StatusAlert';

import StatusRow from './StatusRow';
import Actions from './Actions';

import './index.scss';

export const XBlockView = () => {
  const prompts = usePrompts();
  return (
    <div id="ora-xblock-view">
      <h1>Open Response Assessment</h1>
      <ProgressBar />
      <StatusRow />
      <StatusAlert />
      <Instructions />
      <Actions />
      {prompts.map(prompt => <Prompt key={prompt} prompt={prompt} />)}
      <Rubric />
      <Actions />
    </div>
  );
};

export default XBlockView;
