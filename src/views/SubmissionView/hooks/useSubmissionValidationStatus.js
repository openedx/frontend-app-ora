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
  const [fileUploadIsRequired, setFileUploadIsRequired] = useState(false);

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
