import React from 'react';

import { FullscreenModal, Spinner } from '@edx/paragon';

import {
  // useORAConfigData,
  useIsORAConfigLoaded,
  useIsPageDataLoaded,
  // usePageData,
} from 'data/services/lms/hooks/selectors';

import SubmissionContentLayout from './SubmissionContentLayout';
import SubmissionActions from './SubmissionActions';

export const SubmissionView = () => {
  const isConfigLoaded = useIsORAConfigLoaded();
  const isPageLoaded = useIsPageDataLoaded();

  if (!isConfigLoaded || !isPageLoaded) {
    return (
      <div className="h-screen d-flex justify-content-center align-items-center">
        <Spinner
          animation="border"
          variant="primary"
          className="mr-3 spinner-md"
          screenReaderText="loading"
        />
      </div>
    );
  }

  return (
    <FullscreenModal
      isOpen
      onClose={() => ({})}
      title="ORA Submission"
      modalBodyClassName="content-body"
    >
      <SubmissionContentLayout />
      <SubmissionActions />
    </FullscreenModal>
  );
};

export default SubmissionView;
