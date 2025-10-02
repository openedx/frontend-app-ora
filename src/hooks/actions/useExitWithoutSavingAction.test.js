import { when } from 'jest-when';

import useConfirmAction from './useConfirmAction';
import { useCloseAction } from './simpleActions';

import messages, { confirmTitles, confirmDescriptions } from './messages';
import useExitWithoutSavingAction from './useExitWithoutSavingAction';

jest.mock('./useConfirmAction', () => jest.fn());
jest.mock('./simpleActions', () => ({
  useCloseAction: jest.fn(),
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

const closeAction = jest.fn().mockImplementation((msg) => ({ closeAction: msg }));
const confirmAction = jest.fn(args => ({ confirmAction: args }));
when(useConfirmAction).calledWith().mockReturnValue(confirmAction);
when(useCloseAction).calledWith(expect.anything()).mockImplementation(closeAction);

let out;
describe('useExitWithoutSavingAction', () => {
  beforeEach(() => {
    out = useExitWithoutSavingAction();
  });
  describe('behavior', () => {
    it('loads close and confirm actions from hooks', () => {
      expect(useCloseAction).toHaveBeenCalledWith(messages.exitWithoutSaving);
      expect(useConfirmAction).toHaveBeenCalledWith();
    });
  });
  describe('output confirmAction', () => {
    it('returns close action with exitWithoutSaving message', () => {
      expect(out.confirmAction.action).toEqual(closeAction(messages.exitWithoutSaving));
    });
    it('wraps with title and description from messages', () => {
      const { title, description } = out.confirmAction;
      expect(title).toEqual(confirmTitles.exit.defaultMessage);
      expect(description).toEqual(confirmDescriptions.exit.defaultMessage);
    });
  });
});
