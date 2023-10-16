import * as data from 'data/services/lms/hooks/data';
import * as types from 'data/services/lms/types';

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// ORA Config Data
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
export const useORAConfigDataStatus = (): types.QueryStatus => {
  const queryStatus = data.useORAConfig();
  return {
    isLoading: queryStatus.isLoading,
    isFetching: queryStatus.isFetching,
    isInitialLoading: queryStatus.isInitialLoading,
    status: queryStatus.status,
    error: queryStatus.error,
  };
};

export const useIsORAConfigLoaded = (): boolean => (
  data.useORAConfig().status === 'success'
);

export const useORAConfigData = (): types.ORAConfig => (
  data.useORAConfig().data
);

export const usePrompts = () => useORAConfigData().prompts;

export const useSubmissionConfig = (): types.SubmissionConfig => (
  useORAConfigData().submissionConfig
);

export const useAssessmentStepConfig = (): types.AssessmentStepConfig => (
  useORAConfigData().assessmentSteps
);

export const useAssessmentStepOrder = (): string[] => useAssessmentStepConfig()?.order;
export const useStepIndex = ({ step }): number => useAssessmentStepOrder().indexOf(step);

export const useRubricConfig = (): types.RubricConfig => useORAConfigData().rubric;

export const useEmptyRubric = () => {
  const rubric = useRubricConfig();
  const out = {
    optionsSelected: rubric.criteria.reduce(
      (obj, curr) => ({ ...obj, [curr.name]: null }),
      {},
    ),
    criterionFeedback: {},
    overallFeedback: '',
  };
  rubric.criteria.forEach(criterion => {
    if (criterion.feedbackEnabled) {
      out.criterionFeedback[criterion.name] = '';
    }
  });
  return out;
};

export const useLeaderboardConfig = (): types.LeaderboardConfig => useORAConfigData().leaderboardConfig;
