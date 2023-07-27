import * as api from './api';
import type * as types from '../types';

export const useORAConfigDataStatus = (): types.QueryStatus => {
  const queryStatus = api.useORAConfig();
  return {
    isLoading: queryStatus.isLoading,
    isFetching: queryStatus.isFetching,
    isInitialLoading: queryStatus.isInitialLoading,
    error: queryStatus.error,
  };
};
export const useORAConfigData = (): types.ORAConfig => (
  api.useORAConfig().data
);

export const useSubmissionConfig = (): types.SubmissionConfig => (
  useORAConfigData().submissionConfig
);

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
