import React from 'react';
import * as data from 'data/services/lms/hooks/data';
import * as types from 'data/services/lms/types';
import { stepNames } from 'data/services/lms/constants';

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

export const useORAConfigData = (): types.ORAConfig => {
  // console.log({ oraConfigData: data.useORAConfig().data });
  return data.useORAConfig().data;
};

export const usePrompts = () => useORAConfigData().prompts;

export const useSubmissionConfig = (): types.SubmissionConfig => (
  useORAConfigData().submissionConfig
);

export const useAssessmentStepConfig = (): types.AssessmentStepConfig => (
  useORAConfigData().assessmentSteps
);

export const useFileUploadEnabled = (): boolean => useSubmissionConfig().fileResponseConfig.enabled;

export const useAssessmentStepOrder = (): string[] => useAssessmentStepConfig()?.order;
export const useStepIndex = ({ step }): number => useAssessmentStepOrder().indexOf(step);

export const useLastStep = () => {
  const order = useAssessmentStepOrder().filter(step => step !== stepNames.staff);
  if (order.length) {
    return order[order.length - 1];
  }
  return stepNames.submission;
};

export const useEffectiveGradeStep = () => {
  const order = useAssessmentStepOrder();
  return order[order.length - 1];
};

export const useRubricConfig = (): types.RubricConfig => useORAConfigData().rubricConfig;

export const useEmptyRubric = () => {
  const rubric = useRubricConfig();
  return React.useMemo(() => ({
    criteria: rubric.criteria.map((criterion) => ({
      selectedOption: null,
      feedback: criterion.feedbackEnabled ? '' : null,
    })),
    overallFeedback: '',
  }), [rubric.criteria]);
};

export const useFinalStep = () => {
  const steps = useAssessmentStepOrder().filter(step => step !== stepNames.staff);
  if (steps.length) {
    return steps[steps.length - 1];
  }
  return stepNames.submission;
};

export const useLeaderboardConfig = (): types.LeaderboardConfig => useORAConfigData().leaderboardConfig;
