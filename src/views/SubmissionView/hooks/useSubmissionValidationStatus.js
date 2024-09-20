import { useCallback, useState } from 'react';

import {
  useSubmissionConfig,
} from 'hooks/app';

const useSubmissionStatuses = (textResponses, uploadedFiles) => {
  const submissionConfig = useSubmissionConfig();

  // holds the status of each text field
  const [promptStatuses, setPromptStatuses] = useState(
    textResponses.reduce((obj, val, i) => ({ ...obj, [i]: true }), {}),
  );
  const [submissionTriggered, setSubmissionTriggered] = useState(false);

  const getPromptsSubmissionStatus = useCallback(() => {
    const promptsSubmissionStatus = textResponses.reduce((obj, val, i) => ({ ...obj, [i]: val }), {});
    if (submissionConfig.textResponseConfig.required) {
      for (let i; i < textResponses.length; i++) {
        promptsSubmissionStatus[i] = !!textResponses[i];
      }
    }

    return promptsSubmissionStatus;
  }, [textResponses, submissionConfig]);

  // this function is to be called when response submit button is clicked
  const validateBeforeConfirmation = useCallback(() => {
    setSubmissionTriggered(true);
    const retrievePromptsSubmissionStatus = getPromptsSubmissionStatus();
    const containsInvalidPrompts = Object.values(retrievePromptsSubmissionStatus).some((val) => !val);
    if (containsInvalidPrompts || (submissionConfig.fileResponseConfig.required && !uploadedFiles.length)) {
      setPromptStatuses(retrievePromptsSubmissionStatus);
      return false;
    }

    return true;
  }, [uploadedFiles, submissionConfig, getPromptsSubmissionStatus]);

  return {
    getPromptsSubmissionStatus,
    validateBeforeConfirmation,
    setSubmissionTriggered,
    submissionTriggered,
    setPromptStatuses,
    promptStatuses,
    fileUploadIsRequired: submissionTriggered && submissionConfig.fileResponseConfig.required && !uploadedFiles.length,
  };
};

export default useSubmissionStatuses;
