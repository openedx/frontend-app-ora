import React from 'react';

import { useIsORAConfigLoaded } from 'data/services/lms/hooks/selectors';
import ProgressBar from 'components/ProgressBar';

import AssessmentContentLayout from './AssessmentContentLayout';
import AssessmentActions from './AssessmentActions';

export const PeerAssessmentView = () => {
  const isORAConfigLoaded = useIsORAConfigLoaded();
  return (
    <>
      <ProgressBar />
      {isORAConfigLoaded && (<AssessmentContentLayout />)}
      <AssessmentActions />
    </>
  );
};

export default PeerAssessmentView;
