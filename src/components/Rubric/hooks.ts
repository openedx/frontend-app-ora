import { useKeyedState, StrictDict } from '@edx/react-unit-test-utils';
import { usePageData, useRubricConfig } from 'data/services/lms/hooks/selectors';
import { submitRubric } from 'data/services/lms/hooks/actions';
import { RubricHookData } from './types';

export const stateKeys = StrictDict({
  rubric: 'rubric',
  overallFeedback: 'overallFeedback',
});

export const useRubricData = ({ isGrading }): RubricHookData => {
  const data = usePageData();
  const { criteria, feedbackConfig } = useRubricConfig();

  const [rubricData, setRubricData] = useKeyedState(stateKeys.rubric, data.rubric);
  const [overallFeedback, setOverallFeedback] = useKeyedState(
    stateKeys.overallFeedback, data.rubric.overallFeedback
  );
  const submitRubricMutation = submitRubric();

  const onOverallFeedbackChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setOverallFeedback(e.target.value);

  const onSubmit = () => {
    submitRubricMutation.mutate({
      overallFeedback,
      optionsSelected: rubricData.optionsSelected,
      criterionFeedback: rubricData.criterionFeedback,
    } as any);
  };

  return {
    rubricData,
    setRubricData,
    criteria: criteria.map((criterion) => ({
      ...criterion,
      optionsValue: rubricData.optionsSelected[criterion.name],
      optionsIsInvalid: false,
      optionsOnChange: (e: React.ChangeEvent<HTMLInputElement>) => {
        setRubricData({
          ...rubricData,
          optionsSelected: {
            ...rubricData.optionsSelected,
            [criterion.name]: e.target.value,
          },
        });
      },

      feedbackValue: rubricData.criterionFeedback[criterion.name],
      feedbackIsInvalid: false,
      feedbackOnChange: (e: React.ChangeEvent<HTMLInputElement>) => {
        setRubricData({
          ...rubricData,
          criterionFeedback: {
            ...rubricData.criterionFeedback,
            [criterion.name]: e.target.value,
          },
        });
      },
    })),
    onSubmit,
    submitStatus: submitRubricMutation.status,

    // overall feedback
    overallFeedback,
    onOverallFeedbackChange,
    overallFeedbackDisabled: !isGrading,
    overallFeedbackIsInvalid: false,
    overallFeedbackPrompt: feedbackConfig.defaultText,
  };
};

export default useRubricData;
