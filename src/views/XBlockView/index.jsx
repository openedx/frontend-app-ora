import React, { useEffect } from 'react';

import {
  useORAConfigData,
  usePrompts,
  useRubricConfig,
  useGlobalState,
} from 'hooks/app';

import ProgressBar from 'components/ProgressBar';
import Prompt from 'components/Prompt';
// eslint-disable-next-line import/no-named-as-default
import Rubric from 'components/Rubric';
import Instructions from 'components/Instructions';
import StatusAlert from 'components/StatusAlert';
import HotjarSurvey from 'components/HotjarSurvey';

import StatusRow from './StatusRow';
import Actions from './Actions';

import './index.scss';

const XBlockView = () => {
  const { title } = useORAConfigData();
  const prompts = usePrompts();
  const rubricConfig = useRubricConfig();

  const { stepIsUnavailable } = useGlobalState();

  useEffect(() => {
    if (window.parent.length > 0) {
      new ResizeObserver(() => {
        window.parent.postMessage(
          {
            type: 'plugin.resize',
            payload: { height: document.body.scrollHeight },
          },
          document.referrer,
        );
      }).observe(document.body);
    }
  }, []);

  return (
    <div id="ora-xblock-view">
      <h3>{title}</h3>
      <ProgressBar />
      <StatusRow />
      <StatusAlert />
      <HotjarSurvey />
      <Instructions />
      <Actions />
      {!stepIsUnavailable && (
        <>
          {prompts.map((prompt) => (
            <Prompt key={prompt} prompt={prompt} />
          ))}
          {rubricConfig.showDuringResponse && <Rubric isCollapsible />}
        </>
      )}
    </div>
  );
};

export default XBlockView;
