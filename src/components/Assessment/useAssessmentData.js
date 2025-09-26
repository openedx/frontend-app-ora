import { useState, useEffect } from 'react';

import { useHasSubmitted, useInitializeAssessment } from 'hooks/assessment';

export const useAssessmentData = () => {
  const [initialized, setInitialized] = useState(false);
  const hasSubmitted = useHasSubmitted();
  const initialize = useInitializeAssessment();
  useEffect(() => {
    initialize();
    setInitialized(true);
  }, [initialize, setInitialized]);
  return { initialized, hasSubmitted };
};

export default useAssessmentData;
