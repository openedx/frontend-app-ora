import { useCallback } from 'react';

import { StrictDict, useKeyedState } from '@edx/react-unit-test-utils';
import { useFinishLater, useSaveDraftResponse, useTextResponses } from 'hooks/app';
import { MutationStatus } from 'constants';

export const stateKeys = StrictDict({
  textResponses: 'textResponses',
  isDirty: 'isDirty',
});

const useTextResponsesData = () => {
  const textResponses = useTextResponses();

  const [isDirty, setIsDirty] = useKeyedState(stateKeys.isDirty, false);
  const [value, setValue] = useKeyedState(stateKeys.textResponses, textResponses);

  const saveResponseMutation = useSaveDraftResponse();
  const finishLaterMutation = useFinishLater();

  const saveResponse = useCallback(() => {
    setIsDirty(false);
    return saveResponseMutation.mutateAsync({ textResponses: value });
  }, [setIsDirty, saveResponseMutation, value]);

  const finishLater = useCallback(() => {
    setIsDirty(false);
    return finishLaterMutation.mutateAsync({ textResponses: value });
  }, [setIsDirty, finishLaterMutation, value]);

  const onChange = useCallback((index) => (textResponse) => {
    setValue(oldResponses => {
      const out = [...oldResponses];
      out[index] = textResponse;
      return out;
    });
    setIsDirty(true);
  }, [setValue, setIsDirty]);

  return {
    textResponses: value,
    onUpdateTextResponse: onChange,
    isDraftSaved: saveResponseMutation.status === MutationStatus.success && !isDirty,
    saveResponse,
    saveResponseStatus: saveResponseMutation.status,
    finishLater,
    finishLaterStatus: finishLaterMutation.status,
  };
};

export default useTextResponsesData;
