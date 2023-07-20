import { useQuery } from '@tanstack/react-query';

import { camelCaseObject } from '@edx/frontend-platform';

import { queryKeys } from '../constants';
import { loadORAConfigData, loadSubmissionData } from '../dataLoaders';
import fakeData from '../fakeData';

/**
 *  A react-query data object
 *  @typedef {Object} ReactQueryData
 *  @property {boolean} isLoading
 *  @property {boolean} isFetching
 *  @property {boolean} isInitialLoading
 *  @property {Object} error
 *  @property {Object} data
 */

/**
 * @return {ReactQueryData} ORA config data
 */
export const useORAConfig = () => {
  const { data, ...status } = useQuery({
    queryKey: [queryKeys.oraConfig],
    // queryFn: () => getAuthenticatedClient().get(...),
    queryFn: () => Promise.resolve(fakeData.oraConfig.assessmentText),
  });
  return {
    ...status,
    ...(data && { data: loadORAConfigData(camelCaseObject(data)) }),
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
  return {
    ...status,
    ...(data && { data: loadSubmissionData(camelCaseObject(data)) }),
  };
};
