import React from 'react';

import { FullscreenModal } from '@edx/paragon';

import { useIsORAConfigLoaded, usePageData } from 'data/services/lms/hooks/selectors';

import AssessmentContentLayout from './AssessmentContentLayout';
import AssessmentActions from './AssessmentActions';

export const AssessmentView = () => {
  const isORAConfigLoaded = useIsORAConfigLoaded();
  const pageData = usePageData();
  console.log({ pageData });
  // const submissionData = useSubmissionData();
  return (
    <FullscreenModal
      isOpen
      onClose={() => ({})}
      title="ORA Assessment"
      modalBodyClassName="content-body"
    >
      {isORAConfigLoaded && (<AssessmentContentLayout />)}
      <AssessmentActions />
    </FullscreenModal>
  );
};

export default AssessmentView;
