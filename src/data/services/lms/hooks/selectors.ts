import * as api from './api';

import * as types from '../types';

export const useORAConfigDataStatus = (): types.QueryStatus => {
  const queryStatus = api.useORAConfig();
  return {
    isLoading: queryStatus.isLoading,
    isFetching: queryStatus.isFetching,
    isInitialLoading: queryStatus.isInitialLoading,
    status: queryStatus.status,
    error: queryStatus.error,
  };
};

export const useIsORAConfigLoaded = (): boolean => (
  api.useORAConfig().status === 'success'
);

export const useORAConfigData = (): types.ORAConfig => (
  api.useORAConfig().data
);

export const useSubmissionConfig = (): types.SubmissionConfig => (
  useORAConfigData().submissionConfig
);

export const useAssessmentStepConfig = (): types.AssessmentStepConfig => (
  useORAConfigData().assessmentSteps
);

export const useRubricConfig = (): types.RubricConfig => useORAConfigData().rubric;

export const useLeaderboardConfig = (): types.LeaderboardConfig => useORAConfigData().leaderboardConfig;

export const usePageDataStatus = () => {
  const queryStatus = api.usePageData();
  return {
    isLoading: queryStatus.isLoading,
    isFetching: queryStatus.isFetching,
    isInitialLoading: queryStatus.isInitialLoading,
    status: queryStatus.status,
    error: queryStatus.error,
  };
};
export const useIsPageDataLoaded = (): boolean => (
  api.usePageData().status === 'success'
);

export const usePageData = (): types.PageData => api.usePageData().data;

export const useSubmissionTeamInfo = (): types.SubmissionTeamData => usePageData().submission.teamInfo;

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
