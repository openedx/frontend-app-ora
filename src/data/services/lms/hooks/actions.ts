import { useQueryClient, useMutation } from '@tanstack/react-query';
import { queryKeys } from '../constants';
import { ActionMutationFunction, AssessmentData } from '../types';

import fakeData from '../fakeData';

export const useCreateMutationAction = (mutationFn: ActionMutationFunction) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (...args) => mutationFn(...args, queryClient),
  });
};

export const useSubmitRubric = () => useCreateMutationAction(
  async (data: AssessmentData, queryClient) => {
    // TODO: submit rubric
    await new Promise((resolve) => setTimeout(() => {
      fakeData.pageData.shapes.peerAssessment.rubric = {
        criterion_feedback: data.criterionFeedback,
        options_selected: data.optionsSelected,
        overall_feedback: data.overallFeedback,
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
    await new Promise((resolve) => {
      console.log({ save: data });
      setTimeout(() => {
        resolve(null);
      }, 1000);
    });

    queryClient.invalidateQueries([queryKeys.pageData, false]);
    return Promise.resolve(data);
  },
);

export const fakeProgress = async (requestConfig) => {
  for (let i = 0; i <= 50; i++) {
    // eslint-disable-next-line no-await-in-loop, no-promise-executor-return
    await new Promise((resolve) => setTimeout(resolve, 100));
    requestConfig.onUploadProgress({ loaded: i, total: 50 });
  }
};

export const useUploadFiles = () => useCreateMutationAction(
  async (data: any) => {
    const { fileData, requestConfig } = data;
    const files = fileData.getAll('file');
    // TODO: upload files
    /*
     * const addFileResponse = await post(`{xblock_id}/handler/file/add`, file);
     * const uploadResponse = await(post(response.fileUrl, file));
     * post(`${xblock_id}/handler/download_url', (response));
     */
    await fakeProgress(requestConfig);
    return Promise.resolve();
  },
);

export const useDeleteFile = () => useCreateMutationAction(
  async (fileIndex, queryClient) => {
    await new Promise((resolve) => setTimeout(() => {
      fakeData.pageData.shapes.emptySubmission.submission.response = {
        ...fakeData.pageData.shapes.emptySubmission.submission.response,
        uploaded_files: [
          ...fakeData.pageData.shapes.emptySubmission.submission.response.uploaded_files.filter((_, index) => index !== fileIndex)
        ],
      } as any;
      resolve(null);
    }, 1000));

    queryClient.invalidateQueries([queryKeys.pageData, false]);
    return Promise.resolve(
      fakeData.pageData.shapes.emptySubmission.submission.response.uploaded_files,
    );
  },
);
