import React from 'react';
import { useQuery } from '@tanstack/react-query';

import { queryKeys } from 'constants/index';

import { useViewStep } from 'hooks/routing';
import { useTestDataPath } from 'hooks/testHooks';

import * as types from '../types';
import { useORAConfigUrl, usePageDataUrl } from '../urls';

import { loadData, logPageData, post } from './utils';
import { useMockORAConfig, useMockPageData } from './mockData';

export const useORAConfig = (): types.QueryData<types.ORAConfig | undefined> => {
  const oraConfigUrl = useORAConfigUrl();
  const testDataPath = useTestDataPath();
  const mockORAConfig = useMockORAConfig();
  const apiMethod = React.useCallback(
    () => post(oraConfigUrl, {}).then(loadData),
    [oraConfigUrl],
  );
  return useQuery({
    queryKey: [queryKeys.oraConfig],
    queryFn: testDataPath ? mockORAConfig : apiMethod,
    staleTime: Infinity,
  });
};

export const usePageData = (): types.QueryData<types.PageData | undefined> => {
  const viewStep = useViewStep();
  const pageDataUrl = usePageDataUrl();

  const testDataPath = useTestDataPath();
  const mockPageData = useMockPageData();

  const apiMethod = React.useCallback(
    () => post(pageDataUrl(viewStep), {}).then(loadData).then(logPageData),
    [pageDataUrl, viewStep],
  );

  return useQuery({
    queryKey: [queryKeys.pageData, testDataPath],
    queryFn: testDataPath ? mockPageData : apiMethod,
    staleTime: Infinity,
  });
};
