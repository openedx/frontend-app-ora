import { useCallback } from 'react';
import { StrictDict, useKeyedState } from '@edx/react-unit-test-utils';

import {
  useSubmissionConfig,
} from 'hooks/app';

export const stateKeys = StrictDict({
  promptStatuses: 'promptStatuses',
  submissionTriggered: 'submissionTriggered',
  fileUploadIsRequired: 'fileUploadIsRequired',
});

const useSubmissionStatuses = (textResponses, uploadedFiles) => {
  const submissionConfig = useSubmissionConfig();

  // holds the status of each text field
  const [promptStatuses, setPromptStatuses] = useKeyedState(
    stateKeys.promptStatuses,
    textResponses.reduce((obj, val, i) => ({ ...obj, [i]: true }), {}),
  );
  const [submissionTriggered, setSubmissionTriggered] = useKeyedState(stateKeys.submissionTriggered, false);
  const [fileUploadIsRequired, setFileUploadIsRequired] = useKeyedState(stateKeys.fileUploadIsRequired, false);

  // this function is to be called when response submit button is clicked
  const validateBeforeConfirmation = useCallback(() => {
    setSubmissionTriggered(true);
    const retrievePromptsSubmissionStatus = textResponses.reduce((obj, val, i) => ({ ...obj, [i]: val }), {});
    let containsInvalidPrompts = false;
    if (submissionConfig.textResponseConfig.required) {
      for (let i = 0; i < textResponses.length; i++) {
        retrievePromptsSubmissionStatus[i] = !!textResponses[i];
      }
      containsInvalidPrompts = Object.values(retrievePromptsSubmissionStatus).some((val) => !val);
    }
    const calcFileUploadIsRequired = submissionConfig.fileResponseConfig.required && !uploadedFiles.length;
    setFileUploadIsRequired(calcFileUploadIsRequired);
    setPromptStatuses(retrievePromptsSubmissionStatus);
    if (containsInvalidPrompts || (submissionConfig.fileResponseConfig.required && !uploadedFiles.length)) {
      return false;
    }

    return true;
  }, [
    textResponses,
    uploadedFiles,
    submissionConfig,
    setPromptStatuses,
    setSubmissionTriggered,
    setFileUploadIsRequired,
  ]);

  return {
    validateBeforeConfirmation,
    setSubmissionTriggered,
    submissionTriggered,
    setPromptStatuses,
    promptStatuses,
    fileUploadIsRequired,
  };
};

export default useSubmissionStatuses;
