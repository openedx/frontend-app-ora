import React from 'react';

import {
  useORAConfigData,
  usePageData,
} from 'data/services/lms/hooks/selectors';

import { submitResponse } from 'data/services/lms/hooks/actions';

const useSubmissionViewData = () => {
  const submitResponseMutation = submitResponse();
  const pageData = usePageData();
  const oraConfigData = useORAConfigData();

  const [submission, dispatchSubmission] = React.useReducer(
    (state, payload) => ({ ...state, ...payload }),
    { ...pageData?.submission },
  );

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

  const onFileUploaded = (uploadedFiles) => {
    dispatchSubmission({ response: { ...submission.response, uploadedFiles } });
  };

  const submitResponseHandler = () => {
    submitResponseMutation.mutate(submission);
  };

  return {
    submitResponseHandler,
    submitResponseStatus: submitResponseMutation.status,
    pageData,
    oraConfigData,
    submission,
    dispatchSubmission,
    onTextResponseChange,
    onFileUploaded,
  };
};

export default useSubmissionViewData;
