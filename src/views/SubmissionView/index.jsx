import React from 'react';

import { FullscreenModal } from '@edx/paragon';

import SubmissionContentLayout from './SubmissionContentLayout';
import SubmissionActions from './SubmissionActions';
import useSubmissionViewData from './hooks';

export const SubmissionView = () => {
  const {
    submission,
    oraConfigData,
    onFileUploaded,
    onTextResponseChange,
    submitResponseHandler,
    submitResponseStatus,
  } = useSubmissionViewData();

  return (
    <FullscreenModal
      isOpen
      onClose={() => ({})}
      title="ORA Submission"
      modalBodyClassName="content-body"
      footerNode={(
        <SubmissionActions
          submitResponseHandler={submitResponseHandler}
          submitResponseStatus={submitResponseStatus}
        />
      )}
    >
      <SubmissionContentLayout
        submission={submission}
        oraConfigData={oraConfigData}
        onTextResponseChange={onTextResponseChange}
        onFileUploaded={onFileUploaded}
      />
    </FullscreenModal>
  );
};

export default SubmissionView;
