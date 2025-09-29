import { useState, useCallback } from 'react';
import {
  useGlobalState,
  useRubricConfig,
  useSubmitResponse,
  useSetHasSubmitted,
  useHasSubmitted,
  useRefreshPageData,
  useSetResponse,
  useResponse,
} from 'hooks/app';
import { stepStates, stepNames } from 'constants/index';

import useTextResponsesData from './useTextResponsesData';
import useUploadedFilesData from './useUploadedFilesData';
import useSubmissionValidationStatus from './useSubmissionValidationStatus';

const useSubmissionViewData = () => {
  const [hasSavedDraft, setHasSavedDraft] = useState(false);
  const hasSubmitted = useHasSubmitted();
  const setHasSubmitted = useSetHasSubmitted();
  const submitResponseMutation = useSubmitResponse();
  const rubricConfig = useRubricConfig();
  const globalState = useGlobalState({ step: stepNames.submission });
  const refreshPageData = useRefreshPageData();
  const setResponse = useSetResponse();
  const response = useResponse();
  const stepState = hasSubmitted ? stepStates.submitted : globalState.stepState;

  const {
    textResponses,
    onUpdateTextResponse,
    saveResponse,
    saveResponseStatus,
    finishLater,
    finishLaterStatus,
  } = useTextResponsesData({ setHasSavedDraft });

  const {
    uploadedFiles,
    onFileUploaded,
    onDeletedFile,
  } = useUploadedFilesData();

  const {
    validateBeforeConfirmation,
    submissionTriggered,
    promptStatuses,
    fileUploadIsRequired,
  } = useSubmissionValidationStatus(textResponses, uploadedFiles);

  const submitResponseHandler = useCallback(() => {
    submitResponseMutation.mutateAsync({
      textResponses,
      uploadedFiles,
    }).then(() => {
      setResponse({ textResponses, uploadedFiles });
      setHasSubmitted(true);
      refreshPageData();
    });
  }, [ // eslint-disable-line react-hooks/exhaustive-deps
    setHasSubmitted,
    submitResponseMutation,
    textResponses,
    uploadedFiles,
  ]);

  return {
    actionOptions: {
      finishLater,
      finishLaterStatus,
      saveResponse,
      saveResponseStatus,
      submit: submitResponseHandler,
      submitStatus: submitResponseMutation.status,
      hasSubmitted,
      validateBeforeConfirmation,
    },
    response: hasSubmitted
      ? response
      : { textResponses, uploadedFiles },
    hasSubmitted,
    onUpdateTextResponse,
    isDraftSaved: hasSavedDraft,
    onDeletedFile,
    onFileUploaded,
    showRubric: rubricConfig.showDuringResponse,
    isReadOnly: stepState === stepStates.done || hasSubmitted,
    promptStatuses,
    submissionTriggered,
    fileUploadIsRequired,
  };
};

export default useSubmissionViewData;
