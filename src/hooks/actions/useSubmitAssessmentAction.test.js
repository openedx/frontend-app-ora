import { useIntl } from '@edx/frontend-platform/i18n';
import { when } from 'jest-when';

import { MutationStatus, stepNames } from 'constants/index';
import { useIsAssessmentInvalid, useOnSubmit } from 'hooks/assessment';
import { useViewStep } from 'hooks/routing';
import { useIsMounted } from 'hooks/utils';
import useConfirmAction from './useConfirmAction';
import messages, {
  viewStepMessages,
  confirmTitles,
  confirmDescriptions,
} from './messages';
import useSubmitAssessmentAction from './useSubmitAssessmentAction';

jest.mock('hooks/assessment', () => ({
  useIsAssessmentInvalid: jest.fn(),
  useOnSubmit: jest.fn(),
}));
jest.mock('hooks/routing', () => ({
  useViewStep: jest.fn(),
}));
jest.mock('hooks/utils', () => ({
  useIsMounted: jest.fn(),
}));
jest.mock('./useConfirmAction', () => ({
  __esModule: true,
  default: jest.fn(),
}));

const mockOnSubmit = { onSubmit: jest.fn(), status: 'test-status' };
const mockUseConfirmAction = jest.fn(args => ({ confirmAction: args }));
when(useIsAssessmentInvalid).calledWith().mockReturnValue(false);
when(useOnSubmit).calledWith().mockReturnValue(mockOnSubmit);
when(useViewStep).calledWith().mockReturnValue(stepNames.peer);
when(useIsMounted).calledWith().mockReturnValue({ current: true });
when(useConfirmAction).calledWith().mockReturnValue(mockUseConfirmAction);

let out;
let actionToTest;

describe('useSubmitAssessmentAction', () => {
  describe('behavior', () => {
    it('loads state and behavior from hooks', () => {
      useSubmitAssessmentAction();
      expect(useIntl).toHaveBeenCalledWith();
      expect(useIsMounted).toHaveBeenCalledWith();
      expect(useOnSubmit).toHaveBeenCalledWith();
      expect(useViewStep).toHaveBeenCalledWith();
      expect(useConfirmAction).toHaveBeenCalledWith();
      expect(useIsAssessmentInvalid).toHaveBeenCalledWith();
    });
  });
  describe('output', () => {
    describe('null output states', () => {
      it('returns null action if not mounted', () => {
        when(useIsMounted).calledWith().mockReturnValueOnce({ current: false });
        expect(useSubmitAssessmentAction()).toEqual({ action: null });
      });
      it('returns null action if view step does not have a message', () => {
        when(useViewStep).calledWith().mockReturnValueOnce(stepNames.submission);
        expect(useSubmitAssessmentAction()).toEqual({ action: null });
      });
    });
    describe('valid action states', () => {
      const testAction = (viewStep = stepNames.peer) => {
        it('loads onClick and state from useOnSubmit', () => {
          expect(actionToTest.onClick).toEqual(mockOnSubmit.onSubmit);
          expect(actionToTest.state).toEqual(mockOnSubmit.status);
        });
        it('loads labels from messages, with view step', () => {
          expect(actionToTest.labels.default).toEqual(messages.submitGrade.defaultMessage.replace('{viewStep}', `${viewStepMessages[viewStep].defaultMessage} `));
          expect(actionToTest.labels[MutationStatus.loading])
            .toEqual(messages.submittingGrade.defaultMessage);
          expect(actionToTest.labels[MutationStatus.success])
            .toEqual(messages.gradeSubmitted.defaultMessage);
        });
      };
      describe('returned action without confirm for studentTraining step', () => {
        beforeEach(() => {
          when(useViewStep).calledWith().mockReturnValueOnce(stepNames.studentTraining);
          out = useSubmitAssessmentAction();
          actionToTest = out.action;
        });
        testAction(stepNames.studentTraining);
      });
      describe('returned action without confirm for invalid assessment', () => {
        beforeEach(() => {
          when(useIsAssessmentInvalid).calledWith().mockReturnValueOnce(true);
          out = useSubmitAssessmentAction();
          actionToTest = out.action;
        });
        testAction();
      });
      describe('returned action with confirm for valid assessment that is not studentTraining', () => {
        beforeEach(() => {
          out = useSubmitAssessmentAction();
          actionToTest = out.confirmAction.action;
        });
        testAction();
        it('wraps confirmAction in title and description from messages', () => {
          const { title, description } = out.confirmAction;
          expect(title)
            .toEqual(confirmTitles[stepNames.peer].defaultMessage);
          expect(description)
            .toEqual(confirmDescriptions.assessment.defaultMessage);
        });
      });
    });
  });
});
