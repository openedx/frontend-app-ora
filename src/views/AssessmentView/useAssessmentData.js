import React from 'react';
import { StrictDict, useKeyedState } from '@edx/react-unit-test-utils';
import {
  useIsORAConfigLoaded,
  useIsPageDataLoaded,
  usePrompts,
  useResponse,
  useSetResponse,
  useResponseData,
} from 'hooks/app';

export const stateKeys = StrictDict({
  initialized: 'initialized',
});

const useAssessmentData = () => {
  const [initialized, setInitialized] = useKeyedState(stateKeys.initialized, false);
  const prompts = usePrompts();
  const response = useResponse();
  const responseData = useResponseData();
  const setResponse = useSetResponse();
  const isLoaded = useIsORAConfigLoaded();
  const isPageDataLoaded = useIsPageDataLoaded();
  React.useEffect(() => {
    if (!initialized && isLoaded && isPageDataLoaded) {
      setResponse(responseData);
      setInitialized(true);
    } else if (initialized && responseData && response !== responseData) {
      setResponse(responseData);
    }
  }, [responseData, initialized, isLoaded, isPageDataLoaded, response, setResponse, setInitialized]);
  return {
    isLoaded,
    response,
    prompts,
  };
};

export default useAssessmentData;
