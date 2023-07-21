import React from 'react';

import { FullscreenModal } from '@edx/paragon';

import { useORAConfigData, useSubmissionData } from 'data/services/lms/hooks/selectors';

import AssessmentContentLayout from './AssessmentContentLayout';
import AssessmentActions from './AssessmentActions';

export const AssessmentView = () => {
  const configData = useORAConfigData();
  const submissionData = useSubmissionData();
  return (
    <FullscreenModal
      isOpen
      onClose={() => ({})}
      title="ORA Assessment"
      modalBodyClassName="content-body"
    >
      {configData && (<AssessmentContentLayout />)}
      <AssessmentActions />
    </FullscreenModal>
  );
};

export default AssessmentView;
