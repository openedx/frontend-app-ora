import React from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

// import { getAuthenticatedHttpClient } from '@edx/frontend-platform/auth';
import { camelCaseObject } from '@edx/frontend-platform';

import { useHasSubmitted } from 'data/redux/hooks'; // for test data
import { useTestProgressKey } from 'hooks/test';

import {
  routeSteps,
  queryKeys,
  stepNames,
  stepRoutes,
} from 'constants';
import { defaultViewProgressKeys, progressKeys } from 'constants/mockData';

import * as types from '../types';
// import { useORAConfigUrl, usePageDataUrl } from '../urls';

import fakeData from '../fakeData';

import { loadState } from '../fakeData/dataStates';

export const useORAConfig = (): types.QueryData<types.ORAConfig> => {
  // const oraConfigUrl = useORAConfigUrl();
  // getAuthenticatedHttpClient().get(oraConfigUrl).then(data => console.log({ oraConfig: data }));
  const { progressKey } = useParams();

  return useQuery({
    queryKey: [queryKeys.oraConfig],
    queryFn: () => {
      /*
      return getAuthenticatedHttpClient().post(oraConfigUrl, {}).then(
        ({ data }) => camelCaseObject(data)
      );
      */
      // console.log({ oraConfig: camelCaseObject(fakeData.oraConfig.assessmentTinyMCE) });
      if (progressKey === progressKeys.staffAfterSubmission) {
        return Promise.resolve(
          camelCaseObject(fakeData.oraConfig.assessmentStaffAfterSubmission)
        );
      }
      if (progressKey === progressKeys.staffAfterSelf) {
        return Promise.resolve(
          camelCaseObject(fakeData.oraConfig.assessmentStaffAfterSelf)
        );
      }
      return Promise.resolve(
        camelCaseObject(fakeData.oraConfig.assessmentTinyMCE)
      );
    },
  });
};

export const usePageData = () => {
  const location = useLocation();
  const view = location.pathname.split('/')[1];
  const hasSubmitted = useHasSubmitted();
  const viewStep = routeSteps[view];

  // const pageDataUrl = usePageDataUrl(view);
  const loadMockData = (key) => Promise.resolve(
    camelCaseObject(loadState({ view, progressKey: key })),
  );

  // test
  const testProgressKey = useTestProgressKey();
  const params = useParams();
  const viewKey = stepRoutes[viewStep];
  const progressKey = testProgressKey || params.progressKey || defaultViewProgressKeys[viewKey];
  const queryFn = React.useCallback((_testProgressKey) => {
    /*
    const url = hasSubmitted ? `${pageDataUrl}` : ${pageDataUrl}${view};
    return getAuthenticatedHttpClient().post(url, {}).then(
      ({ data }) => camelCaseObject(data)
    );
    */
    return Promise.resolve(camelCaseObject(loadState({ view, progressKey })));
  }, [view, progressKey, testProgressKey]);

  return useQuery({
    queryKey: [queryKeys.pageData, { testProgressKey }],
    queryFn,
  });
};

export const useSubmitResponse = () =>
  useMutation({
    mutationFn: (response) => {
      // console.log({ submit: response });
      return Promise.resolve();
    },
  });
