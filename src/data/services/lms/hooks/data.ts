import { useQuery, useMutation } from '@tanstack/react-query';

import { useMatch } from 'react-router-dom';
import { camelCaseObject } from '@edx/frontend-platform';

import routes from 'routes';
import * as types from '../types';
import { queryKeys } from '../constants';
import fakeData from '../fakeData';

export const useORAConfig = (): types.QueryData<types.ORAConfig> => {
  const { data, ...status } = useQuery({
    queryKey: [queryKeys.oraConfig],
    // queryFn: () => getAuthenticatedClient().get(...),
    queryFn: () => {
      const result = window.location.pathname.endsWith('text')
        ? fakeData.oraConfig.assessmentText
        : fakeData.oraConfig.assessmentTinyMCE;
      return Promise.resolve(result);
    },
  });
  return {
    ...status,
    data: data ? camelCaseObject(data) : {},
  };
};

export const usePageData = (): types.QueryData<types.PageData> => {
  const route = useMatch(routes.peerAssessment);
  const isAssessment = !!route && [routes.peerAssessment, routes.selfAssessment].includes(route.pattern.path)

  const { data, ...status } = useQuery({
    queryKey: [queryKeys.pageData, isAssessment],
    // queryFn: () => getAuthenticatedClient().get(...),
    queryFn: () => {
      const assessmentData = isAssessment
        ? fakeData.pageData.shapes.peerAssessment
        : fakeData.pageData.shapes.emptySubmission;

      const returnData = assessmentData ? {
        ...camelCaseObject(assessmentData),
        rubric: {
          optionsSelected: { ...assessmentData.rubric.options_selected },
          criterionFeedback: { ...assessmentData.rubric.criterion_feedback },
          overallFeedback: assessmentData.rubric.overall_feedback,
        },
      } : {};
      return Promise.resolve(returnData as any);
    },
  });
  return {
    ...status,
    data,
  };
};

export const useSubmitResponse = () => useMutation({
  mutationFn: (response) => {
    console.log({ submit: response });
    return Promise.resolve();
  },
});
