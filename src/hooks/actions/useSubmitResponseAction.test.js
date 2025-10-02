import { when } from 'jest-when';

import { MutationStatus, stepNames } from 'constants/index';
import useConfirmAction from './useConfirmAction';
import messages, { confirmDescriptions, confirmTitles } from './messages';
import useSubmitResponseAction from './useSubmitResponseAction';

jest.mock('./useConfirmAction', () => ({
  __esModule: true,
  default: jest.fn(),
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

const options = {
  submit: jest.fn(),
  submitStatus: 'test-submit-status',
  validateBeforeConfirmation: jest.fn(),
};

const mockConfirmAction = jest.fn(args => ({ confirmAction: args }));
when(useConfirmAction).calledWith(options.validateBeforeConfirmation).mockReturnValue(mockConfirmAction);

let out;
describe('useSubmitResponseAction', () => {
  beforeEach(() => {
    out = useSubmitResponseAction({ options });
  });
  describe('behavior', () => {
    it('loads confirm action from hooks', () => {
      expect(useConfirmAction).toHaveBeenCalledWith(options.validateBeforeConfirmation);
    });
  });
  describe('output confirmAction', () => {
    it('returns a confirmAction with title and description from messages', () => {
      const { title, description } = out.confirmAction;
      expect(title).toEqual(confirmTitles[stepNames.submission].defaultMessage);
      expect(description).toEqual(confirmDescriptions[stepNames.submission].defaultMessage);
    });
    test('passed action loads cb and status from params and labels from messages', () => {
      const { onClick, state, labels } = out.confirmAction.action;
      expect(onClick).toEqual(options.submit);
      expect(state).toEqual(options.submitStatus);
      expect(labels).toEqual({
        default: messages.submitResponse.defaultMessage,
        [MutationStatus.loading]: messages.submittingResponse.defaultMessage,
      });
    });
  });
});
