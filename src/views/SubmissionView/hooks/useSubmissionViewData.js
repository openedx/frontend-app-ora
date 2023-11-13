import { useCallback } from 'react';

import {
  useGlobalState,
  useRubricConfig,
  useSubmitResponse,
  useSetHasSubmitted,
  useHasSubmitted,
} from 'hooks/app';
import { stepStates, stepNames } from 'constants';

import useTextResponsesData from './useTextResponsesData';
import useUploadedFilesData from './useUploadedFilesData';

const useSubmissionViewData = () => {
  const hasSubmitted = useHasSubmitted();
  const setHasSubmitted = useSetHasSubmitted();
  const submitResponseMutation = useSubmitResponse();
  const rubricConfig = useRubricConfig();
  const globalState = useGlobalState({ step: stepNames.submission });
  const stepState = hasSubmitted ? stepStates.submitted : globalState.stepState;

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
    submitResponseMutation.mutateAsync({
      textResponses,
      uploadedFiles,
    }).then(() => {
      setHasSubmitted(true);
    });
  }, [setHasSubmitted, submitResponseMutation, textResponses, uploadedFiles]);

  return {
    actionOptions: {
      saveResponse,
      saveResponseStatus,
      submit: submitResponseHandler,
      submitStatus: submitResponseMutation.status,
      hasSubmitted,
    },
    hasSubmitted,
    textResponses,
    onUpdateTextResponse,
    isDraftSaved,
    uploadedFiles,
    onDeletedFile,
    onFileUploaded,
    showRubric: rubricConfig.showDuringResponse,
    isReadOnly: stepState === stepStates.done || hasSubmitted,
  };
};

export default useSubmissionViewData;
