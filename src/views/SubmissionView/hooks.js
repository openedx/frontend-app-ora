import { useEffect, useReducer } from 'react';

import { useORAConfigData, usePageData } from 'data/services/lms/hooks/selectors';

import {
  submitResponse, saveResponse, uploadFiles, deleteFile,
} from 'data/services/lms/hooks/actions';
import { MutationStatus } from 'data/services/lms/constants';

const useSubmissionViewHooks = () => {
  const submitResponseMutation = submitResponse();
  const saveResponseMutation = saveResponse();
  const uploadFilesMutation = uploadFiles();
  const deleteFileMutation = deleteFile();
  const pageData = usePageData();
  const oraConfigData = useORAConfigData();

  const [submission, dispatchSubmission] = useReducer(
    (state, payload) => ({ ...state, isDirty: true, ...payload }),
    { ...pageData?.submission, isDirty: false },
  );

  useEffect(() => {
    // a workaround to update the submission state when the pageData changes
    if (pageData?.submission) {
      dispatchSubmission({ ...pageData.submission, isDirty: false });
    }
  }, [pageData?.submission]);

  const onTextResponseChange = (index) => (textResponse) => {
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

  const onFileUploaded = uploadFilesMutation.mutate;

  const onDeletedFile = deleteFileMutation.mutate;

  const submitResponseHandler = () => {
    dispatchSubmission({ isDirty: false });
    submitResponseMutation.mutate(submission);
  };

  const saveResponseHandler = () => {
    dispatchSubmission({ isDirty: false });
    saveResponseMutation.mutate(submission);
  };

  return {
    submitResponseHandler,
    submitResponseStatus: submitResponseMutation.status,
    saveResponseHandler,
    saveResponseStatus: saveResponseMutation.status,
    draftSaved: saveResponseMutation.status === MutationStatus.success && !submission.isDirty,
    pageData,
    oraConfigData,
    submission,
    dispatchSubmission,
    onTextResponseChange,
    onFileUploaded,
    onDeletedFile,
  };
};

export default useSubmissionViewHooks;
