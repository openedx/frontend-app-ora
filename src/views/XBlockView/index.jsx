import React, { useEffect } from 'react';

import { usePrompts } from 'hooks/app';

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

  useEffect(() => {
    if (window.parent.length > 0) {
      window.parent.postMessage({ type: 'plugin.resize', payload: { height: document.body.scrollHeight } }, document.referrer);
    }
  }, []);

  return (
    <div id="ora-xblock-view">
      <h1>Open Response Assessment</h1>
      <ProgressBar />
      <StatusRow />
      <StatusAlert />
      <Instructions />
      <Actions />
      {prompts.map(prompt => <Prompt key={prompt} prompt={prompt} />)}
      <Rubric isCollapsible />
      <Actions />
    </div>
  );
};

export default XBlockView;
