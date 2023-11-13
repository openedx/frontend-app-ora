import { useQueryClient, useMutation } from '@tanstack/react-query';

import { camelCaseObject } from '@edx/frontend-platform';

import { stepNames, stepRoutes, queryKeys } from 'constants';
import { progressKeys } from 'constants/mockData';

import * as api from 'data/services/lms/api';
import { AssessmentData } from 'data/services/lms/types';
import { loadState } from 'data/services/lms/fakeData/dataStates';

import { useViewStep } from 'hooks/routing';

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

export const useSubmitResponse = () => {
  const step = useViewStep();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => {
      const state = camelCaseObject(loadState({
        view: stepRoutes[step],
        progressKey: progressKeys.studentTraining,
      }));
      console.log({ state });
      queryClient.setQueryData([queryKeys.pageData], state);
      return Promise.resolve(state);
    },
  });
  /*
  return useCreateMutationAction(
    async (data: any, queryClient) => {
      // TODO: submit response
      await api.submitResponse(data);
      queryClient.invalidateQueries([queryKeys.pageData, false]);
    },
  );
  */
};

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
  const step = useViewStep();
  /*
  return () => {
    queryClient.invalidateQueries({ queryKey: queryKeys.pageData });
    console.log("invalidated")
  };
  */
  /* Test facilitation */
  return () => {
    console.log("REFRESH");
    return queryClient.invalidateQueries({ queryKey: queryKeys.pageData });
  };
};
