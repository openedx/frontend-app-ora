import React from 'react';
import { useQuery } from '@tanstack/react-query';

import { queryKeys } from 'constants/index';

import { useHasSubmitted } from 'hooks/app';
import { useViewStep } from 'hooks/routing';
import { useIsMounted } from 'hooks/utils';

import * as types from '../types';
import { useORAConfigUrl, usePageDataUrl } from '../urls';

import { loadData, logPageData, post } from './utils';

export const useORAConfig = () => {
  const isMounted = useIsMounted();
  const oraConfigUrl = useORAConfigUrl();
  const apiMethod = React.useCallback(() => post(oraConfigUrl, {}).then((data) => {
    if (!isMounted.current) { return Promise.resolve(null); }
    return loadData(data);
  }), [oraConfigUrl, isMounted]);
  return useQuery({
    queryFn: apiMethod,
    queryKey: [queryKeys.oraConfig],
    staleTime: Infinity,
  });
};

export const usePageData = (): types.QueryData<types.PageData | undefined> => {
  const isMounted = useIsMounted();
  const viewStep = useViewStep();
  const pageDataUrl = usePageDataUrl(useHasSubmitted());
  const url = pageDataUrl(viewStep);

  const apiMethod = React.useCallback(
    () => post(url, {}).then(
      (data) => (isMounted.current ? loadData(data) : Promise.resolve(null)),
    ).then(logPageData),
    [url, isMounted],
  );

  return useQuery({
    queryKey: [queryKeys.pageData],
    queryFn: apiMethod,
    staleTime: Infinity,
  });
};
