import { getAuthenticatedHttpClient } from '@edx/frontend-platform/auth';
import { camelCaseObject } from '@edx/frontend-platform';
import * as utils from './utils';

jest.mock('@edx/frontend-platform/auth', () => ({
  getAuthenticatedHttpClient: jest.fn(),
}));
jest.mock('@edx/frontend-platform', () => ({
  camelCaseObject: jest.fn(obj => ({ camelCaseObject: obj })),
}));
const post = jest.fn((...args) => ({ post: args }));
getAuthenticatedHttpClient.mockReturnValue({ post });

const testValue = 'test-value';
const testValue2 = 'test-value-2';
const testObject = {
  testKey: 'test-value',
  testKey1: 'test-value-1',
};
describe('lms service hook utils', () => {
  describe('loadData', () => {
    it('returns camel-cased data object from input arg', () => {
      expect(utils.loadData({ data: testObject }))
        .toEqual(camelCaseObject(testObject));
    });
  });
  describe('post', () => {
    it('forwards the arguments to authenticated post request', () => {
      expect(utils.post(testValue, testValue2))
        .toEqual(getAuthenticatedHttpClient().post(testValue, testValue2));
    });
  });
  describe('fakeResponse', () => {
    it('returns a promise that resolves to camel-cased input', async () => {
      await expect(utils.fakeResponse(testObject))
        .resolves.toStrictEqual(camelCaseObject(testObject));
    });
  });
  describe('logPageData', () => {
    it('returns input data', () => {
      expect(utils.logPageData(testObject)).toEqual(testObject);
    });
  });
});
