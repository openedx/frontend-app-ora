import { useQuery, useMutation } from '@tanstack/react-query';

import { useSearchParams, useParams, matchRoutes, useLocation, useMatch } from 'react-router-dom';
import { camelCaseObject } from '@edx/frontend-platform';

import routes from 'routes';
import * as types from '../types';
import { queryKeys } from '../constants';
import fakeData from '../fakeData';

import { loadState } from '../fakeData/dataStates';

export const useORAConfig = (): types.QueryData<types.ORAConfig> => useQuery({
  queryKey: [queryKeys.oraConfig],
  queryFn: () => Promise.resolve(camelCaseObject(fakeData.oraConfig.assessmentTinyMCE)),
});

export const usePageData = (): types.QueryData<types.PageData> => {
  const location = useLocation();
  const view = location.pathname.split('/')[1];
  const { xblockId, progressKey } = useParams();
  return useQuery({
    queryKey: [queryKeys.pageData],
    queryFn: () => Promise.resolve(camelCaseObject(loadState({
      view,
      progressKey,
    }))),
  });
};

export const useSubmitResponse = () => useMutation({
  mutationFn: (response) => {
    console.log({ submit: response });
    return Promise.resolve();
  },
});
