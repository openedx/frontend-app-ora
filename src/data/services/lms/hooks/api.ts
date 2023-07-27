import { useQuery } from '@tanstack/react-query';

import { camelCaseObject } from '@edx/frontend-platform';

import { queryKeys } from '../constants';
import { loadSubmissionData } from '../dataLoaders';
import fakeData from '../fakeData';

import type { QueryData, ORAConfig } from '../types';

/**
 * @return {ReactQueryData} ORA config data
 */
export const useORAConfig = (): QueryData<ORAConfig> => {
  const { data, ...status } = useQuery({
    queryKey: [queryKeys.oraConfig],
    // queryFn: () => getAuthenticatedClient().get(...),
    queryFn: () => Promise.resolve(fakeData.oraConfig.assessmentText),
  });
  return {
    ...status,
    data: data ? camelCaseObject(data) : {},
  };
};

/**
 * @return {ReactQueryData} Learner Submission data
 */
export const useSubmissionData = () => {
  const { data, ...status } = useQuery({
    queryKey: [queryKeys.submissionData],
    // queryFn: () => getAuthenticatedClient().get(...),
    queryFn: () => Promise.resolve(fakeData.submission.teamAssessment),
  });
  if (data) {
    // console.log({ data, loaded: loadSubmissionData(camelCaseObject(data)) });
  }
  return {
    ...status,
    data: data ? loadSubmissionData(camelCaseObject(data)) : {},
  };
};
