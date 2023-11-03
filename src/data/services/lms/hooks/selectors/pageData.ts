import {
  closedReasons,
  stepStates,
} from 'data/services/lms/constants';
import * as data from 'data/services/lms/hooks/data';
import * as types from 'data/services/lms/types';

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// Page Data
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
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
export const usePageData = (): types.PageData => {
  // console.log({ pageData: data.usePageData()?.data });
  return data.usePageData()?.data;
};

// progress
export const useProgressData = (): types.ProgressData => usePageData()?.progress;
export const useActiveStepName = (): string => useProgressData().activeStepName;
export const useStepInfo = () => useProgressData().stepInfo;

export const useSubmissionStatus = (): types.SubmissionStepInfo => useStepInfo().submission;
export const useSubmissionTeamInfo = (): types.SubmissionTeamInfo | null => (
  useSubmissionStatus().teamInfo
);
export const useHasCancelled = () => useSubmissionStatus().hasCancelled;
export const useCancellationInfo = () => {
  const { hasCancelled, cancelledBy, cancelledAt } = useSubmissionStatus();
  return { hasCancelled, cancelledBy, cancelledAt };
};

// response
export const useResponseData = (): types.ResponseData => usePageData().response;

export const useSubmissionState = () => {
  const subStatus = useSubmissionStatus();
  const teamInfo = useSubmissionTeamInfo();

  if (teamInfo?.teamName === null) {
    return stepStates.needTeam;
  }

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
  if (!subStatus.hasSubmitted && teamInfo && teamInfo.hasSubmitted) {
    return stepStates.teamAlreadySubmitted;
  }
  return stepStates.inProgress;
};

// Assessments
export const useAssessmentsData = (): types.AssessmentsData => {
  console.log({ pageData: usePageData() });
  return usePageData().assessments;
};
export const useHasReceivedFinalGrade = (): boolean => useAssessmentsData() !== null;
export const useEffectiveGrade = () => {
  const assessments = useAssessmentsData();
  return assessments ? assessments[assessments.effectiveAssessmentType] : null;
};
