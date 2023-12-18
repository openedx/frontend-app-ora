import { getAuthenticatedHttpClient } from '@edx/frontend-platform/auth';
import { camelCaseObject } from '@edx/frontend-platform';

export const loadData = ({ data }) => camelCaseObject(data);

export const post = (...args) => getAuthenticatedHttpClient().post(...args);

export const fakeResponse = (data) => Promise.resolve(camelCaseObject(data));

export const logPageData = (data) => {
  if (process.env.NODE_ENV === 'development') {
    console.log({ pageData: data });
  }
  return data;
};
