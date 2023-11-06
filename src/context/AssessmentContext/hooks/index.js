import React from 'react';

import { useKeyedState, StrictDict } from '@edx/react-unit-test-utils';

import { AssessmentContext } from '..';

export const stateKeys = StrictDict({
  hasUpdatedTrainingSelection: 'hasUpdatedTrainingSelection',
});

const useAssessmentContext = () => React.useContext(AssessmentContext);
export const useShowValidation = () => useAssessmentContext().showValidation;
export const useShowTrainingError = () => useAssessmentContext().showTrainingError;

export const useCriterionFormFields = (criterionIndex) => {
  const context = useAssessmentContext();

  const [hasUpdatedTrainingSelection, setHasUpdatedTrainingSelection] = useKeyedState(
    stateKeys.hasUpdatedTrainingSelection,
    false,
  );

  const {
    checkTrainingSelection,
    showValidation,
    formFields,
  } = context;
  const showTrainingError = context.showTrainingError && !hasUpdatedTrainingSelection;
  const { onChange, isInvalid, selected } = formFields.criteria[criterionIndex].options;
  const trainingValid = checkTrainingSelection({ criterionIndex, optionIndex: selected });

  React.useEffect(() => {
    if (context.showTrainingIncorrect) {
      setHasUpdatedTrainingSelection(false);
    }
  }, [context.showTrainingIncorrect, setHasUpdatedTrainingSelection]);

  return {
    showValidation: showValidation && isInvalid,
    showTrainingError: showTrainingError && !trainingValid,
    showTrainingCorrect: showTrainingError && trainingValid,
    selected,
    onChange: (e) => {
      setHasUpdatedTrainingSelection(true);
      onChange(e);
    },
  };
};

export const useCriterionFeedbackFormFields = (criterionIndex) => {
  const context = useAssessmentContext();
  const { showValidation, formFields } = context;
  const { onChange, isInvalid, value } = formFields.criteria[criterionIndex].feedback;

  return {
    showValidation: showValidation && isInvalid,
    value,
    onChange,
  };
};

export const useOverallFeedbackFormFields = () => {
  const context = useAssessmentContext();
  const { value, onChange } = context.formFields.overallFeedback;
  return {
    prompt: context.overallFeedbackPrompt,
    value,
    onChange,
  };
};
