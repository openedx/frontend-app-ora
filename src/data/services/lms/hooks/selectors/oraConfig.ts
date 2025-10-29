import React from 'react';
import * as data from 'data/services/lms/hooks/data';
import * as types from 'data/services/lms/types';
import { stepNames } from 'constants/index';

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
    isRefetching: queryStatus.isRefetching,
    isStale: queryStatus.isStale,
  };
};

export const useIsORAConfigLoaded = (): boolean => (
  data.useORAConfig().status === 'success'
);

export const useORAConfigDataError = (): unknown => data.useORAConfig()?.error;

export const useORAConfigData = (): types.ORAConfig | undefined => data.useORAConfig()?.data;

export const usePrompts = () => useORAConfigData()?.prompts;

export const useSubmissionConfig = (): types.SubmissionConfig | undefined => (
  useORAConfigData()?.submissionConfig
);
export const useFileUploadConfig = (): types.FileResponseConfig | undefined => (
  useSubmissionConfig()?.fileResponseConfig
);

export const useAssessmentStepConfig = (): types.AssessmentStepConfig | undefined => (
  useORAConfigData()?.assessmentSteps
);
export const useAssessmentStepOrder = (): string[] | undefined => (
  useAssessmentStepConfig()?.order
);
export const useStepIndex = ({ step }): number | undefined => (
  useAssessmentStepOrder()?.indexOf(step)
);
export const useLastStep = (): string => {
  const order = useAssessmentStepOrder()?.filter(step => step !== stepNames.staff);
  if (order?.length) {
    return order[order.length - 1];
  }
  return stepNames.submission;
};
export const useEffectiveGradeStep = (): string | null => {
  const order = useAssessmentStepOrder();
  if (order?.length) {
    return order[order.length - 1];
  }
  return null;
};

export const useRubricConfig = (): types.RubricConfig | undefined => (
  useORAConfigData()?.rubricConfig
);

export const useEmptyRubric = () => {
  const rubric = useRubricConfig();
  return React.useMemo(() => ({
    criteria: rubric?.criteria.map(() => ({
      selectedOption: null,
      feedback: '',
    })),
    overallFeedback: '',
  }), [rubric]);
};
export const useCriteriaConfig = () => useRubricConfig()?.criteria;
export const useOverallFeedbackDefaultText = () => useRubricConfig()?.feedbackConfig?.defaultText;
export const useOverallFeedbackInstructions = () => useRubricConfig()?.feedbackConfig?.description;

export const useLeaderboardConfig = (): types.LeaderboardConfig | undefined => (
  useORAConfigData()?.leaderboardConfig
);
