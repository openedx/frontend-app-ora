import React from 'react';

import { FullscreenModal } from '@edx/paragon';

import { useORAConfigData, useSubmissionData } from 'data/services/lms/hooks/selectors';

import SubmissionContentLayout from './SubmissionContentLayout';
import SubmissionActions from './SubmissionActions';

export const SubmissionView = () => {
  const configData = useORAConfigData();
  const submissionData = useSubmissionData();
  return (
    <FullscreenModal
      isOpen
      onClose={() => ({})}
      title="ORA Submission"
      modalBodyClassName="content-body"
    >
      {configData && (<SubmissionContentLayout />)}
      <SubmissionActions />
    </FullscreenModal>
  );
};

export default SubmissionView;
