import React from 'react';
import { useQueryClient, useMutation } from '@tanstack/react-query';

import { camelCaseObject } from '@edx/frontend-platform';

import { stepRoutes, queryKeys } from 'constants/index';
import { progressKeys } from 'constants/mockData';

import * as api from 'data/services/lms/api';
// import { AssessmentData } from 'data/services/lms/types';
import { loadState } from 'data/services/lms/fakeData/dataStates';
import { useTestDataPath } from 'hooks/testHooks';

import { useViewStep } from 'hooks/routing';

export * from './files';

const apiLog = (apiMethod, name) => (data) => apiMethod(data).then(response => {
  console.log({ [name]: response });
  return response;
});

export const useSubmitAssessment = ({ onSuccess } = { onSuccess: () => {} }) => {
  const apiFn = api.useSubmitAssessment();
  return useMutation({
    mutationFn: apiLog(apiFn, 'submittedAssessment'),
    onSuccess,
  });
};

export const useSubmitResponse = ({ onSuccess } = { onSuccess: () => {} }) => {
  const testDataPath = useTestDataPath();
  const step = useViewStep();
  const queryClient = useQueryClient();

  const mockFn = React.useCallback(() => {
    const state = camelCaseObject(loadState({
      view: stepRoutes[step],
      progressKey: progressKeys.studentTraining,
    }));
    queryClient.setQueryData([queryKeys.pageData], state);
    return Promise.resolve(state);
  }, [queryClient, step]);
  const apiFn = api.useSubmitResponse();

  return useMutation({
    mutationFn: apiLog(testDataPath ? mockFn : apiFn, 'submittedResponse'),
    onSuccess,
  });
};

export const useFinishLater = () => {
  // const queryClient = useQueryClient();
  const testDataPath = useTestDataPath();
  const apiFn = api.useSaveDraft();
  const mockFn = React.useCallback((data) => Promise.resolve(data), []);
  return useMutation({
    mutationFn: apiLog(testDataPath ? mockFn : apiFn, 'savedDraftResponse'),
  });
};

export const useSaveDraftResponse = () => {
  // const queryClient = useQueryClient();
  const testDataPath = useTestDataPath();
  const apiFn = api.useSaveDraft();
  const mockFn = React.useCallback((data) => Promise.resolve(data), []);
  return useMutation({
    mutationFn: apiLog(testDataPath ? mockFn : apiFn, 'savedDraftResponse'),
  });
};

export const useRefreshPageData = () => {
  const queryClient = useQueryClient();
  return () => queryClient.invalidateQueries({ queryKey: [queryKeys.pageData] });
};
