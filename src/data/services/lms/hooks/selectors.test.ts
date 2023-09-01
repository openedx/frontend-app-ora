import { when } from 'jest-when';
import { keyStore } from '@edx/react-unit-test-utils';

import * as data from './data';
import * as selectors from './selectors';

const statusData = {
  isLoading: 'is-loading',
  isFetching: 'is-fetching',
  isInitialLoading: 'is-initial-loading',
  status: 'status',
  error: 'error',
};

const testValue = 'some-test-data';

const dataKeys = keyStore(data);
const selectorKeys = keyStore(selectors);

const mockHook = (module, key, returnValue) => {
  const spy = jest.spyOn(module, key);
  when(spy).calledWith().mockReturnValueOnce(returnValue);
};

describe('lms data selector hooks', () => {
  const mockORAConfig = (returnValue) => {
    mockHook(data, dataKeys.useORAConfig, returnValue);
  };
  const mockORAData = (returnValue) => {
    mockHook(selectors, selectorKeys.useORAConfigData, returnValue);
  };
  describe('ORA Config selectors', () => {
    describe('useORAConfigDataStatus', () => {
      it('returns status data from useORAConfig call', () => {
        mockORAConfig({
          ...statusData,
          other: 'field',
          and: 'another one',
        });
        expect(selectors.useORAConfigDataStatus()).toEqual(statusData);
      });
    });
    describe('useIsORAConfigLoaded', () => {
      it('returns true if ORAConfig.status is "success"', () => {
        mockORAConfig({ ...statusData, status: 'success' });
        expect(selectors.useIsORAConfigLoaded()).toEqual(true);
      });
      it('returns false if ORAConfig.status is not "success"', () => {
        mockORAConfig({ ...statusData, status: 'random' });
        expect(selectors.useIsORAConfigLoaded()).toEqual(false);
      });
    });
    describe('useORAConfigData', () => {
      it('returns data from ORAConfig', () => {
        mockORAConfig({ ...statusData, data: testValue });
        expect(selectors.useORAConfigData()).toEqual(testValue);
      });
    });
    describe('useSubmissionConfig', () => {
      it('returns submissionConfig from ORAConfigData', () => {
        mockORAData({ submissionConfig: testValue });
        expect(selectors.useSubmissionConfig()).toEqual(testValue);
      });
    });
    describe('useAssessmentStepConfig', () => {
      it('returns assessmentSteps from ORAConfigData', () => {
        mockORAData({ assessmentSteps: testValue });
        expect(selectors.useAssessmentStepConfig()).toEqual(testValue);
      });
    });
    describe('useRubricConfig', () => {
      it('returns rubric from ORAConfigData', () => {
        mockORAData({ rubric: testValue });
        expect(selectors.useRubricConfig()).toEqual(testValue);
      });
    });
    describe('useLeaderboardConfig', () => {
      it('returns rubric from ORAConfigData', () => {
        mockORAData({ leaderboardConfig: testValue });
        expect(selectors.useLeaderboardConfig()).toEqual(testValue);
      });
    });
  });
  describe('Page Data selectors', () => {
    const mockPageDataQuery = (returnValue) => {
      mockHook(data, dataKeys.usePageData, returnValue);
    };
    const mockPageData = (returnValue) => {
      mockHook(selectors, selectorKeys.usePageData, returnValue);
    };
    describe('usePageDataStatus', () => {
      it('returns status data from useORAConfig call', () => {
        mockPageDataQuery({
          ...statusData,
          other: 'field',
          and: 'another one',
        });
        expect(selectors.usePageDataStatus()).toEqual(statusData);
      });
    });
    describe('useIsPageDataLoaded', () => {
      it('returns true if PageData.status is "success"', () => {
        mockPageDataQuery({ ...statusData, status: 'success' });
        expect(selectors.useIsPageDataLoaded()).toEqual(true);
      });
      it('returns false if PageData.status is not "success"', () => {
        mockPageDataQuery({ ...statusData, status: 'random' });
        expect(selectors.useIsPageDataLoaded()).toEqual(false);
      });
    });
    describe('usePageData', () => {
      it('returns data from PageData query', () => {
        mockPageDataQuery({ ...statusData, data: testValue });
        expect(selectors.usePageData()).toEqual(testValue);
      });
    });
    describe('useSubmissionTeamInfo', () => {
      it('returns submission team info from PageData', () => {
        mockPageData({ submission: { teamInfo: testValue } });
        expect(selectors.useSubmissionTeamInfo()).toEqual(testValue);
      });
    });
    describe('useSubmissionStatus', () => {
      it('returns hasCancelled, hasReceivedGraded, and hasSubmitted', () => {
        const submissionStatus = {
          hasCancelled: 'has-cancelled',
          hasReceivedGrade: 'has-received-grade',
          hasSubmitted: 'has-submitted',
        };
        mockPageData({ submission: { ...submissionStatus, other: 'fields' } });
        expect(selectors.useSubmissionStatus()).toEqual(submissionStatus);
      });
    });
    describe('useSubmissionResponse', () => {
      it('returns submission response from PageData', () => {
        mockPageData({ submission: { response: testValue } });
        expect(selectors.useSubmissionResponse()).toEqual(testValue);
      })
    });
  });
});
