import { queryKeys } from '../../constants';
import { AssessmentData, UploadedFile } from '../../types';

import fakeData from '../../fakeData';

import { useCreateMutationAction } from './utils';

export * from './files';

export const useSubmitRubric = () => useCreateMutationAction(
  async (data: AssessmentData, queryClient) => {
    // TODO: submit rubric
    await new Promise((resolve) => setTimeout(() => {
      fakeData.pageData.shapes.peerAssessment.rubric = {
        overall_feedback: data.overallFeedback,
        assessment_criterions: data.assessmentCriterions.map((criterion) => ({
          selected_option: criterion.selectedOption,
          feedback: criterion.feedback,
        })),
      } as any;
      resolve(null);
    }, 1000));

    queryClient.invalidateQueries([queryKeys.pageData, true]);
    return Promise.resolve(data);
  },
);

export const useSubmitResponse = () => useCreateMutationAction(
  async (data: any, queryClient) => {
    // TODO: submit response
    await new Promise((resolve) => setTimeout(() => {
      fakeData.pageData.shapes.emptySubmission.submission.response = {
        uploaded_files: [
          ...data.response.uploadedFiles,
        ],
        text_responses: [
          ...data.response.textResponses,
        ],
      } as any;
      resolve(null);
    }, 1000));

    queryClient.invalidateQueries([queryKeys.pageData, false]);
    return Promise.resolve(data);
  },
);

export const useSaveResponse = () => useCreateMutationAction(
  async (data: any, queryClient) => {
    // TODO: save response for later
    await new Promise((resolve) => setTimeout(() => {
      fakeData.pageData.shapes.emptySubmission.submission.response = {
        uploaded_files: [
          ...data.response.uploadedFiles,
        ],
        text_responses: [
          ...data.response.textResponses,
        ],
      } as any;
      resolve(null);
    }, 1000));

    queryClient.invalidateQueries([queryKeys.pageData, false]);
    return Promise.resolve(data);
  },
);

