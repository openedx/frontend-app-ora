import React from 'react';

import ProgressBar from 'components/ProgressBar';
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
    onDeletedFile,
  } = useSubmissionViewHooks();
  return (
    <>
      <ProgressBar />
      <SubmissionContentLayout
        submission={submission}
        oraConfigData={oraConfigData}
        onTextResponseChange={onTextResponseChange}
        onFileUploaded={onFileUploaded}
        onDeletedFile={onDeletedFile}
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
