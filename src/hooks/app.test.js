import * as reduxHooks from 'data/redux/hooks';
import * as lmsSelectors from 'data/services/lms/hooks/selectors/index';
import * as lmsActions from 'data/services/lms/hooks/actions';

import * as exported from './app';

jest.mock('data/redux/hooks', () => ({
  useHasSubmitted: jest.fn(),
  useSetHasSubmitted: jest.fn(),
  useSetShowTrainingError: jest.fn(),
  useResponse: jest.fn(),
  useSetResponse: jest.fn(),
}));
jest.mock('data/services/lms/hooks/actions', () => ({
  useFinishLater: jest.fn(),
  useDeleteFile: jest.fn(),
  useDownloadFiles: jest.fn(),
  useRefreshPageData: jest.fn(),
  useSaveDraftResponse: jest.fn(),
  useSubmitResponse: jest.fn(),
  useUploadFiles: jest.fn(),
}));
jest.mock('data/services/lms/hooks/selectors', () => ({
  useActiveStepName: jest.fn(),
  useActiveStepConfig: jest.fn(),
  useAssessmentData: jest.fn(),
  useAssessmentStepConfig: jest.fn(),
  useAssessmentStepOrder: jest.fn(),
  useCancellationInfo: jest.fn(),
  useEffectiveGradeStep: jest.fn(),
  useGlobalState: jest.fn(),
  useHasReceivedFinalGrade: jest.fn(),
  useORAConfigDataStatus: jest.fn(),
  useIsORAConfigLoaded: jest.fn(),
  useORAConfigDataError: jest.fn(),
  useIsPageDataLoaded: jest.fn(),
  useIsPageDataLoading: jest.fn(),
  useORAConfigData: jest.fn(),
  usePageDataStatus: jest.fn(),
  usePageDataError: jest.fn(),
  usePrompts: jest.fn(),
  useResponseData: jest.fn(),
  useRubricConfig: jest.fn(),
  useStepInfo: jest.fn(),
  useStepState: jest.fn(),
  useSubmissionConfig: jest.fn(),
  useTextResponses: jest.fn(),
  useFileUploadConfig: jest.fn(),
  useTrainingStepIsCompleted: jest.fn(),
}));

describe('Assessment hooks', () => {
  describe('exported', () => {
    test('forwarded lms actions', () => {
      expect(lmsActions.useFinishLater).toEqual(exported.useFinishLater);
      expect(lmsActions.useDeleteFile).toEqual(exported.useDeleteFile);
      expect(lmsActions.useDownloadFiles).toEqual(exported.useDownloadFiles);
      expect(lmsActions.useRefreshPageData).toEqual(exported.useRefreshPageData);
      expect(lmsActions.useSaveDraftResponse).toEqual(exported.useSaveDraftResponse);
      expect(lmsActions.useSubmitResponse).toEqual(exported.useSubmitResponse);
      expect(lmsActions.useUploadFiles).toEqual(exported.useUploadFiles);
    });
    test('forwarded lms selector', () => {
      expect(lmsSelectors.useActiveStepName).toEqual(exported.useActiveStepName);
      expect(lmsSelectors.useActiveStepConfig).toEqual(exported.useActiveStepConfig);
      expect(lmsSelectors.useAssessmentData).toEqual(exported.useAssessmentData);
      expect(lmsSelectors.useAssessmentStepConfig).toEqual(exported.useAssessmentStepConfig);
      expect(lmsSelectors.useAssessmentStepOrder).toEqual(exported.useAssessmentStepOrder);
      expect(lmsSelectors.useCancellationInfo).toEqual(exported.useCancellationInfo);
      expect(lmsSelectors.useEffectiveGradeStep).toEqual(exported.useEffectiveGradeStep);
      expect(lmsSelectors.useGlobalState).toEqual(exported.useGlobalState);
      expect(lmsSelectors.useHasReceivedFinalGrade).toEqual(exported.useHasReceivedFinalGrade);
      expect(lmsSelectors.useORAConfigDataStatus).toEqual(exported.useORAConfigDataStatus);
      expect(lmsSelectors.useIsORAConfigLoaded).toEqual(exported.useIsORAConfigLoaded);
      expect(lmsSelectors.useORAConfigDataError).toEqual(exported.useORAConfigDataError);
      expect(lmsSelectors.useIsPageDataLoaded).toEqual(exported.useIsPageDataLoaded);
      expect(lmsSelectors.useIsPageDataLoading).toEqual(exported.useIsPageDataLoading);
      expect(lmsSelectors.useORAConfigData).toEqual(exported.useORAConfigData);
      expect(lmsSelectors.usePageDataStatus).toEqual(exported.usePageDataStatus);
      expect(lmsSelectors.usePageDataError).toEqual(exported.usePageDataError);
      expect(lmsSelectors.usePrompts).toEqual(exported.usePrompts);
      expect(lmsSelectors.useResponseData).toEqual(exported.useResponseData);
      expect(lmsSelectors.useRubricConfig).toEqual(exported.useRubricConfig);
      expect(lmsSelectors.useStepInfo).toEqual(exported.useStepInfo);
      expect(lmsSelectors.useStepState).toEqual(exported.useStepState);
      expect(lmsSelectors.useSubmissionConfig).toEqual(exported.useSubmissionConfig);
      expect(lmsSelectors.useTextResponses).toEqual(exported.useTextResponses);
      expect(lmsSelectors.useFileUploadConfig).toEqual(exported.useFileUploadConfig);
      expect(lmsSelectors.useTrainingStepIsCompleted).toEqual(exported.useTrainingStepIsCompleted);
    });

    test('forwarded redux hooks', () => {
      expect(reduxHooks.useHasSubmitted).toEqual(exported.useHasSubmitted);
      expect(reduxHooks.useSetHasSubmitted).toEqual(exported.useSetHasSubmitted);
      expect(reduxHooks.useSetShowTrainingError).toEqual(exported.useSetShowTrainingError);
      expect(reduxHooks.useResponse).toEqual(exported.useResponse);
      expect(reduxHooks.useSetResponse).toEqual(exported.useSetResponse);
    });
  });
});
