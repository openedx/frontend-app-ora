import React, { useEffect } from 'react';

import XBlockStudioViewProvider from './components/XBlockStudioViewProvider';
import StudioSchedule from './components/StudioSchedule';
import StudioViewSteps from './components/StudioViewSteps';
import StudioViewSettings from './components/StudioViewSettings';
import StudioViewRubric from './components/StudioViewRubric';
import StudioViewTitle from './components/StudioViewTitle';
import StudioViewPrompt from './components/StudioViewPrompt';

import './index.scss';

export const XBlockStudioView = () => {
  useEffect(() => {
    if (window.parent.length > 0) {
      new ResizeObserver(() => {
        window.parent.postMessage({ type: 'plugin.resize', payload: { height: document.body.scrollHeight } }, document.referrer);
      }).observe(document.body);
    }
  }, []);

  return (
    <XBlockStudioViewProvider>
      <div id="ora-xblock-studio-view">
        <StudioViewTitle />
        <StudioViewPrompt />
        <StudioSchedule />
        <StudioViewSteps />
        <StudioViewSettings />
        <StudioViewRubric />
      </div>
    </XBlockStudioViewProvider>
  );
};

export default XBlockStudioView;
