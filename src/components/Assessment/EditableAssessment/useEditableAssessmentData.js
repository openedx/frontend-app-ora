import React from 'react';

import { useCloseModal } from 'hooks';
import { useRubricConfig } from 'data/services/lms/hooks/selectors';
import { useSubmitAssessment } from 'data/services/lms/hooks/actions';
import { AssessmentContext } from 'context/AssessmentContext';

const useEditableAssessmentData = () => {
  const {
    currentValue,
    formFields,
    onSubmitSuccess,
    hasSubmitted,
    setHasSubmitted,
  } = React.useContext(AssessmentContext);

  const closeModal = useCloseModal();
  const { criteria, feedbackConfig } = useRubricConfig();
  const submitAssessmentMutation = useSubmitAssessment({ onSuccess: onSubmitSuccess });
  const isInvalid = formFields.overallFeedback.isInvalid
    || formFields.criteria.some(c => c.feedback.isInvalid || c.options.isInvalid);

  const onSubmit = React.useCallback(() => {
    if (isInvalid) {
      setHasSubmitted(true);
    } else {
      submitAssessmentMutation.mutateAsync(currentValue).then(onSubmitSuccess);
    }
  }, [isInvalid, setHasSubmitted, submitAssessmentMutation, currentValue, onSubmitSuccess]);

  const value = React.useMemo(() => ({
    criteria,
    formFields,
    onSubmit,
    closeModal,
    submitStatus: submitAssessmentMutation.status,
    overallFeedbackPrompt: feedbackConfig.defaultText,
    showValidation: hasSubmitted,
  }), [
    criteria,
    formFields,
    onSubmit,
    closeModal,
    submitAssessmentMutation.status,
    feedbackConfig.defaultText,
    hasSubmitted,
  ]);
  return value;
};

export default useEditableAssessmentData;
