import React from 'react';
import { useParams } from 'react-router-dom';

import { useActiveView, useViewStep } from 'hooks/routing';
import { useTestProgressKey } from 'hooks/testHooks';
import { defaultViewProgressKeys, progressKeys } from 'constants/mockData';
import { stepRoutes } from 'constants/index';

import * as types from '../types';
import fakeData from '../fakeData';
import { loadState } from '../fakeData/dataStates';
import { fakeResponse } from './utils';

export const useProgressKey = (): string => {
  const params = useParams();
  const viewStep = useViewStep();
  const testProgressKey = useTestProgressKey();
  const viewKey = stepRoutes[viewStep];
  return testProgressKey || params.progressKey || defaultViewProgressKeys[viewKey];
};

export const oraConfigs = {
  [progressKeys.staffAfterSubmission]: fakeData.oraConfig.assessmentStaffAfterSubmission,
  [progressKeys.staffAfterSelf]: fakeData.oraConfig.assessmentStaffAfterSelf,
  default: fakeData.oraConfig.assessmentTinyMCE,
};

type ORAConfigEvent = () => Promise<types.ORAConfig>;
export const useMockORAConfig = (): ORAConfigEvent => {
  const progressKey = useProgressKey();
  const config = progressKey in oraConfigs ? oraConfigs[progressKey] : oraConfigs.default;
  return React.useCallback(() => fakeResponse(config), [config]);
};

type PageDataEvent = () => Promise<types.PageData>;
export const useMockPageData = (): PageDataEvent => {
  const view = useActiveView();
  const progressKey = useProgressKey();
  return React.useCallback(
    () => fakeResponse(loadState({ view, progressKey })),
    [view, progressKey],
  );
};
