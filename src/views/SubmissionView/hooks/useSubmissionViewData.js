import React from 'react';

import { StrictDict, useKeyedState } from '@edx/react-unit-test-utils';

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
  const setResponse = useSetResponse();
  const response = useResponse();
  const refreshUpstream = useRefreshUpstream();
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

  const submitResponseHandler = React.useCallback(() => {
    submitResponseMutation.mutateAsync({
      textResponses,
      uploadedFiles,
    }).then(() => {
      setResponse({ textResponses, uploadedFiles });
      setHasSubmitted(true);
      refreshPageData();
      refreshUpstream();
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
  };
};

export default useSubmissionViewData;
