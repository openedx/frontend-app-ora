import { useCallback, useEffect } from 'react';

import { StrictDict, useKeyedState } from '@edx/react-unit-test-utils';
import {
  usePageData,
  usePrompts,
  useRubricConfig,
} from 'data/services/lms/hooks/selectors';

import {
  useSubmitResponse, useSaveResponse, useUploadFiles, useDeleteFile,
} from 'data/services/lms/hooks/actions';
import { MutationStatus } from 'data/services/lms/constants';

export const stateKeys = StrictDict({
  textResponses: 'textResponses',
  uploadedFiles: 'uploadedFiles',
  isDirty: 'isDirty',
});

export const useTextResponses = () => {
  const { response } = usePageData().submission;
  const prompts = usePrompts();

  const [isDirty, setIsDirty] = useKeyedState(stateKeys.isDirty, false);
  const [value, setValue] = useKeyedState(
    stateKeys.textResponses,
    response ? response.textResponses : prompts.map(() => ''),
  );

  const saveResponseMutation = useSaveResponse();

  const saveResponseHandler = useCallback(() => {
    setIsDirty(false);
    saveResponseMutation.mutate({ textResponses: value });
  }, [setIsDirty, saveResponseMutation, value]);

  const onChange = useCallback((index) => (textResponse) => {
    setValue(oldResponses => {
      const out = [...oldResponses];
      out[index] = textResponse;
      return out;
    });
    setIsDirty(true);
  }, [setValue, setIsDirty]);

  return {
    formProps: {
      value,
      onChange,
      draftSaved: saveResponseMutation.status === MutationStatus.success && !isDirty,
    },
    saveResponse: {
      handler: saveResponseHandler,
      status: saveResponseMutation.status,
    },
  };
};

export const useUploadedFiles = () => {
  const deleteFileMutation = useDeleteFile();
  const uploadFilesMutation = useUploadFiles();

  const { response } = usePageData().submission;

  const [value, setValue] = useKeyedState(
    stateKeys.uploadedFiles,
    response ? response.uploadedFiles : [],
  );

  const onFileUploaded = useCallback(async (data) => {
    const { fileData, queryClient } = data;
    const uploadResponse = await uploadFilesMutation.mutateAsync(data);
    if (uploadResponse) {
      setValue((oldFiles) => [...oldFiles, uploadResponse.uploadedFiles[0]]);
    }
  }, [uploadFilesMutation, setValue]);

  const onDeletedFile = deleteFileMutation.mutateAsync;

  return { value, onFileUploaded, onDeletedFile };
};

const useSubmissionViewData = () => {
  const submitResponseMutation = useSubmitResponse();
  const textResponses = useTextResponses();
  const uploadedFiles = useUploadedFiles();
  const { showDuringResponse } = useRubricConfig();

  const submitResponseHandler = useCallback(() => {
    submitResponseMutation.mutate({
      textResponses: textResponses.formProps.value,
      uploadedFiles: uploadedFiles.value,
    });
  }, [submitResponseMutation, textResponses, uploadedFiles]);

  return {
    actionsProps: {
      submitResponse: {
        handler: submitResponseHandler,
        status: submitResponseMutation.status,
      },
      saveResponse: textResponses.saveResponse,
    },
    formProps: {
      textResponses: textResponses.formProps,
      uploadedFiles,
    },
    showRubric: showDuringResponse,
  };
};

export default useSubmissionViewData;
