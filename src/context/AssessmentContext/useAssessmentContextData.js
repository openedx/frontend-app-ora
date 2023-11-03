import React from 'react';

import { StrictDict, useKeyedState } from '@edx/react-unit-test-utils';
import useFormFields from './useFormFields';

export const AssessmentContext = React.createContext({
  criteria: [],
  overallFeedback: '',
});

export const stateKeys = StrictDict({
  assessment: 'assessment',
  hasSubmitted: 'hasSubmitted',
});

const useAssessmentContextData = () => {
  const [assessment, setAssessment] = useKeyedState(stateKeys.assessment, null);
  const [hasSubmitted, setHasSubmitted] = useKeyedState(stateKeys.hasSubmitted, false);

  const { formFields, currentValue } = useFormFields({ assessment });

  const reset = React.useCallback(() => {
    setAssessment(null);
    setHasSubmitted(false);
  }, [setAssessment, setHasSubmitted]);

  const value = React.useMemo(() => ({
    formFields,
    currentValue,
    onSubmitSuccess: setAssessment,
    hasAssessment: !!assessment,
    assessment,
    hasSubmitted,
    setHasSubmitted,
    reset,
  }), [
    formFields,
    currentValue,
    setAssessment,
    assessment,
    hasSubmitted,
    setHasSubmitted,
    reset,
  ]);
  return value;
};

export default useAssessmentContextData;
