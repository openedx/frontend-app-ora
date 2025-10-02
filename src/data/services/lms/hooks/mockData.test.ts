import { when } from 'jest-when';
import { useParams } from 'react-router-dom';
import { useActiveView, useViewStep } from 'hooks/routing';
import { useTestProgressKey } from 'hooks/testHooks';
import {
  defaultViewProgressKeys,
  progressKeys,
  viewKeys,
} from 'constants/mockData';
import { stepNames } from 'constants/index';
import { loadState } from '../fakeData/dataStates';
import { fakeResponse } from './utils';

import * as mockData from './mockData';

jest.mock('react-router-dom', () => ({
  useParams: jest.fn(),
}));
jest.mock('hooks/routing', () => ({
  useActiveView: jest.fn(),
  useViewStep: jest.fn(),
}));
jest.mock('hooks/testHooks', () => ({
  useTestProgressKey: jest.fn(),
}));
jest.mock('../fakeData', () => ({
  oraConfig: {
    assessmentStaffAfterSubmission: 'staff-after-submission',
    assessmentStaffAfterSelf: 'staff-after-self',
    assessmentTinyMCE: 'tiny-mce',
  },
}));
jest.mock('../fakeData/dataStates', () => ({
  loadState: jest.fn(),
}));
jest.mock('./utils', () => ({
  fakeResponse: jest.fn(),
}));

jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useCallback: jest.fn((cb, prereqs) => ({ useCallback: { cb, prereqs } })),
}));

when(useViewStep).calledWith().mockReturnValue(stepNames.self);
when(fakeResponse).calledWith(expect.anything())
  .mockImplementation(data => ({ fakeResponse: data }));

let testValue;
let out;
describe('lms mock data hooks', () => {
  describe('useProgressKey', () => {
    it('returns testProgressKey if there is one', () => {
      testValue = progressKeys.submissionFinished;
      when(useTestProgressKey).calledWith().mockReturnValueOnce(testValue);
      expect(mockData.useProgressKey()).toEqual(testValue);
    });
    describe('if testProgressKey is not truthy', () => {
      it('returns params.progressKey if truthy', () => {
        testValue = progressKeys.peerAssessment;
        when(useParams).calledWith().mockReturnValueOnce({ progressKey: testValue });
        expect(mockData.useProgressKey()).toEqual(testValue);
      });
      describe('if params.progressKey is not set', () => {
        it('returns the defaultViewProgressKey for the view', () => {
          when(useParams).calledWith().mockReturnValueOnce({});
          testValue = progressKeys.peerAssessment;
          expect(mockData.useProgressKey())
            .toEqual(defaultViewProgressKeys[viewKeys.self]);
        });
      });
    });
  });
  describe('mock configs', () => {
    let progressKey;
    let progressKeySpy;
    beforeEach(() => {
      progressKeySpy = jest.spyOn(mockData, 'useProgressKey');
    });
    describe('useMockORAConfig', () => {
      describe('behavior', () => {
        it('loads progressKey from hook', () => {
          progressKey = progressKeys.selfAssessment;
          when(progressKeySpy).calledWith().mockReturnValueOnce(progressKey);
          mockData.useMockORAConfig();
          expect(progressKeySpy).toHaveBeenCalled();
        });
      });
      describe('output - useCallback hook', () => {
        it('returns fakeResponse of oraConfig for progressKey, based on config', () => {
          progressKey = progressKeys.selfAssessment;
          when(progressKeySpy).calledWith().mockReturnValueOnce(progressKey);
          out = mockData.useMockORAConfig();
          const config = mockData.oraConfigs.default;
          expect(out.useCallback.prereqs).toEqual([config]);
          expect(out.useCallback.cb()).toEqual(fakeResponse(config));
        });
        it('returns fakeResponse of default oraConfig based on config if not config', () => {
          progressKey = progressKeys.staffAfterSubmission;
          when(progressKeySpy).calledWith().mockReturnValueOnce(progressKey);
          out = mockData.useMockORAConfig();
          const config = mockData.oraConfigs[progressKey];
          expect(out.useCallback.prereqs).toEqual([config]);
          expect(out.useCallback.cb()).toEqual(fakeResponse(config));
        });
      });
    });
    describe('useMockPageData', () => {
      describe('behavior', () => {
        it('loads progressKey from hook', () => {
          progressKey = progressKeys.selfAssessment;
          when(progressKeySpy).calledWith().mockReturnValueOnce(progressKey);
          const testView = 'testView';
          when(useActiveView).calledWith().mockReturnValue(testView);
          mockData.useMockPageData();
          expect(progressKeySpy).toHaveBeenCalled();
          expect(useActiveView).toHaveBeenCalled();
        });
      });
      describe('output - useCallback hook', () => {
        it('returns fakeResponse of loadState({ view, progressKey })', () => {
          const testView = 'testView';
          when(useActiveView).calledWith().mockReturnValue(testView);
          progressKey = progressKeys.selfAssessment;
          when(progressKeySpy).calledWith().mockReturnValueOnce(progressKey);
          out = mockData.useMockPageData();
          expect(out.useCallback.prereqs).toEqual([testView, progressKey]);
          expect(out.useCallback.cb())
            .toEqual(fakeResponse(loadState({ view: testView, progressKey })));
        });
      });
    });
  });
});
