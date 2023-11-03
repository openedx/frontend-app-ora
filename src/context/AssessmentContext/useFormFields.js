import React from 'react';

import { StrictDict, useKeyedState } from '@edx/react-unit-test-utils';

import { feedbackRequirement } from 'data/services/lms/constants';
import { useRubricConfig, useEmptyRubric } from 'data/services/lms/hooks/selectors';

export const stateKeys = StrictDict({
  criteria: 'criteria',
  overallFeedback: 'overallFeedback',
  showValidation: 'showValidation',
});

const useFormFields = ({ assessment }) => {
  const emptyRubric = useEmptyRubric();
  const rubricConfig = useRubricConfig();
  const [criteria, setCriteria] = useKeyedState(
    stateKeys.criteria,
    emptyRubric.criteria,
  );
  const [overallFeedback, setOverallFeedback] = useKeyedState(
    stateKeys.overallFeedback,
    emptyRubric.overallFeedback,
  );

  // update fields if an assessment is loaded
  React.useEffect(() => {
    if (assessment) {
      setCriteria(assessment.criteria);
      setOverallFeedback(assessment.overallFeedback);
    } else {
      setCriteria(emptyRubric.criteria);
      setOverallFeedback(emptyRubric.overallFeedback);
    }
  }, [emptyRubric, assessment, setCriteria, setOverallFeedback]);

  // Load form fields for criteria options and feedback with criterion name, from rubric config
  const criteriaData = React.useMemo(
    () => rubricConfig.criteria.map((rubricCriterion, criterionIndex) => {
      const criterion = criteria[criterionIndex];
      const updateCriterion = (data) => setCriteria(
        old => ({ ...old, [criterionIndex]: { ...old[criterionIndex], ...data } }),
      );
      const setCriterionOption = (e) => updateCriterion({ selectedOption: e.target.value });
      const setCriterionFeedback = (e) => updateCriterion({ feedback: e.target.value });
      return {
        name: rubricCriterion.name,
        options: {
          selected: criterion.selectedOption,
          onChange: setCriterionOption,
          isInvalid: criterion.selectedOption === null,
        },
        feedback: {
          value: criterion.feedback,
          onChange: setCriterionFeedback,
          isInvalid: criterion.feedback === ''
            && rubricCriterion.feedbackRequired === feedbackRequirement.required,
        },
      };
    }),
    [rubricConfig.criteria, criteria, setCriteria],
  );

  const overallFeedbackData = React.useMemo(() => ({
    value: overallFeedback,
    onChange: (e) => { setOverallFeedback(e.target.value); },
    isInvalid: false,
  }), [overallFeedback, setOverallFeedback]);

  const currentValue = React.useMemo(
    () => ({
      criteria: criteriaData.map(({ name, options, feedback }) => ({
        name,
        selectedOption: options.selected,
        feedback: feedback.value,
      })),
      overallFeedback,
    }),
    [criteriaData, overallFeedback],
  );
  return {
    formFields: {
      overallFeedback: overallFeedbackData,
      criteria: criteriaData,
    },
    currentValue,
  };
};

export default useFormFields;
