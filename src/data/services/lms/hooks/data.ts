import { useQuery, useMutation } from '@tanstack/react-query';

import { useParams, useLocation } from 'react-router-dom';
import { camelCaseObject } from '@edx/frontend-platform';
import { getAuthenticatedHttpClient } from '@edx/frontend-platform/auth';

import * as types from '../types';
import { useORAConfigUrl, usePageDataUrl } from '../urls';
import fakeData from '../fakeData';
import { queryKeys } from '../constants';

import { loadState } from '../fakeData/dataStates';

export const useORAConfig = (): types.QueryData<types.ORAConfig> => {
  const oraConfigUrl = useORAConfigUrl();
  // getAuthenticatedHttpClient().get(oraConfigUrl).then(data => console.log({ oraConfig: data }));
  return useQuery({
    queryKey: [queryKeys.oraConfig],
    queryFn: () => {
      /*
      return getAuthenticatedHttpClient().post(oraConfigUrl, {}).then(
        ({ data }) => camelCaseObject(data)
      );
      */
      console.log({ oraConfig: camelCaseObject(fakeData.oraConfig.assessmentTinyMCE) });
      return Promise.resolve(
        camelCaseObject(fakeData.oraConfig.assessmentTinyMCE)
      );
    },
  });
};

export const usePageData = (): types.QueryData<types.PageData> => {
  const location = useLocation();
  const { progressKey } = useParams();
  const view = location.pathname.split('/')[1];
  const pageDataUrl = usePageDataUrl(view);

  return useQuery({
    queryKey: [queryKeys.pageData],
    queryFn: () => {
      /*
      return getAuthenticatedHttpClient().post(pageDataUrl, {}).then(
        ({ data }) => camelCaseObject(data)
      );
      */
      return Promise.resolve(camelCaseObject(loadState({ view, progressKey })));
    },
  });
};

export const useSubmitResponse = () =>
  useMutation({
    mutationFn: (response) => {
      console.log({ submit: response });
      return Promise.resolve();
    },
  });
