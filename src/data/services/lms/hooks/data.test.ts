import { when } from 'jest-when';
import { useQuery } from '@tanstack/react-query';
import { useViewStep } from 'hooks/routing';
import { useTestDataPath } from 'hooks/testHooks';

import { queryKeys } from 'constants/index';
import fakeData from '../fakeData';
import { loadState } from '../fakeData/dataStates';
import { useORAConfigUrl, usePageDataUrl } from '../urls';
import { loadData, logPageData, post } from './utils';
import { useMockORAConfig, useMockPageData } from './mockData';

import { useORAConfig, usePageData } from './data';

jest.mock('@tanstack/react-query', () => ({ useQuery: jest.fn() }));
jest.mock('hooks/routing', () => ({ useViewStep: jest.fn() }));
jest.mock('hooks/testHooks', () => ({
  useTestDataPath: jest.fn(() => null),
}));
jest.mock('./utils', () => ({
  loadData: jest.fn(),
  logPageData: jest.fn(),
  post: jest.fn(),
}));
jest.mock('../urls', () => ({
  useORAConfigUrl: jest.fn(),
  usePageDataUrl: jest.fn(),
}));
jest.mock('./mockData', () => ({
  useMockORAConfig: jest.fn(),
  useMockPageData: jest.fn(),
}));

when(useQuery)
  .calledWith(expect.anything())
  .mockImplementation(args => ({ useQuery: args }));

const viewStep = 'view-step';
when(useViewStep).calledWith().mockReturnValue(viewStep);
const oraConfigUrl = 'test-url';
when(useORAConfigUrl).calledWith().mockReturnValue(oraConfigUrl);
const pageDataUrl = (step) => ({ pageDataUrl: step });
when(usePageDataUrl).calledWith().mockReturnValue(pageDataUrl);
const mockORAConfig = fakeData.oraConfig.assessmentTinyMCE;
when(useMockORAConfig).calledWith().mockReturnValue(mockORAConfig);
when(loadData).calledWith(expect.anything()).mockImplementation(
  data => ({ loadData: data }),
);
when(logPageData).calledWith(expect.anything()).mockImplementation(data => data);
const postObj = (url, data) => ({ data: { post: { url, data } } });
when(post).calledWith(expect.anything(), expect.anything())
  .mockImplementation((url, data) => Promise.resolve(postObj(url, data)));
const mockPageData = loadState({ view: 'submission', progressKey: 'submission_saved' });
when(useMockPageData).calledWith().mockReturnValue(mockPageData);

const testDataPath = 'test-data-path';

let hook;
describe('lms service top-level data hooks', () => {
  describe('useORAConfig', () => {
    describe('behavior', () => {
      beforeEach(() => {
        hook = useORAConfig();
      });
      it('loads url from hook', () => {
        expect(useORAConfigUrl).toHaveBeenCalledWith();
      });
      it('loads testDataPath and mockORAConfig from hooks', () => {
        expect(useTestDataPath).toHaveBeenCalledWith();
        expect(useMockORAConfig).toHaveBeenCalledWith();
      });
    });
    describe('output', () => {
      describe('if testDataPath is set', () => {
        beforeEach(() => {
          when(useTestDataPath).calledWith().mockReturnValueOnce('test-data-path');
          hook = useORAConfig();
        });
        it('returns a useQuery call with inifite staleTime and oraConfig queryKey', () => {
          expect(hook.useQuery.queryKey).toEqual([queryKeys.oraConfig]);
          expect(hook.useQuery.staleTime).toEqual(Infinity);
        });
        it('returns mockORAConfig for queryFn', () => {
          expect(hook.useQuery.queryFn).toEqual(mockORAConfig);
        });
      });
      describe('if testDataPath is not set', () => {
        beforeEach(() => {
          hook = useORAConfig();
        });
        it('returns a useQuery call with inifite staleTime and oraConfig queryKey', () => {
          expect(hook.useQuery.queryKey).toEqual([queryKeys.oraConfig]);
          expect(hook.useQuery.staleTime).toEqual(Infinity);
        });
        describe('queryFn', () => {
          it('returns a callback based on oraConfigUrl', () => {
            expect(hook.useQuery.queryFn.useCallback.prereqs).toEqual([oraConfigUrl]);
          });
          it('posts empty object to oraConfigUrl, then calls loadData with result', async () => {
            await expect(hook.useQuery.queryFn.useCallback.cb())
              .resolves.toStrictEqual(loadData(postObj(oraConfigUrl, {})));
          });
        });
      });
    });
  });
  describe('usePageData', () => {
    describe('behavior', () => {
      beforeEach(() => {
        hook = usePageData();
      });
      it('loads url from hook', () => {
        expect(usePageDataUrl).toHaveBeenCalledWith();
      });
      it('loads testDataPath and mockORAConfig from hooks', () => {
        expect(useTestDataPath).toHaveBeenCalledWith();
        expect(useMockPageData).toHaveBeenCalledWith();
      });
    });
    describe('output', () => {
      describe('if testDataPath is set', () => {
        beforeEach(() => {
          when(useTestDataPath).calledWith().mockReturnValueOnce(testDataPath);
          hook = usePageData();
        });
        it('returns a useQuery call with inifite staleTime and oraConfig queryKey', () => {
          expect(hook.useQuery.queryKey).toEqual([queryKeys.pageData, testDataPath]);
          expect(hook.useQuery.staleTime).toEqual(Infinity);
        });
        it('returns mockORAConfig for queryFn', () => {
          expect(hook.useQuery.queryFn).toEqual(mockPageData);
        });
      });
      describe('if testDataPath is not set', () => {
        let url;
        let callback;
        beforeEach(() => {
          hook = usePageData();
          url = pageDataUrl(viewStep);
          callback = hook.useQuery.queryFn.useCallback;
        });
        it('returns a useQuery call with inifite staleTime and pageData queryKey', () => {
          expect(hook.useQuery.queryKey).toEqual([queryKeys.pageData, null]);
          expect(hook.useQuery.staleTime).toEqual(Infinity);
        });
        describe('queryFn', () => {
          it('returns a callback based on pageDataUrl', () => {
            expect(callback.prereqs).toEqual([pageDataUrl, viewStep]);
          });
          it('posts empty object to pageDataUrl, then calls loadData with result', async () => {
            await expect(callback.cb())
              .resolves.toStrictEqual(loadData(postObj(url, {})));
          });
        });
      });
    });
  });
});
