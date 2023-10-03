import { useRubricConfig } from 'data/services/lms/hooks/selectors';

export const useReadonlyAssessmentData = ({ assessment }) => {
  const { criteria, feedbackConfig } = useRubricConfig();

  const criterionData = (criterion) => ({
    ...criterion,
    optionsValue: assessment.optionsSelected[criterion.name],
    optionsIsInvalid: false,
    feedbackValue: assessment.criterionFeedback[criterion.name],
    feedbackIsInvalid: false,
  });

  return {
    criteria: criteria.map(criterionData),
    // overall feedback
    overallFeedbackPrompt: feedbackConfig.defaultText,
    overallFeedback: assessment.overallFeedback,
  };
};

export default useReadonlyAssessmentData;
