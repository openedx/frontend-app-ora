import { useQueryClient, useMutation } from '@tanstack/react-query';

import * as api from 'data/services/lms/api';
import { queryKeys } from 'data/services/lms/constants';
import { AssessmentData } from 'data/services/lms/types';

import { useCreateMutationAction } from './utils';
export * from './files';

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

export const useRefreshPageData = () => {
  const queryClient = useQueryClient();
  return () => {
    queryClient.invalidateQueries({ queryKey: queryKeys.pageData });
    console.log("invalidated")
  };
}
