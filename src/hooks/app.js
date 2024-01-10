import * as reduxHooks from 'data/redux/hooks';
import * as lmsActions from 'data/services/lms/hooks/actions';
import * as lmsSelectors from 'data/services/lms/hooks/selectors/index';

export const {
  useHasSubmitted,
  useSetHasSubmitted,
  useSetShowTrainingError,
  useResponse,
  useSetResponse,
} = reduxHooks;

export const {
  useFinishLater,
  useDeleteFile,
  useDownloadFiles,
  useRefreshPageData,
  useSaveDraftResponse,
  useSubmitResponse,
  useUploadFiles,
} = lmsActions;

export const {
  useActiveStepName,
  useActiveStepConfig,
  useAssessmentData,
  useAssessmentStepConfig,
  useAssessmentStepOrder,
  useCancellationInfo,
  useEffectiveGradeStep,
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
