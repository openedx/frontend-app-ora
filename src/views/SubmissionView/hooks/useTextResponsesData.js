import { useCallback, useEffect, useState } from 'react';
import {
  useFinishLater,
  useHasSubmitted,
  useSaveDraftResponse,
  useTextResponses,
} from 'hooks/app';
import { MutationStatus } from 'constants/index';

const useTextResponsesData = ({ setHasSavedDraft }) => {
  const textResponses = useTextResponses();
  const hasSubmitted = useHasSubmitted();
  const [hasSaved, setHasSaved] = useState(false);
  const [lastChanged, setLastChanged] = useState(null);
  const [isDirty, setIsDirty] = useState(false);
  const [value, setValue] = useState(textResponses);

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
