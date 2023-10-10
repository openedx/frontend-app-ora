import { useActiveView } from 'hooks';
import {
  closedReasons,
  stepStates,
  stepNames,
} from '../constants';
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

export const useAssessmentStepOrder = () => useAssessmentStepConfig()?.order;

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

export const useActiveStepName = (): string => useProgressData().activeStepName;

export const useSubmissionTeamInfo = (): types.SubmissionTeamData => usePageData()?.submission.teamInfo;

export const useSubmissionStatus = (): types.SubmissionStatusData => {
  const {
    hasCancelled,
    hasReceivedGrade,
    hasSubmitted,
    isClosed,
    closedReason,
  } = usePageData().submission;
  return {
    hasCancelled,
    hasReceivedGrade,
    hasSubmitted,
    isClosed,
    closedReason,
  };
};

export const useHasCancelled = () => useSubmissionStatus().hasCancelled;
export const useHasReceivedFinalGrade = () => useProgressData().hasReceivedFinalGrade;

export const useSubmissionData = () => usePageData().submission;

export const useSubmissionResponse = (): types.SubmissionResponseData => (
  usePageData().submission.response
);

export const useStepIndex = ({ step }) => useAssessmentStepOrder().indexOf(step);

export const useSubmissionState = () => {
  const subStatus = useSubmissionStatus();
  const teamInfo = useSubmissionTeamInfo();

  if (subStatus.hasCancelled) {
    return stepStates.cancelled;
  }

  if (subStatus.hasSubmitted) {
    return stepStates.completed;
  }
  if (subStatus.isClosed) {
    if (subStatus.closedReason === closedReasons.pastDue) {
      return stepStates.closed;
    }
    return stepStates.notAvailable;
  }
  if (!subStatus.hasSubmitted && teamInfo.hasSubmitted) {
    return stepStates.teamAlreadySubmitted;
  }
  return stepStates.inProgress;
};

export const useStepInfo = () => useProgressData().stepInfo;

export const useStepState = ({ step }) => {
  const hasCancelled = useHasCancelled();
  const hasReceivedFinalGrade = useHasReceivedFinalGrade();
  const stepInfo = useStepInfo();
  const activeStepIndex = useStepIndex({ step: useActiveStepName() });
  const stepIndex = useStepIndex({ step });
  const subState = useSubmissionState();

  if (step === stepNames.submission) {
    return subState;
  }

  // Cancelled submission affects all states
  if (hasCancelled) { return stepStates.cancelled; }

  if (step === stepNames.myGrades) {
    return hasReceivedFinalGrade ? stepStates.completed : stepStates.notAvailable;
  }

  // For Assessment steps
  if (stepIndex < activeStepIndex) { return stepStates.completed; }
  if (stepIndex > activeStepIndex) { return stepStates.notAvailable; }

  // only check for closed or not-available on active step
  if (stepInfo[step]?.isClosed) {
    return stepInfo[step].closedReason === closedReasons.pastDue
      ? stepStates.closed
      : stepStates.notAvailable;
  }
  return stepStates.inProgress;
};

export const useXBlockState = () => {
  const activeStepState = useStepState({ step: useActiveStepName() });
  if ([
    stepStates.cancelled,
    stepStates.closed,
    stepStates.notAvailable,
  ].includes(activeStepState)) {
    return activeStepState;
  }
  return stepStates.inProgress;
};

export const useEffectiveGrade = () => {
  const { assessments } = usePageData();
  return assessments ? assessments[assessments.effectiveAssessmentType] : null;
};
