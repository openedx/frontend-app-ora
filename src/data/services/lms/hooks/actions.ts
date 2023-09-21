import { useQueryClient, useMutation } from '@tanstack/react-query';
import { queryKeys } from '../constants';
import { ActionMutationFunction, RubricData } from '../types';

import fakeData from '../fakeData';

export const createMutationAction = (mutationFn: ActionMutationFunction) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (...args) => mutationFn(...args, queryClient),
  });
};

export const submitRubric = () =>
  createMutationAction(async (data: RubricData, queryClient) => {
    // TODO: submit rubric
    await new Promise((resolve) => setTimeout(() => {
      fakeData.pageData.shapes.peerAssessment.rubric = {
        criterion_feedback: data.criterionFeedback,
        options_selected: data.optionsSelected,
        overall_feedback: data.overallFeedback,
      } as any;
      resolve(null);
    }, 1000));

    queryClient.invalidateQueries([queryKeys.pageData, true])

    return Promise.resolve(data);
  });

export const submitResponse = () =>
  createMutationAction(async (data: any, queryClient) => {
    // TODO: submit response
    await new Promise((resolve) => setTimeout(() => {
      fakeData.pageData.shapes.emptySubmission.submission = {
        ...fakeData.pageData.shapes.emptySubmission.submission,
        ...data,
      } as any;
      resolve(null);
    }, 1000));

    queryClient.invalidateQueries([queryKeys.pageData, false])

    return Promise.resolve(data);
  });

export const uploadFiles = () =>
  createMutationAction(async (data: any, queryClient) => {
    await new Promise((resolve) => setTimeout(() => {
      fakeData.pageData.shapes.emptySubmission.submission = {
        ...fakeData.pageData.shapes.emptySubmission.submission,
        ...data,
      } as any;
      resolve(null);
    }, 1000));

    queryClient.invalidateQueries([queryKeys.pageData, false])

    return Promise.resolve(data);
  });