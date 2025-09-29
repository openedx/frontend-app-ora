import { when } from 'jest-when';

import { stepNames, MutationStatus } from 'constants/index';

import { useTextResponses, useHasSubmitted } from 'data/redux/hooks';
import { useFinishLater } from 'data/services/lms/hooks/actions';

import { useCloseModal } from 'hooks/modal';
import { useViewStep } from 'hooks/routing';

import messages from './messages';
import useFinishLaterAction from './useFinishLaterAction';

jest.mock('data/redux/hooks', () => ({
  useTextResponses: jest.fn(),
  useHasSubmitted: jest.fn(),
}));
jest.mock('data/services/lms/hooks/actions', () => ({
  useFinishLater: jest.fn(),
}));
jest.mock('hooks/modal', () => ({
  useCloseModal: jest.fn(),
}));
jest.mock('hooks/routing', () => ({
  useViewStep: jest.fn(),
}));

jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useCallback: jest.fn((cb, prereqs) => ({ useCallback: { cb, prereqs } })),
}));

jest.mock('@edx/frontend-platform/i18n', () => {
  const { formatMessage: fn } = jest.requireActual('../../testUtils.jsx');
  return {
    ...jest.requireActual('@edx/frontend-platform/i18n'),
    useIntl: () => ({
      formatMessage: fn,
    }),
  };
});

const textResponses = ['response1', 'response2'];
const finishLater = {
  mutateAsync: (args) => Promise.resolve(args),
  status: 'test-status',
};
const closeModal = jest.fn();
when(useTextResponses).calledWith().mockReturnValue(textResponses);
when(useHasSubmitted).calledWith().mockReturnValue(false);
when(useFinishLater).calledWith().mockReturnValue(finishLater);
when(useCloseModal).calledWith().mockReturnValue(closeModal);
when(useViewStep).calledWith().mockReturnValue(stepNames.submission);

describe('useFinishLaterAction', () => {
  describe('behavior', () => {
    it('loads state and actions from hooks', () => {
      useFinishLaterAction();
      expect(useViewStep).toHaveBeenCalledWith();
      expect(useTextResponses).toHaveBeenCalledWith();
      expect(useFinishLater).toHaveBeenCalledWith();
      expect(useHasSubmitted).toHaveBeenCalledWith();
      expect(useCloseModal).toHaveBeenCalledWith();
    });
  });
  describe('output', () => {
    it('returns null if not submission step', () => {
      when(useViewStep).calledWith().mockReturnValueOnce(stepNames.peer);
      const result = useFinishLaterAction();
      expect(result).toBeNull();
    });
    it('returns null if has submitted', () => {
      when(useHasSubmitted).calledWith().mockReturnValueOnce(true);
      const result = useFinishLaterAction();
      expect(result).toBeNull();
    });
    describe('returned action for unsubmitted submission view', () => {
      test('onClick is closeModal if invalid (all responses empty)', () => {
        when(useTextResponses).calledWith().mockReturnValueOnce(['', '']);
        const { onClick } = useFinishLaterAction().action;
        expect(onClick).toEqual(closeModal);
      });
      test('onClick is saveDraft callback if valid', async () => {
        const { onClick } = useFinishLaterAction().action;
        const { cb, prereqs } = onClick.useCallback;
        expect(prereqs).toEqual([finishLater, textResponses, closeModal]);
        await cb();
        expect(closeModal).toHaveBeenCalledWith({ textResponses });
      });
      test('state from mutation status', () => {
        expect(useFinishLaterAction().action.state).toEqual(finishLater.status);
      });
      test('labels from messages', () => {
        const { labels } = useFinishLaterAction().action;
        expect(labels.default).toEqual(messages.finishLater.defaultMessage);
        expect(labels[MutationStatus.idle]).toEqual(messages.finishLater.defaultMessage);
        expect(labels[MutationStatus.loading]).toEqual(messages.savingResponse.defaultMessage);
      });
    });
  });
});
