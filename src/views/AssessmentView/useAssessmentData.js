import { useState, useEffect } from 'react';
import {
  useIsORAConfigLoaded,
  useIsPageDataLoaded,
  usePrompts,
  useResponse,
  useSetResponse,
  useResponseData,
} from 'hooks/app';

const useAssessmentData = () => {
  const [initialized, setInitialized] = useState(false);
  const prompts = usePrompts();
  const response = useResponse();
  const responseData = useResponseData();
  const setResponse = useSetResponse();
  const isLoaded = useIsORAConfigLoaded();
  const isPageDataLoaded = useIsPageDataLoaded();
  useEffect(() => {
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
