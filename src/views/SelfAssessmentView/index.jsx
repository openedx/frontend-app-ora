import React from 'react';

import ProgressBar from 'components/ProgressBar';

import AssessmentContentLayout from './AssessmentContentLayout';
import useAssessmentViewHooks from './hooks';

export const AssessmentView = () => {
  const { submission, oraConfigData } = useAssessmentViewHooks();
  return (
    <>
      <ProgressBar />
      <AssessmentContentLayout
        submission={submission}
        oraConfigData={oraConfigData}
      />
    </>
  );
};

export default AssessmentView;
