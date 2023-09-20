import React from 'react';

import { useIsORAConfigLoaded } from 'data/services/lms/hooks/selectors';

import AssessmentContentLayout from './AssessmentContentLayout';
import AssessmentActions from './AssessmentActions';

export const PeerAssessmentView = () => {
  const isORAConfigLoaded = useIsORAConfigLoaded();
  return (
    <>
      {isORAConfigLoaded && (<AssessmentContentLayout />)}
      <AssessmentActions />
    </>
  );
};

export default PeerAssessmentView;
