import * as api from './api';

export const useORAConfigDataStatus = () => {
  const queryStatus = api.useORAConfig();
  return {
    isLoading: queryStatus.isLoading,
    isFetching: queryStatus.isFetching,
    isInitialLoading: queryStatus.isInitialLoading,
    status: queryStatus.status,
    error: queryStatus.error,
  };
};

export const useIsORAConfigLoaded = () => api.useORAConfig().status === 'success';
export const useORAConfigData = () => api.useORAConfig().data;

export const useSubmissionConfig = () => useORAConfigData().submissionConfig;

export const useAssessmentStepConfig = () => useORAConfigData().assessmentSteps;

export const useRubricConfig = () => useORAConfigData().rubric;

export const useLeaderboardConfig = () => useORAConfigData().leaderboardConfig;

export const usePageDataStatus = () => {
  const queryStatus = api.usePageData();
  return {
    isLoading: queryStatus.isLoading,
    isFetching: queryStatus.isFetching,
    isInitialLoading: queryStatus.isInitialLoading,
    error: queryStatus.error,
  };
};
export const usePageData = () => api.usePageData().data;

export const useSubmissionTeamInfo = () => usePageData().teamInfo;

export const useSubmissionStatus = () => {
  const {
    hasCancelled,
    hasReceivedGrade,
    hasSubmitted,
  } = usePageData();
  return {
    hasCancelled,
    hasReceivedGrade,
    hasSubmitted,
  };
};

export const useSubmissionResponse = () => usePageData().submission.response;
