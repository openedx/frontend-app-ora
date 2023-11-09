import { useQueryClient, useMutation } from '@tanstack/react-query';

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
  const step = useViewStep();
  /*
  return () => {
    queryClient.invalidateQueries({ queryKey: queryKeys.pageData });
    console.log("invalidated")
  };
  */
  /* Test facilitation */
  return () => {
    let data;
    console.log("REFRESH");
    if (step === stepNames.studentTraining) {
      data = loadState({ view: stepRoutes[step], progressKey: progressKeys.studentTrainingPartial });
    } else if (step === stepNames.peer) {
      data = loadState({ view: stepRoutes[step], progressKey: progressKeys.peerAssessmentPartial });
    } else {
      return null;
    }
    return queryClient.setQueryData([queryKeys.pageData], data);
  };
}
