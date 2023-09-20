import React from 'react';

import SubmissionContentLayout from './SubmissionContentLayout';
import SubmissionActions from './SubmissionActions';
import useSubmissionViewHooks from './hooks';

export const SubmissionView = () => {
  const {
    submission,
    oraConfigData,
    onFileUploaded,
    onTextResponseChange,
    submitResponseHandler,
    submitResponseStatus,
    saveResponseHandler,
    saveResponseStatus,
    draftSaved,
  } = useSubmissionViewHooks();
  return (
    <>
      <SubmissionContentLayout
        submission={submission}
        oraConfigData={oraConfigData}
        onTextResponseChange={onTextResponseChange}
        onFileUploaded={onFileUploaded}
        draftSaved={draftSaved}
      />
      <SubmissionActions
        submitResponseHandler={submitResponseHandler}
        submitResponseStatus={submitResponseStatus}
        saveResponseHandler={saveResponseHandler}
        saveResponseStatus={saveResponseStatus}
      />
    </>
  );
};

export default SubmissionView;
