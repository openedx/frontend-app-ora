import { when } from 'jest-when';
import { useIntl } from '@edx/frontend-platform/i18n';
import { formatMessage } from '@edx/react-unit-test-utils';

import {
  usePageDataStatus,
  useRefreshPageData,
  useStepInfo,
} from 'hooks/app';
import { useResetAssessment } from 'hooks/assessment';
import { useEffectiveStep } from 'hooks/routing';
import { useIsMounted } from 'hooks/utils';
import { MutationStatus, stepNames } from 'constants/index';

import messages, { loadNextSteps } from './messages';
import * as hooks from './useLoadNextAction';

const useLoadNextAction = hooks.default;
jest.mock('hooks/app', () => ({
  usePageDataStatus: jest.fn(),
  useRefreshPageData: jest.fn(),
  useStepInfo: jest.fn(),
}));
jest.mock('hooks/assessment', () => ({
  useResetAssessment: jest.fn(),
}));
jest.mock('hooks/routing', () => ({
  useEffectiveStep: jest.fn(),
}));
jest.mock('hooks/utils', () => ({
  useIsMounted: jest.fn(),
}));

const resetAssessment = jest.fn();
const refreshPageData = jest.fn();
const pageDataStatus = { status: 'test-page-data-status' };
const stepInfo = {
  peer: { isWaitingForSubmissions: false },
};
when(useEffectiveStep).calledWith().mockReturnValue(stepNames.peer);
when(usePageDataStatus).calledWith().mockReturnValue(pageDataStatus);
when(useRefreshPageData).calledWith().mockReturnValue(refreshPageData);
when(useStepInfo).calledWith().mockReturnValue(stepInfo);
when(useResetAssessment).calledWith().mockReturnValue(resetAssessment);
when(useIsMounted).calledWith().mockReturnValue({ current: true });

let out;
describe('useLoadNextAction', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  describe('behavior', () => {
    it('loads state and actions from hooks', () => {
      out = useLoadNextAction();
      expect(useIntl).toHaveBeenCalledWith();
      expect(usePageDataStatus).toHaveBeenCalledWith();
      expect(useRefreshPageData).toHaveBeenCalledWith();
      expect(useStepInfo).toHaveBeenCalledWith();
      expect(useResetAssessment).toHaveBeenCalledWith();
      expect(useIsMounted).toHaveBeenCalledWith();
    });
  });
  describe('output', () => {
    it('returns null if step is not peer or student training', () => {
      when(useEffectiveStep).calledWith().mockReturnValueOnce(stepNames.submission);
      out = useLoadNextAction();
      expect(out).toBeNull();
      when(useEffectiveStep).calledWith().mockReturnValueOnce(stepNames.staff);
      out = useLoadNextAction();
      expect(out).toBeNull();
    });
    it('returns null if peer step but waiting for submissions', () => {
      when(useStepInfo).calledWith()
        .mockReturnValueOnce({ peer: { isWaitingForSubmissions: true } });
      out = useLoadNextAction();
      expect(out).toBeNull();
    });
    describe('valid state returned action', () => {
      it('loads state from usePageDataStatus and labels from messages', () => {
        out = useLoadNextAction();
        const { state, labels } = out.action;
        expect(state).toEqual(pageDataStatus.status);
        expect(labels.default).toEqual(
          `${formatMessage(messages.loadNext)} ${formatMessage(loadNextSteps[stepNames.peer])}`,
        );
        expect(labels[MutationStatus.idle]).toEqual(
          `${formatMessage(messages.loadNext)} ${formatMessage(loadNextSteps[stepNames.peer])}`,
        );
        expect(labels[MutationStatus.loading]).toEqual(
          `${formatMessage(messages.loadingNext)} ${formatMessage(loadNextSteps[stepNames.peer])}`,
        );
      });
      it('loads status from page data status', () => {
        const { state } = useLoadNextAction().action;
        expect(state).toEqual(pageDataStatus.status);
      });
      it('refreshes page data and assessment on click if mounted', () => {
        const { onClick } = useLoadNextAction().action;
        onClick.useCallback.cb();
        expect(refreshPageData).toHaveBeenCalledWith();
        expect(resetAssessment).toHaveBeenCalledWith();
      });
      it('does not refresh data or assessment if not mounted', () => {
        when(useIsMounted).calledWith().mockReturnValueOnce({ current: false });
        const { onClick } = useLoadNextAction().action;
        onClick.useCallback.cb();
        expect(refreshPageData).not.toHaveBeenCalled();
        expect(resetAssessment).not.toHaveBeenCalled();
      });
    });
  });
});
