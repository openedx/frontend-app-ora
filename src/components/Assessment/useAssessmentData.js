import React from 'react';
import { StrictDict, useKeyedState } from '@edx/react-unit-test-utils';

import {
  useHasSubmitted,
  useInitializeAssessment,
  useSetHasSubmitted,
} from 'hooks/assessment';
import { useViewStep } from 'hooks/routing';
import { stepNames } from 'constants';

export const stateKeys = StrictDict({
  initialized: 'initialized',
});

const useAssessmentData = () => {
  const [initialized, setInitialized] = useKeyedState(stateKeys.initialized, false);
  const hasSubmitted = useHasSubmitted();
  const setHasSubmitted = useSetHasSubmitted();
  const initialize = useInitializeAssessment();
  const viewStep = useViewStep();
  React.useEffect(() => {
    initialize();
    setInitialized(true);
  }, [initialize, setInitialized]);
  return { initialized, hasSubmitted };
};

export default useAssessmentData;
