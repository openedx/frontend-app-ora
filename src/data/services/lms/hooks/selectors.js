import * as api from './api';

export const useORAConfigDataStatus = () => {
  const queryStatus = api.useORAConfig();
  return {
    isLoading: queryStatus.isLoading,
    isFetching: queryStatus.isFetching,
    isInitialLoading: queryStatus.isInitialLoading,
    error: queryStatus.error,
  };
};
export const useORAConfigData = () => api.useORAConfig().data;

export const useSubmissionConfig = () => useORAConfigData().submissionConfig;

export const useAssessmentStepConfig = () => useORAConfigData().assessmentSteps;

export const useRubricConfig = () => useORAConfigData().rubric;

export const useLeaderboardConfig = () => useORAConfigData().leaderboardConfig;

export const useSubmissionDataStatus = () => {
  const queryStatus = api.useSubmissionData();
  return {
    isLoading: queryStatus.isLoading,
    isFetching: queryStatus.isFetching,
    isInitialLoading: queryStatus.isInitialLoading,
    error: queryStatus.error,
  };
};
export const useSubmissionData = () => api.useSubmissionData().data;

export const useSubmissionTeamInfo = () => useSubmissionData().teamInfo;

export const useSubmissionStatus = () => useSubmissionData().submissionStatus;

export const useSubmissionResponse = () => useSubmissionData().submission;
