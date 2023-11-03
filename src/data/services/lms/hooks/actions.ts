import { useQueryClient, useMutation } from '@tanstack/react-query';
import { queryKeys } from '../constants';
import { ActionMutationFunction, AssessmentData } from '../types';
import * as api from '../api';

import fakeData from '../fakeData';

export const useCreateMutationAction = (mutationFn: ActionMutationFunction) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (...args) => mutationFn(...args, queryClient),
  });
};

export const useSubmitAssessment = ({ onSuccess }) => useMutation({
  mutationFn: (data: AssessmentData) => (
    api.submitAssessment(data).then((response) => {
      console.log({ submitAssessmentResponse: response });
      return response;
    })
  ),
  onSuccess,
});

export const useSubmitResponse = () => useCreateMutationAction(
  async (data: any, queryClient) => {
    // TODO: submit response
    await api.submitResponse(data);
    queryClient.invalidateQueries([queryKeys.pageData, false]);
    return Promise.resolve(data);
  },
);

export const useSaveResponse = () => useCreateMutationAction(
  async (data: any, queryClient) => {
    // TODO: save response for later
    await api.saveResponse(data);
    // queryClient.invalidateQueries([queryKeys.pageData, false]);
    return Promise.resolve(data);
  },
);

export const useUploadFiles = () => useCreateMutationAction(
  async (data: any) => {
    await api.uploadFiles(data);
    return Promise.resolve();
  },
);

export const useDeleteFile = () => useCreateMutationAction(
  async (fileIndex, queryClient) => {
    await api.deleteFile(fileIndex);
    // queryClient.invalidateQueries([queryKeys.pageData, false]);
    return Promise.resolve(
      fakeData.pageData.shapes.emptySubmission.submission.response.uploaded_files,
    );
  },
);
