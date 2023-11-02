import { useCallback } from 'react';

import { useStepState, useRubricConfig } from 'data/services/lms/hooks/selectors';
import { useSubmitResponse } from 'data/services/lms/hooks/actions';
import { stepNames } from 'data/services/lms/constants';

import useTextResponsesData from './useTextResponsesData';
import useUploadedFilesData from './useUploadedFilesData';

const useSubmissionViewData = () => {
  const submitResponseMutation = useSubmitResponse();
  const rubricConfig = useRubricConfig();

  const {
    textResponses,
    onUpdateTextResponse,
    isDraftSaved,
    saveResponse,
    saveResponseStatus,
  } = useTextResponsesData();
  const {
    uploadedFiles,
    onFileUploaded,
    onDeletedFile,
  } = useUploadedFilesData();

  const submitResponseHandler = useCallback(() => {
    submitResponseMutation.mutate({ textResponses, uploadedFiles });
  }, [submitResponseMutation, textResponses, uploadedFiles]);

  return {
    actionOptions: {
      saveResponse,
      saveResponseStatus,
      submit: submitResponseHandler,
      submitStatus: submitResponseMutation.status,
    },
    textResponses,
    onUpdateTextResponse,
    isDraftSaved,
    uploadedFiles,
    onDeletedFile,
    onFileUploaded,
    showRubric: rubricConfig.showDuringResponse,
  };
};

export default useSubmissionViewData;
