import React from 'react';

import { useIsORAConfigLoaded } from 'data/services/lms/hooks/selectors';

import AssessmentContentLayout from './AssessmentContentLayout';
import AssessmentActions from './AssessmentActions';

export const StudentTrainingView = () => {
  const isORAConfigLoaded = useIsORAConfigLoaded();
  return (
    <>
      {isORAConfigLoaded && (<AssessmentContentLayout />)}
      <AssessmentActions />
    </>
  );
};

export default StudentTrainingView;
