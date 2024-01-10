import { useIntl } from '@edx/frontend-platform/i18n';
import { formatMessage } from '@edx/react-unit-test-utils';
import { when } from 'jest-when';

import { MutationStatus, stepNames } from 'constants/index';
import useConfirmAction from './useConfirmAction';
import messages, { confirmDescriptions, confirmTitles } from './messages';
import useSubmitResponseAction from './useSubmitResponseAction';

jest.mock('./useConfirmAction', () => ({
  __esModule: true,
  default: jest.fn(),
}));

const mockConfirmAction = jest.fn(args => ({ confirmAction: args }));
when(useConfirmAction).calledWith().mockReturnValue(mockConfirmAction);

const options = {
  submit: jest.fn(),
  submitStatus: 'test-submit-status',
};

let out;
describe('useSubmitResponseAction', () => {
  beforeEach(() => {
    out = useSubmitResponseAction({ options });
  });
  describe('behavior', () => {
    it('loads internatioonalization and confirm action from hooks', () => {
      expect(useIntl).toHaveBeenCalledWith();
      expect(useConfirmAction).toHaveBeenCalledWith();
    });
  });
  describe('output confirmAction', () => {
    it('returns a confirmAction with title and description from messages', () => {
      const { title, description } = out.confirmAction;
      expect(title).toEqual(formatMessage(confirmTitles[stepNames.submission]));
      expect(description).toEqual(formatMessage(confirmDescriptions[stepNames.submission]));
    });
    test('passed action loads cb and status from params and labels from messages', () => {
      const { onClick, state, labels } = out.confirmAction.action;
      expect(onClick).toEqual(options.submit);
      expect(state).toEqual(options.submitStatus);
      expect(labels).toEqual({
        default: formatMessage(messages.submitResponse),
        [MutationStatus.loading]: formatMessage(messages.submittingResponse),
      });
    });
  });
});
