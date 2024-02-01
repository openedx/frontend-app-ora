import { when } from 'jest-when';

import { useIntl } from '@edx/frontend-platform/i18n';
import { formatMessage } from '@edx/react-unit-test-utils';

import useConfirmAction from './useConfirmAction';
import { useCloseAction } from './simpleActions';

import messages, { confirmTitles, confirmDescriptions } from './messages';
import useExitWithoutSavingAction from './useExitWithoutSavingAction';

jest.mock('./useConfirmAction', () => jest.fn());
jest.mock('./simpleActions', () => ({
  useCloseAction: jest.fn(),
}));

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
    it('loads close and confirm actions and i18n from hooks', () => {
      expect(useCloseAction).toHaveBeenCalledWith(messages.exitWithoutSaving);
      expect(useConfirmAction).toHaveBeenCalledWith();
      expect(useIntl).toHaveBeenCalledWith();
    });
  });
  describe('output confirmAction', () => {
    it('returns close action with exitWithoutSaving message', () => {
      expect(out.confirmAction.action).toEqual(closeAction(messages.exitWithoutSaving));
    });
    it('wraps with tidle and description from messages', () => {
      const { title, description } = out.confirmAction;
      expect(title).toEqual(formatMessage(confirmTitles.exit));
      expect(description).toEqual(formatMessage(confirmDescriptions.exit));
    });
  });
});
