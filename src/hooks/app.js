import * as lmsSelectors from 'data/services/lms/hooks/selectors';
import * as lmsActions from 'data/services/lms/hooks/actions';
import * as reduxHooks from 'data/redux/hooks';

export const {
  useHasSubmitted,
  useSetHasSubmitted,
  useSetShowTrainingError,
  useResponse,
  useSetResponse,
} = reduxHooks;

export const {
  useActiveStepName,
  useActiveStepConfig,
  useAssessmentData,
  useAssessmentStepConfig,
  useAssessmentStepOrder,
  useCancellationInfo,
  useEffectiveGradeStep,
  useFileUploadEnabled,
  useGlobalState,
  useHasReceivedFinalGrade,
  useORAConfigDataStatus,
  useIsORAConfigLoaded,
  useORAConfigDataError,
  useIsPageDataLoaded,
  useIsPageDataLoading,
  useORAConfigData,
  usePageDataStatus,
  usePageDataError,
  usePrompts,
  useResponseData,
  useRubricConfig,
  useStepInfo,
  useStepState,
  useSubmissionConfig,
  useTextResponses,
  useFileUploadConfig,
  useTrainingStepIsCompleted,
} = lmsSelectors;

export const {
  useFinishLater,
  useDeleteFile,
  useDownloadFiles,
  useRefreshPageData,
  useSaveDraftResponse,
  useSubmitResponse,
  useUploadFiles,
} = lmsActions;
