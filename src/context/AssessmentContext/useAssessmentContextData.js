import React from 'react';

import { StrictDict, useKeyedState } from '@edx/react-unit-test-utils';

import { useCloseModal } from 'hooks';
import {
  useRubricConfig,
  useStepInfo,
} from 'data/services/lms/hooks/selectors';
import { useSubmitAssessment } from 'data/services/lms/hooks/actions';

import useFormFields from './useFormFields';

export const AssessmentContext = React.createContext({
  criteria: [],
  overallFeedback: '',
});

export const stateKeys = StrictDict({
  assessment: 'assessment',
  showValidation: 'showValidation',
  showTrainingError: 'showTrainingError',
});

const useAssessmentContextData = () => {
  const [assessment, setAssessment] = useKeyedState(stateKeys.assessment, null);
  const [showValidation, setShowValidation] = useKeyedState(stateKeys.showValidation, false);
  const [showTrainingError, setShowTrainingError] = useKeyedState(stateKeys.showTrainingError, false);

  const { formFields, currentValue } = useFormFields({ assessment });

  const reset = React.useCallback(() => {
    setAssessment(null);
    setShowValidation(false);
    setShowTrainingError(false);
  }, [setAssessment, setShowValidation, setShowTrainingError]);

  const closeModal = useCloseModal();

  const { criteria, feedbackConfig } = useRubricConfig();
  const submitAssessmentMutation = useSubmitAssessment({ onSuccess: setAssessment });
  const { expectedRubricSelections } = useStepInfo().studentTraining || {};

  const isInvalid = formFields.criteria.some(c => c.feedback.isInvalid || c.options.isInvalid);

  const checkTrainingSelection = React.useCallback(({ criterionIndex, optionIndex }) => (
    !expectedRubricSelections || `${expectedRubricSelections[criterionIndex]}` === optionIndex
  ), [expectedRubricSelections]);

  console.log({ expectedRubricSelections });
  const onSubmit = React.useCallback(() => {
    if (isInvalid) {
      setShowValidation(true);
    } else if (expectedRubricSelections && !currentValue.criteria.every(
      (criterion, criterionIndex) => checkTrainingSelection(
        { criterionIndex, optionIndex: criterion.selectedOption },
      ),
    )) {
      console.log("training error");
      setShowTrainingError(true);
    } else {
      submitAssessmentMutation.mutateAsync(currentValue).then(setAssessment);
    }
  }, [
    checkTrainingSelection,
    isInvalid,
    setShowValidation,
    setShowTrainingError,
    expectedRubricSelections,
    currentValue,
    submitAssessmentMutation,
    setAssessment,
  ]);

  const value = React.useMemo(() => ({
    checkTrainingSelection,
    closeModal,
    criteria,
    expectedRubricSelections,
    formFields,
    onSubmit,
    overallFeedbackPrompt: feedbackConfig.defaultText,
    reset,
    showValidation,
    showTrainingError,
    submitStatus: submitAssessmentMutation.status,
  }), [
    checkTrainingSelection,
    closeModal,
    criteria,
    expectedRubricSelections,
    feedbackConfig,
    formFields,
    onSubmit,
    reset,
    showValidation,
    showTrainingError,
    submitAssessmentMutation,
  ]);
  return value;
};

export default useAssessmentContextData;
