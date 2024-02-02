import React from 'react';
import { StrictDict, useKeyedState } from '@edx/react-unit-test-utils';

import { useHasSubmitted, useInitializeAssessment } from 'hooks/assessment';

export const stateKeys = StrictDict({
  initialized: 'initialized',
});

const useAssessmentData = () => {
  const [initialized, setInitialized] = useKeyedState(stateKeys.initialized, false);
  const hasSubmitted = useHasSubmitted();
  const initialize = useInitializeAssessment();
  React.useEffect(() => {
    initialize();
    setInitialized(true);
  }, [initialize, setInitialized]);
  return { initialized, hasSubmitted };
};

export default useAssessmentData;
