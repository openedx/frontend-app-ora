import * as lmsSelectors from 'data/services/lms/hooks/selectors';
import * as lmsActions from 'data/services/lms/hooks/actions';
import * as reduxHooks from 'data/redux/hooks';

export const {
  useHasSubmitted,
  useSetHasSubmitted,
  useSetShowTrainingError,
} = reduxHooks;

export const {
  useActiveStepName,
  useActiveStepConfig,
  useAssessmentData,
  useAssessmentStepConfig,
  useAssessmentStepOrder,
  useEffectiveGradeStep,
  useGlobalState,
  useHasReceivedFinalGrade,
  useIsORAConfigLoaded,
  useIsPageDataLoaded,
  usePageDataStatus,
  usePrompts,
  useResponseData,
  useRubricConfig,
  useStepInfo,
  useStepState,
  useSubmissionConfig,
  useTextResponses,
  useFileUploadEnabled,
} = lmsSelectors;

export const {
  useDeleteFile,
  useDownloadFiles,
  useRefreshPageData,
  useSaveDraftResponse,
  useSubmitResponse,
  useUploadFiles,
} = lmsActions;
