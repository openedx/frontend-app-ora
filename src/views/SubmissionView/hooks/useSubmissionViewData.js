import { useCallback, useEffect } from 'react';

import { StrictDict, useKeyedState } from '@edx/react-unit-test-utils';

import {
  useGlobalState,
  useRubricConfig,
  useSubmitResponse,
  useSetHasSubmitted,
  useHasSubmitted,
  useRefreshPageData,
} from 'hooks/app';
import {
  useRefreshUpstream,
} from 'hooks/modal';
import { stepStates, stepNames } from 'constants';

import useTextResponsesData from './useTextResponsesData';
import useUploadedFilesData from './useUploadedFilesData';

const stateKeys = StrictDict({
  hasSavedDraft: 'hasSavedDraft',
});

const useSubmissionViewData = () => {
  const [hasSavedDraft, setHasSavedDraft] = useKeyedState(stateKeys.hasSavedDraft, false);
  const hasSubmitted = useHasSubmitted();
  const setHasSubmitted = useSetHasSubmitted();
  const submitResponseMutation = useSubmitResponse();
  const rubricConfig = useRubricConfig();
  const globalState = useGlobalState({ step: stepNames.submission });
  const refreshPageData = useRefreshPageData();
  const refreshUpstream = useRefreshUpstream();
  const stepState = hasSubmitted ? stepStates.submitted : globalState.stepState;

  const {
    textResponses,
    onUpdateTextResponse,
    saveResponse,
    saveResponseStatus,
    finishLater,
    finishLaterStatus,
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
      refreshPageData();
      refreshUpstream();
    });
  }, [setHasSubmitted, submitResponseMutation, textResponses, uploadedFiles]);

  useEffect(() => {
    if (!hasSubmitted) {
      const timer = setTimeout(() => {
        saveResponse();
        if (!hasSavedDraft) {
          setHasSavedDraft(true);
        }
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [saveResponse, hasSubmitted]);

  return {
    actionOptions: {
      finishLater,
      finishLaterStatus,
      saveResponse,
      saveResponseStatus,
      submit: submitResponseHandler,
      submitStatus: submitResponseMutation.status,
      hasSubmitted,
    },
    hasSubmitted,
    textResponses,
    onUpdateTextResponse,
    isDraftSaved: hasSavedDraft,
    uploadedFiles,
    onDeletedFile,
    onFileUploaded,
    showRubric: rubricConfig.showDuringResponse,
    isReadOnly: stepState === stepStates.done || hasSubmitted,
  };
};

export default useSubmissionViewData;
