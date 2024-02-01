import { when } from 'jest-when';
import { useIntl } from '@edx/frontend-platform/i18n';
import { formatMessage } from '@edx/react-unit-test-utils';

import { assessmentSteps, stepNames } from 'constants/index';
import { useIsRevisit } from 'hooks';
import { useHasSubmitted } from 'hooks/app';
import { useViewStep } from 'hooks/routing';

import useOnCloseModal from './useOnCloseModal';
import useFinishLaterAction from './useFinishLaterAction';
import useExitWithoutSavingAction from './useExitWithoutSavingAction';

import useCloseModalAction from './useCloseModalAction';

import messages from './messages';

jest.mock('hooks', () => ({
  useIsRevisit: jest.fn(),
}));
jest.mock('hooks/app', () => ({
  useHasSubmitted: jest.fn(),
}));
jest.mock('hooks/routing', () => ({
  useViewStep: jest.fn(),
}));
jest.mock('./useOnCloseModal', () => jest.fn());
jest.mock('./useFinishLaterAction', () => jest.fn());
jest.mock('./useExitWithoutSavingAction', () => jest.fn());

when(useIsRevisit).calledWith().mockReturnValue(false);
when(useHasSubmitted).calledWith().mockReturnValue(false);
when(useViewStep).calledWith().mockReturnValue(stepNames.peer);
const onCloseModal = jest.fn();
when(useOnCloseModal).calledWith().mockReturnValue(onCloseModal);
const finishLaterAction = jest.fn();
when(useFinishLaterAction).calledWith().mockReturnValue(finishLaterAction);
const exitWithoutSavingAction = jest.fn();
when(useExitWithoutSavingAction).calledWith().mockReturnValue(exitWithoutSavingAction);

let out;
describe('useCloseModalAction', () => {
  describe('behavior', () => {
    it('loads state and actions from hooks', () => {
      out = useCloseModalAction();
      expect(useIntl).toHaveBeenCalledWith();
      expect(useOnCloseModal).toHaveBeenCalledWith();
      expect(useHasSubmitted).toHaveBeenCalledWith();
      expect(useIsRevisit).toHaveBeenCalledWith();
      expect(useViewStep).toHaveBeenCalledWith();
      expect(useFinishLaterAction).toHaveBeenCalledWith();
      expect(useExitWithoutSavingAction).toHaveBeenCalledWith();
    });
  });
  describe('output', () => {
    const testSimpleAction = (toTest) => {
      expect(toTest.action.children).toEqual(formatMessage(messages.close));
      expect(toTest.action.onClick).toEqual(onCloseModal);
    };
    describe('submission view', () => {
      beforeEach(() => {
        when(useViewStep).calledWith().mockReturnValueOnce(stepNames.submission);
      });
      it('returns simple close for revisit state', () => {
        when(useIsRevisit).calledWith().mockReturnValueOnce(true);
        out = useCloseModalAction();
        testSimpleAction(out);
      });
      it('returns simple close for submitted state', () => {
        when(useHasSubmitted).calledWith().mockReturnValueOnce(true);
        out = useCloseModalAction();
        testSimpleAction(out);
      });
      it('returns finishLaterAction for non-revisit, non-submitted state', () => {
        out = useCloseModalAction();
        expect(out).toEqual(finishLaterAction);
      });
    });
    describe('assessment view', () => {
      describe('has submitted', () => {
        it.each(assessmentSteps)('returns simpleClose action for %s step', (step) => {
          when(useViewStep).calledWith().mockReturnValueOnce(step);
          when(useHasSubmitted).calledWith().mockReturnValueOnce(true);
          out = useCloseModalAction();
          testSimpleAction(out);
        });
      });
      describe('has not submitted', () => {
        it.each(assessmentSteps)('returns exitWithoutSavingAction for %s step', (step) => {
          when(useViewStep).calledWith().mockReturnValueOnce(step);
          when(useHasSubmitted).calledWith().mockReturnValueOnce(false);
          out = useCloseModalAction();
          expect(out).toEqual(exitWithoutSavingAction);
        });
      });
    });
    test('graded view returns simple close', () => {
      when(useViewStep).calledWith().mockReturnValueOnce(stepNames.done);
      out = useCloseModalAction();
      testSimpleAction(out);
    });
  });
});

export default useCloseModalAction;
