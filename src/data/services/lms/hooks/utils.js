import { getAuthenticatedHttpClient } from '@edx/frontend-platform/auth';
import { camelCaseObject } from '@edx/frontend-platform';

import { progressKeys } from 'constants/mockData';

import fakeData from '../fakeData';

export const loadData = ({ data }) => camelCaseObject(data);

export const post = (...args) => getAuthenticatedHttpClient().post(...args);

export const fakeResponse = (data) => Promise.resolve(camelCaseObject(data));

export const oraConfigs = {
  [progressKeys.staffAfterSubmission]: fakeData.oraConfig.assessmentStaffAfterSubmission,
  [progressKeys.staffAfterSelf]: fakeData.oraConfig.assessmentStaffAfterSelf,
  default: fakeData.oraConfig.assessmentStaffAfterSelf,
};

export const logPageData = (data => {
  console.log({ pageData: data });
  return data;
});
