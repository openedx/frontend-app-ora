import React, { useEffect } from 'react';

import { usePrompts, useRubricConfig } from 'hooks/app';

import ProgressBar from 'components/ProgressBar';
import Prompt from 'components/Prompt';
import Rubric from 'components/Rubric';
import Instructions from 'components/Instructions';
import StatusAlert from 'components/StatusAlert';
import HotjarSurvey from 'components/HotjarSurvey'

import StatusRow from './StatusRow';
import Actions from './Actions';

import './index.scss';

export const XBlockView = () => {
  const prompts = usePrompts();
  const rubricConfig = useRubricConfig();

  useEffect(() => {
    if (window.parent.length > 0) {
      new ResizeObserver(() => {
        window.parent.postMessage({ type: 'plugin.resize', payload: { height: document.body.scrollHeight } }, document.referrer);
      }).observe(document.body);
    }
  }, []);

  return (
    <div id="ora-xblock-view">
      <h1>Open Response Assessment</h1>
      <ProgressBar />
      <StatusRow />
      <StatusAlert />
      <HotjarSurvey/>
      <Instructions />
      <Actions />
      {prompts.map(prompt => <Prompt key={prompt} prompt={prompt} />)}
      {rubricConfig.showDuringResponse && <Rubric isCollapsible />}
    </div>
  );
};

export default XBlockView;
