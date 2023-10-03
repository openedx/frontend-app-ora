import * as data from './data';

import * as types from '../types';

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

export const usePageDataStatus = () => {
  const queryStatus = data.usePageData();
  return {
    isLoading: queryStatus.isLoading,
    isFetching: queryStatus.isFetching,
    isInitialLoading: queryStatus.isInitialLoading,
    status: queryStatus.status,
    error: queryStatus.error,
  };
};
export const useIsPageDataLoaded = (): boolean => (
  data.usePageData().status === 'success'
);

export const usePageData = (): types.PageData => data.usePageData()?.data;

export const useProgressData = (): types.ProgressData => usePageData()?.progress;

export const useSubmissionTeamInfo = (): types.SubmissionTeamData => usePageData()?.submission.teamInfo;

export const useSubmissionStatus = (): types.SubmissionStatusData => {
  const {
    hasCancelled,
    hasReceivedGrade,
    hasSubmitted,
  } = usePageData().submission;
  return {
    hasCancelled,
    hasReceivedGrade,
    hasSubmitted,
  };
};

export const useSubmissionResponse = (): types.SubmissionResponseData => (
  usePageData().submission.response
);
