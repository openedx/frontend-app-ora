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
  console.log("useAssessmentContextData");
  const [assessment, setAssessment] = useKeyedState(stateKeys.assessment, null);
  const [hasSubmitted, setHasSubmitted] = useKeyedState(stateKeys.hasSubmitted, false);

  const onSubmitSuccess = React.useCallback((data) => {
    console.log({ onSubmitSuccess: { data } });
    setAssessment(data);
    setHasSubmitted(false);
  }, [setAssessment, setHasSubmitted]);

  const { formFields, currentValue } = useFormFields({ assessment });

  const value = React.useMemo(() => ({
    formFields,
    currentValue,
    onSubmitSuccess,
    hasAssessment: !!assessment,
    assessment,
    hasSubmitted,
    setHasSubmitted,
  }), [
    formFields,
    currentValue,
    onSubmitSuccess,
    assessment,
    hasSubmitted,
    setHasSubmitted,
  ]);

  console.log({ AssessmentContext: value });
  return value;
};

export default useAssessmentContextData;
