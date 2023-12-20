import { when } from 'jest-when';
import { useQuery } from '@tanstack/react-query';

import { useHasSubmitted } from 'hooks/app';
import { useViewStep } from 'hooks/routing';
import { useIsMounted } from 'hooks/utils';

import { queryKeys } from 'constants/index';
import fakeData from '../fakeData';
import { loadState } from '../fakeData/dataStates';
import { useORAConfigUrl, usePageDataUrl } from '../urls';
import { loadData, logPageData, post } from './utils';
import { useMockORAConfig, useMockPageData } from './mockData';

import { useORAConfig, usePageData } from './data';

jest.mock('@tanstack/react-query', () => ({ useQuery: jest.fn() }));
jest.mock('hooks/routing', () => ({ useViewStep: jest.fn() }));
jest.mock('hooks/app', () => ({
  useHasSubmitted: jest.fn(),
}));
jest.mock('./utils', () => ({
  loadData: jest.fn(),
  logPageData: jest.fn(data => ({ logPageData: data })),
  post: jest.fn(),
}));
jest.mock('../urls', () => ({
  useORAConfigUrl: jest.fn(),
  usePageDataUrl: jest.fn(),
}));
jest.mock('hooks/utils', () => ({
  useIsMounted: jest.fn(),
}));

when(useQuery)
  .calledWith(expect.anything())
  .mockImplementation(args => ({ useQuery: args }));

const anonPage = 'anon-page-url';
const viewStep = 'view-step';
when(useViewStep).calledWith().mockReturnValue(viewStep);
const oraConfigUrl = 'test-url';
when(useORAConfigUrl).calledWith().mockReturnValue(oraConfigUrl);
when(loadData).calledWith(expect.anything()).mockImplementation(
  data => ({ loadData: data }),
);
const postObj = (url, data) => ({ data: { post: { url, data } } });
when(post).calledWith(expect.anything(), expect.anything())
  .mockImplementation((url, data) => Promise.resolve(postObj(url, data)));
const mockIsMounted = jest.fn().mockReturnValue({ current: true });
when(useIsMounted).calledWith().mockImplementation(mockIsMounted);
when(useHasSubmitted).calledWith().mockReturnValue(false);

const pageDataUrl = (hasSubmitted) => (step) => ({ pageDataUrl: { step, hasSubmitted } });
when(usePageDataUrl)
  .calledWith(true)
  .mockReturnValue(pageDataUrl(true))
  .calledWith(false)
  .mockReturnValue(pageDataUrl(false));

const testDataPath = 'test-data-path';

let hook;
describe('lms service top-level data hooks', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  describe('useORAConfig', () => {
    describe('behavior', () => {
      beforeEach(() => {
        hook = useORAConfig();
      });
      it('loads url and isMounted from hook', () => {
        expect(useORAConfigUrl).toHaveBeenCalledWith();
        expect(useIsMounted).toHaveBeenCalledWith();
      });
    });
    describe('output', () => {
      describe('if not mounted', () => {
        beforeEach(() => {
          mockIsMounted.mockReturnValueOnce({ current: false });
          hook = useORAConfig();
        });
        it('returns a useQuery call with inifite staleTime and oraConfig queryKey', () => {
          expect(hook.useQuery.queryKey).toEqual([queryKeys.oraConfig]);
          expect(hook.useQuery.staleTime).toEqual(Infinity);
        });
        describe('queryFn', () => {
          it('returns a callback based on oraConfigUrl', () => {
            expect(hook.useQuery.queryFn.useCallback.prereqs).toEqual([oraConfigUrl, { current: false }]);
          });
          it('posts empty object to oraConfigUrl, but loads null', async () => {
            await expect(hook.useQuery.queryFn.useCallback.cb()).resolves.toEqual(null);
          });
        });
      });
      describe('if mounted', () => {
        beforeEach(() => {
          hook = useORAConfig();
        });
        it('returns a useQuery call with inifite staleTime and oraConfig queryKey', () => {
          expect(hook.useQuery.queryKey).toEqual([queryKeys.oraConfig]);
          expect(hook.useQuery.staleTime).toEqual(Infinity);
        });
        describe('queryFn', () => {
          it('returns a callback based on oraConfigUrl', () => {
            expect(hook.useQuery.queryFn.useCallback.prereqs).toEqual([oraConfigUrl, { current: true }]);
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
        when(useHasSubmitted).calledWith().mockReturnValueOnce(true);
        hook = usePageData();
      });
      it('checks if step has been submitted', () => {
        expect(useHasSubmitted).toHaveBeenCalledWith();
      });
      it('loads url and isMounted from hook', () => {
        expect(usePageDataUrl).toHaveBeenCalledWith(true);
        expect(useIsMounted).toHaveBeenCalledWith();
      });
    });
    describe('output', () => {
      describe('if not mounted', () => {
        beforeEach(() => {
          mockIsMounted.mockReturnValueOnce({ current: false });
          hook = usePageData();
        });
        it('returns a useQuery call with inifite staleTime and oraConfig queryKey', () => {
          expect(hook.useQuery.queryKey).toEqual([queryKeys.pageData]);
          expect(hook.useQuery.staleTime).toEqual(Infinity);
        });
        describe('queryFn', () => {
          it('returns a callback based on pageDataUrl, viewStep, and isMounted', () => {
            expect(hook.useQuery.queryFn.useCallback.prereqs)
              .toEqual([pageDataUrl(false)(viewStep), { current: false }]);
          });
          it('posts empty object to oraConfigUrl, but loads null', async () => {
            await expect(hook.useQuery.queryFn.useCallback.cb()).resolves.toEqual(logPageData(null));
          });
        });
      });
      describe('if mounted', () => {
        describe('if submitted', () => {
          beforeEach(() => {
            when(useHasSubmitted).calledWith().mockReturnValueOnce(true);
            hook = usePageData();
          });
          it('returns a useQuery call with inifite staleTime and oraConfig queryKey', () => {
            expect(hook.useQuery.queryKey).toEqual([queryKeys.pageData]);
            expect(hook.useQuery.staleTime).toEqual(Infinity);
          });
        });
        describe('if not submitted', () => {
          let url;
          let callback;
          beforeEach(() => {
            when(useHasSubmitted).calledWith().mockReturnValueOnce(false);
            hook = usePageData();
            url = pageDataUrl(false)(viewStep);
            callback = hook.useQuery.queryFn.useCallback;
          });
          it('returns a useQuery call with inifite staleTime and pageData queryKey', () => {
            expect(hook.useQuery.queryKey).toEqual([queryKeys.pageData]);
            expect(hook.useQuery.staleTime).toEqual(Infinity);
          });
          describe('queryFn', () => {
            it('returns a callback based on pageDataUrl', () => {
              expect(callback.prereqs).toEqual([pageDataUrl(false)(viewStep), { current: true }]);
            });
            it('posts empty object to pageDataUrl, then calls loadData with result', async () => {
              await expect(callback.cb())
                .resolves.toStrictEqual(logPageData(loadData(postObj(url, {}))));
            });
          });
        });
      });
    });
  });
});
