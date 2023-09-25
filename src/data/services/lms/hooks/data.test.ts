import { useQuery } from '@tanstack/react-query';
import { useMatch } from 'react-router-dom';
import { camelCaseObject } from '@edx/frontend-platform';
import { when } from 'jest-when';

import routes from 'routes';
import * as types from '../types';
import { queryKeys } from '../constants';
import fakeData from '../fakeData';

import { useORAConfig, usePageData } from './data';

jest.mock('@tanstack/react-query', () => ({ useQuery: jest.fn() }));

jest.mock('react-router-dom', () => ({ useMatch: jest.fn() }));

interface QueryFn { (): string }
interface QueryArgs { queryKey: string, queryFn: QueryFn }

interface MockORAQuery extends QueryArgs { data: types.ORAConfig }
interface MockUseORAQuery { (QueryArgs): MockORAQuery }
interface MockORAUseConfigHook { (): MockORAQuery }

interface MockPageDataQuery extends QueryArgs { data: types.PageData }
interface MockUsePageDataQuery { (QueryArgs): MockPageDataQuery }
interface MockPageDataUseConfigHook { (): MockPageDataQuery }

let out;
describe('lms data hooks', () => {
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
      const old = window.location;
      Object.defineProperty(window, 'location', {
        value: new URL('http://dummy.com/text'),
        writable: true,
      });
      const response = await out.queryFn();
      expect(response).toEqual(fakeData.oraConfig.assessmentText);
      window.location = old;
    });
    it('initializes query with promise pointing to assessment tinyMCE', async () => {
      const response = await out.queryFn();
      expect(response).toEqual(fakeData.oraConfig.assessmentTinyMCE);
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
    const pageDataCamelCase = (data: any) => ({
      ...camelCaseObject(data),
      rubric: {
        optionsSelected: {...data.rubric.options_selected},
        criterionFeedback: {...data.rubric.criterion_feedback},
        overallFeedback: data.rubric.overall_feedback,
      },
    });
    const mockUseQuery = (data?: types.PageData): MockUsePageDataQuery => ({ queryKey, queryFn }) => ({
      data: data ? pageDataCamelCase(data) : {},
      queryKey,
      queryFn,
    });

    const mockUseQueryForPageData = (data, isAssessment) => {
      when(useQuery)
        .calledWith(expect.objectContaining({ queryKey: [queryKeys.pageData, isAssessment] }))
        .mockImplementationOnce(mockUseQuery(data));
    };

    const mockUseMatch = (path) => {
      when(useMatch)
        .calledWith(path)
        .mockReturnValueOnce({ pattern: { path } });
    };

    const testUsePageData = usePageData as unknown as MockPageDataUseConfigHook;
    describe('submission', () => {
      beforeEach(() => {
        mockUseMatch(routes.submission);
        mockUseQueryForPageData(fakeData.pageData.shapes.emptySubmission, false);
        out = testUsePageData();
      });
      it('initializes query with pageData queryKey and isAssessment: false', () => {
        expect(out.queryKey).toEqual([queryKeys.pageData, false]);
      });
      it('initializes query with promise pointing to empty submission page data', async () => {
        const response = await out.queryFn();
        expect(response).toEqual(pageDataCamelCase(fakeData.pageData.shapes.emptySubmission));
      });
      it('returns camelCase object from data if data has been returned', () => {
        expect(out.data).toEqual(pageDataCamelCase(fakeData.pageData.shapes.emptySubmission));
      });
    });
    describe('assessment', () => {
      beforeEach(() => {
        mockUseMatch(routes.peerAssessment);
        mockUseQueryForPageData(fakeData.pageData.shapes.peerAssessment, true);
        out = testUsePageData();
      });
      it('initializes query with pageData queryKey and isAssessment: true', () => {
        expect(out.queryKey).toEqual([queryKeys.pageData, true]);
      });
      it('initializes query with promise pointing to peer assessment page data', async () => {
        const response = await out.queryFn();
        expect(response).toEqual(pageDataCamelCase(fakeData.pageData.shapes.peerAssessment));
      });
      it('returns camelCase object from data if data has been returned', () => {
        expect(out.data).toEqual(pageDataCamelCase(fakeData.pageData.shapes.peerAssessment));
      });
    });
    it('returns empty object from data if data has not been returned', () => {
      mockUseMatch(routes.submission);
      mockUseQueryForPageData(undefined, false);
      out = testUsePageData();
      expect(out.data).toEqual({});
    });
  });
});
