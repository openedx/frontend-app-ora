import React from 'react';

import ProgressBar from 'components/ProgressBar';
import { useIsORAConfigLoaded } from 'data/services/lms/hooks/selectors';

import AssessmentContentLayout from './AssessmentContentLayout';
import AssessmentActions from './AssessmentActions';

export const StudentTrainingView = () => {
  const isORAConfigLoaded = useIsORAConfigLoaded();
  return (
    <>
      <ProgressBar />
      {isORAConfigLoaded && (<AssessmentContentLayout />)}
      <AssessmentActions />
    </>
  );
};

export default StudentTrainingView;
