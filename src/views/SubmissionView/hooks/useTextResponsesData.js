import { useCallback, useEffect } from 'react';

import { StrictDict, useKeyedState } from '@edx/react-unit-test-utils';
import {
  useFinishLater,
  useHasSubmitted,
  useSaveDraftResponse,
  useTextResponses,
} from 'hooks/app';
import { MutationStatus } from 'constants/index';

export const stateKeys = StrictDict({
  textResponses: 'textResponses',
  isDirty: 'isDirty',
  hasSaved: 'hasSaved',
  lastChanged: 'lastChanged',
});

const useTextResponsesData = ({ setHasSavedDraft }) => {
  const textResponses = useTextResponses();
  const hasSubmitted = useHasSubmitted();
  const [hasSaved, setHasSaved] = useKeyedState(stateKeys.hasSaved, false);
  const [lastChanged, setLastChanged] = useKeyedState(stateKeys.lastChanged, null);
  const [isDirty, setIsDirty] = useKeyedState(stateKeys.isDirty, false);
  const [value, setValue] = useKeyedState(stateKeys.textResponses, textResponses);

  const saveResponseMutation = useSaveDraftResponse();
  const finishLaterMutation = useFinishLater();

  const saveResponse = useCallback(() => {
    setIsDirty(false);
    return saveResponseMutation.mutateAsync({ textResponses: value }).then(() => {
      setHasSavedDraft(true);
    });
  }, [
    saveResponseMutation,
    value,
    setIsDirty,
    setHasSavedDraft,
  ]);

  const finishLater = useCallback(() => {
    setIsDirty(false);
    return finishLaterMutation.mutateAsync({ textResponses: value });
  }, [setIsDirty, finishLaterMutation, value]);

  const onChange = useCallback((index) => (textResponse) => {
    const val = typeof textResponse === 'string' ? textResponse : textResponse?.target.value;
    setValue(oldResponses => {
      const out = [...oldResponses];
      out[index] = val;
      return out;
    });
    setIsDirty(true);
    setLastChanged(Date.now());
  }, [
    setValue,
    setIsDirty,
    setLastChanged,
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (!lastChanged) {
        return;
      }
      const timeSinceChange = Date.now() - lastChanged;
      if (isDirty && timeSinceChange > 2000) {
        saveResponse();
        if (!hasSaved) {
          setHasSaved(true);
        }
      }
    }, 2000);
    return () => clearInterval(interval);
  }, [
    isDirty,
    hasSubmitted,
    hasSaved,
    setHasSaved,
    lastChanged,
    saveResponse,
  ]);

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
