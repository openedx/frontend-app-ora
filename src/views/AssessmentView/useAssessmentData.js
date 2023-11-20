import React from 'react';
import { StrictDict, useKeyedState } from '@edx/react-unit-test-utils';
import {
  useIsORAConfigLoaded,
  useIsPageDataLoaded,
  usePageDataStatus,
  usePrompts,
  useResponse,
  useSetResponse,
  useResponseData,
} from 'hooks/app';

const stateKeys = StrictDict({
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
  console.log({ pageDataStatus: usePageDataStatus() });
  React.useEffect(() => {
    console.log('useAssessmentView useEffect');
    if (!initialized && isLoaded && isPageDataLoaded) {
      setResponse(responseData);
      setInitialized(true);
    }
    if (initialized && responseData && response !== responseData) {
      setResponse(responseData);
    }
  }, [responseData, initialized]);
  return {
    isLoaded,
    response,
    prompts,
  };
};

export default useAssessmentData;
