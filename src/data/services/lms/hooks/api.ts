import { useQuery } from '@tanstack/react-query';

import { useRouteMatch } from 'react-router-dom';
import { camelCaseObject } from '@edx/frontend-platform';

import routes from 'routes';
import * as types from '../types';
import { queryKeys } from '../constants';
import fakeData from '../fakeData';

export const useORAConfig = (): types.QueryData<types.ORAConfig> => {
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

export const usePageData = (): types.QueryData<types.PageData> => {
  const route = useRouteMatch();
  const isAssessment = route.path === routes.assessment;
  const returnData = isAssessment
    ? fakeData.pageData.shapes.peerAssessment
    : fakeData.pageData.shapes.emptySubmission;
  const { data, ...status } = useQuery({
    queryKey: [queryKeys.submissionData, isAssessment],
    // queryFn: () => getAuthenticatedClient().get(...),
    queryFn: () => Promise.resolve(returnData),
  });
  return {
    ...status,
    data: data ? camelCaseObject(data) : {},
  };
};
