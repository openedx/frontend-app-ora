import React from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

import { getAuthenticatedHttpClient } from '@edx/frontend-platform/auth';
import { camelCaseObject } from '@edx/frontend-platform';

import { useHasSubmitted } from 'data/redux/hooks'; // for test data
import {
  useTestProgressKey,
  useTestDataPath,
} from 'hooks/testHooks';

import {
  routeSteps,
  queryKeys,
  stepNames,
  stepRoutes,
} from 'constants/index';
import { defaultViewProgressKeys, progressKeys } from 'constants/mockData';

import * as types from '../types';
import { useORAConfigUrl, usePageDataUrl } from '../urls';

import fakeData from '../fakeData';

import { loadState } from '../fakeData/dataStates';

export const useORAConfig = (): types.QueryData<types.ORAConfig | undefined> => {
  const oraConfigUrl = useORAConfigUrl();
  const testDataPath = useTestDataPath();
  const { progressKey } = useParams();

  return useQuery({
    queryKey: [queryKeys.oraConfig],
    queryFn: () => {
      if (testDataPath) {
        if (progressKey === progressKeys.staffAfterSubmission) {
          return Promise.resolve(
            camelCaseObject(fakeData.oraConfig.assessmentStaffAfterSubmission),
          );
        }
        if (progressKey === progressKeys.staffAfterSelf) {
          return Promise.resolve(
            camelCaseObject(fakeData.oraConfig.assessmentStaffAfterSelf),
          );
        }
        return Promise.resolve(
          camelCaseObject(fakeData.oraConfig.assessmentTinyMCE),
        );
      }
      return getAuthenticatedHttpClient().post(oraConfigUrl, {}).then(
        ({ data }) => camelCaseObject(data),
      );
    },
    staleTime: Infinity,
  });
};

export const usePageData = () => {
  const location = useLocation();
  const view = location.pathname.split('/')[1];
  const hasSubmitted = useHasSubmitted();
  const viewStep = routeSteps[view];

  const testDataPath = useTestDataPath();

  const pageDataUrl = usePageDataUrl();

  // test
  const testProgressKey = useTestProgressKey();
  const params = useParams();
  const viewKey = stepRoutes[viewStep];
  const progressKey = testProgressKey || params.progressKey || defaultViewProgressKeys[viewKey];

  const queryFn = () => {
    if (testDataPath) {
      return Promise.resolve(camelCaseObject(loadState({ view, progressKey })));
    }
    const url = (hasSubmitted || view === stepNames.xblock)
      ? pageDataUrl()
      : pageDataUrl(viewStep);
    console.log({ pageDataUrl: url });
    console.log({ params });
    return getAuthenticatedHttpClient().post(url, {})
      .then(({ data }) => camelCaseObject(data))
      .then(data => {
        console.log({ pageData: data });
        return data;
      });
  };

  return useQuery({
    queryKey: [queryKeys.pageData, testDataPath],
    queryFn,
    staleTime: Infinity,
  });
};
