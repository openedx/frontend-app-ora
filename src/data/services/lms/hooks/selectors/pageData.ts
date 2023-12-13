import { closedReasons, stepStates } from 'constants/index';
import * as data from 'data/services/lms/hooks/data';
import * as types from 'data/services/lms/types';
import { useAssessmentStepConfig } from './oraConfig';

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// Page Data
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
export const usePageDataStatus = () => {
  const queryStatus = data.usePageData();
  return {
    isLoading: queryStatus.isLoading,
    isFetching: queryStatus.isFetching,
    isRefetching: queryStatus.isRefetching,
    isInitialLoading: queryStatus.isInitialLoading,
    isStale: queryStatus.isStale,
    status: queryStatus.status,
    error: queryStatus.error,
  };
};
export const useIsPageDataLoaded = (): boolean => {
  const pageData = data.usePageData();
  const { status } = pageData;
  return status === 'success';
};

export const usePageDataError = (): unknown => data.usePageData()?.error;

export const useIsPageDataLoading = (): boolean => {
  const pageData = data.usePageData();
  return pageData.isFetching || pageData.isRefetching;
};

export const usePageData = (): types.PageData | undefined => {
  const pageData = data.usePageData()?.data;
  if (process.env.NODE_ENV === 'development') {
    // @ts-ignore
    window.pageData = pageData;
  }
  return data.usePageData()?.data;
};

// progress
export const useProgressData = (): types.ProgressData | undefined => usePageData()?.progress;
export const useActiveStepName = (): string | undefined => useProgressData()?.activeStepName;
export const useStepInfo = () => useProgressData()?.stepInfo;

export const useSubmissionStatus = (): types.SubmissionStepInfo | undefined => (
  useStepInfo()?.submission
);
export const useSubmissionTeamInfo = (): types.SubmissionTeamInfo | null | undefined => (
  useSubmissionStatus()?.teamInfo
);
export const useHasCancelled = () => useSubmissionStatus()?.hasCancelled;
export const useCancellationInfo = () => {
  const { hasCancelled, cancelledBy, cancelledAt } = useSubmissionStatus() || {};
  return { hasCancelled, cancelledBy, cancelledAt };
};

// response
export const useResponseData = (): types.ResponseData | undefined => usePageData()?.response;

export const useSubmissionState = () => {
  const subStatus = useSubmissionStatus();
  const teamInfo = useSubmissionTeamInfo();

  if (teamInfo?.teamName === null) {
    return stepStates.needTeam;
  }

  if (subStatus?.hasCancelled) {
    return stepStates.cancelled;
  }

  if (subStatus?.hasSubmitted) {
    return stepStates.done;
  }
  if (subStatus?.closed) {
    if (subStatus?.closedReason === closedReasons.pastDue) {
      return stepStates.closed;
    }
    return stepStates.notAvailable;
  }
  if (!subStatus?.hasSubmitted && (teamInfo && teamInfo.hasSubmitted)) {
    return stepStates.teamAlreadySubmitted;
  }
  return stepStates.inProgress;
};

// Assessment
export const useAssessmentData = (): types.AssessmentsData | undefined => usePageData()?.assessment;
export const useHasReceivedFinalGrade = (): boolean => useAssessmentData() !== null;
export const useEffectiveGrade = () => {
  const assessment = useAssessmentData();
  return assessment ? assessment[assessment.effectiveAssessmentType] : null;
};

export const useTrainingStepIsCompleted = () => {
  const completed = useStepInfo()?.studentTraining?.numberOfAssessmentsCompleted;
  const needed = useAssessmentStepConfig()?.settings?.studentTraining?.numberOfExamples;
  return completed === needed;
};
