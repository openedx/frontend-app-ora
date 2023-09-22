import React, { useEffect } from 'react';

import {
  useORAConfigData,
  usePageData,
} from 'data/services/lms/hooks/selectors';

import { submitResponse, saveResponseForLater, uploadFiles } from 'data/services/lms/hooks/actions';
import { MutationStatus } from 'data/services/lms/constants';

const useSubmissionViewHooks = () => {
  const submitResponseMutation = submitResponse();
  const saveResponseForLaterMutation = saveResponseForLater();
  const uploadFilesMutation = uploadFiles();
  const pageData = usePageData();
  const oraConfigData = useORAConfigData();

  const [submission, dispatchSubmission] = React.useReducer(
    (state, payload) => ({ ...state, isDirty: true, ...payload }),
    { ...pageData?.submission, isDirty: false },
  );

  useEffect(() => {
    // a workaround to update the submission state when the pageData changes
    if (pageData?.submission) {
      dispatchSubmission({ ...pageData.submission, isDirty: false });
    }
  }, [pageData?.submission]);

  const onTextResponseChange = (textResponse, index) => {
    dispatchSubmission({
      response: {
        ...submission.response,
        textResponses: [
          ...submission.response.textResponses.slice(0, index),
          textResponse,
          ...submission.response.textResponses.slice(index + 1),
        ],
      },
    });
  };

  const onFileUploaded = (args) => {
    const fileUploads = uploadFilesMutation.mutate(args);
    dispatchSubmission({ response: { ...submission.response, fileUploads } });
  };

  const submitResponseHandler = () => {
    dispatchSubmission({ isDirty: false });
    submitResponseMutation.mutate(submission);
  };

  const saveResponseForLaterHandler = () => {
    dispatchSubmission({ isDirty: false });
    saveResponseForLaterMutation.mutate(submission);
  };

  return {
    submitResponseHandler,
    submitResponseStatus: submitResponseMutation.status,
    saveResponseForLaterHandler,
    saveResponseForLaterStatus: saveResponseForLaterMutation.status,
    draftSaved: saveResponseForLaterMutation.status === MutationStatus.success && !submission.isDirty,
    pageData,
    oraConfigData,
    submission,
    dispatchSubmission,
    onTextResponseChange,
    onFileUploaded,
  };
};

export default useSubmissionViewHooks;
