import { useQuery } from '@tanstack/react-query';
import { useRouteMatch } from 'react-router-dom';
import { camelCaseObject } from '@edx/frontend-platform';
import { when } from 'jest-when';

import routes from 'routes';
import * as types from '../types';
import { queryKeys } from '../constants';
import fakeData from '../fakeData';

import { useORAConfig, usePageData } from './api';

jest.mock('@tanstack/react-query', () => ({ useQuery: jest.fn() }));

jest.mock('react-router-dom', () => ({ useRouteMatch: jest.fn() }));

interface QueryFn { (): string }
interface QueryArgs { queryKey: string, queryFn: QueryFn }

interface MockORAQuery extends QueryArgs { data: types.ORAConfig }
interface MockUseORAQuery { (QueryArgs): MockORAQuery }
interface MockORAUseConfigHook { (): MockORAQuery }

interface MockPageDataQuery extends QueryArgs { data: types.PageData }
interface MockUsePageDataQuery { (QueryArgs): MockPageDataQuery }
interface MockPageDataUseConfigHook { (): MockPageDataQuery }

let out;
describe('lms api hooks', () => {
  describe('useORAConfig', () => {
    const mockUseQuery = (hasData: boolean): MockUseORAQuery => ({ queryKey, queryFn }) => ({
      data: hasData ? camelCaseObject(fakeData.oraConfig.assessmentText) : undefined,
      queryKey,
      queryFn,
    });

    const mockUseQueryForORA = (hasData) => {
      when(useQuery)
        .calledWith(expect.objectContaining({ queryKey: [queryKeys.oraConfig] }))
        .mockImplementationOnce(mockUseQuery(hasData));
    };

    const testUseORAConfig = useORAConfig as unknown as MockORAUseConfigHook;

    beforeEach(() => {
      mockUseQueryForORA(true);
      out = testUseORAConfig();
    });
    it('initializes query with oraConfig queryKey', () => {
      expect(out.queryKey).toEqual([queryKeys.oraConfig]);
    });
    it('initializes query with promise pointing to assessment text', async () => {
      const response = await out.queryFn();
      expect(response).toEqual(fakeData.oraConfig.assessmentText);
    });
    it('returns camelCase object from data if data has been returned', () => {
      expect(out.data).toEqual(camelCaseObject(fakeData.oraConfig.assessmentText));
    });
    it('returns empty object from data if data has not been returned', () => {
      mockUseQueryForORA(false);
      out = testUseORAConfig();
      expect(out.data).toEqual({});
    });
  });
  describe('usePageData', () => {
    const mockUseQuery = (data?: types.PageData): MockUsePageDataQuery => ({ queryKey, queryFn }) => ({
      data: data ? camelCaseObject(data) : undefined,
      queryKey,
      queryFn,
    });

    const mockUseQueryForPageData = (data, isAssessment) => {
      when(useQuery)
        .calledWith(expect.objectContaining({ queryKey: [queryKeys.pageData, isAssessment] }))
        .mockImplementationOnce(mockUseQuery(data));
    };

    const mockUseRouteMatch = (path) => {
      when(useRouteMatch)
        .calledWith()
        .mockReturnValueOnce({ path });
    };

    const testUsePageData = usePageData as unknown as MockPageDataUseConfigHook;
    describe('submission', () => {
      beforeEach(() => {
        mockUseRouteMatch(routes.submission);
        mockUseQueryForPageData(fakeData.pageData.shapes.emptySubmission, false);
        out = testUsePageData();
      });
      it('initializes query with pageData queryKey and isAssessment: false', () => {
        expect(out.queryKey).toEqual([queryKeys.pageData, false]);
      });
      it('initializes query with promise pointing to empty submission page data', async () => {
        const response = await out.queryFn();
        expect(response).toEqual(fakeData.pageData.shapes.emptySubmission);
      });
      it('returns camelCase object from data if data has been returned', () => {
        expect(out.data).toEqual(camelCaseObject(fakeData.pageData.shapes.emptySubmission));
      });
    });
    describe('assessment', () => {
      beforeEach(() => {
        mockUseRouteMatch(routes.assessment);
        mockUseQueryForPageData(fakeData.pageData.shapes.peerAssessment, true);
        out = testUsePageData();
      });
      it('initializes query with pageData queryKey and isAssessment: true', () => {
        expect(out.queryKey).toEqual([queryKeys.pageData, true]);
      });
      it('initializes query with promise pointing to peer assessment page data', async () => {
        const response = await out.queryFn();
        expect(response).toEqual(fakeData.pageData.shapes.peerAssessment);
      });
      it('returns camelCase object from data if data has been returned', () => {
        expect(out.data).toEqual(camelCaseObject(fakeData.pageData.shapes.peerAssessment));
      });
    });
    it('returns empty object from data if data has not been returned', () => {
      mockUseRouteMatch(routes.submission);
      mockUseQueryForPageData(undefined, false);
      out = testUsePageData();
      expect(out.data).toEqual({});
    });
  });
});
