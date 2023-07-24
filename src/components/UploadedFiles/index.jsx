import React from 'react';

import {
  useSubmissionConfig,
  useSubmissionTeamInfo,
  useSubmissionStatus,
  useSubmissionResponse,
} from 'data/services/lms/hooks/selectors';

export const UploadedFiles = () => {
  const config = useSubmissionConfig().fileResponseConfig;
  const files = useSubmissionResponse().uploadedFiles;
  const submissionStatus = useSubmissionStatus();
  const teamInfo = useSubmissionTeamInfo();
  console.log({
    TextResponse: {
      config,
      files,
      submissionStatus,
      teamInfo,
    },
  });
  return (
    <div>
      <h1>UploadedFiles</h1>
    </div>
  );
};

export default UploadedFiles;
