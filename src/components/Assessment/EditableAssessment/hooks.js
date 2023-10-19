import { useContext } from 'react';
import { StrictDict } from '@edx/react-unit-test-utils';

import { useRubricConfig } from 'data/services/lms/hooks/selectors';
import { useSubmitRubric } from 'data/services/lms/hooks/actions';
import { AssessmentContext } from 'components/AssessmentContext';

export const stateKeys = StrictDict({
  optionsSelected: 'optionsSelected',
  criterionFeedback: 'criterionFeedback',
  assessment: 'assessment',
  overallFeedback: 'overallFeedback',
});

const useEditableAssessmentData = () => {
  const {
    currentValue,
    formFields,
  } = useContext(AssessmentContext);

  const { criteria, feedbackConfig } = useRubricConfig();

  const submitRubricMutation = useSubmitRubric();
  const onSubmit = () => {
    submitRubricMutation.mutate(currentValue);
  };

  return {
    criteria,
    formFields,
    onSubmit,
    submitStatus: submitRubricMutation.status,
    // overall feedback
    overallFeedbackPrompt: feedbackConfig.defaultText,
  };
};

export default useEditableAssessmentData;
