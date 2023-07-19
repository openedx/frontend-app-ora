import React from 'react';
import { useORAConfigData, useSubmissionData } from 'data/services/lms/hooks/selectors';

export const AssessmentView = () => {
  const configData = useORAConfigData();
  const submissionData = useSubmissionData();
  console.log({
    configData,
    submissionData,
  });
  return (
    <h1>Assessment</h1>
  );
};

export default AssessmentView;
