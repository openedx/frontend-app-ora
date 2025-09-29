import { when } from 'jest-when';

import { useCloseModal } from 'hooks/modal';

import * as actions from './simpleActions';
import messages from './messages';

jest.mock('hooks/modal', () => ({
  useCloseModal: jest.fn(),
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

const closeModal = jest.fn();
when(useCloseModal).calledWith().mockReturnValue(closeModal);

const onClick = jest.fn();
const message = { id: 'test.message', defaultMessage: 'Test Message' };

describe('simple action hooks', () => {
  describe('useSimpleAction', () => {
    it('formats the passed message', () => {
      expect(actions.useSimpleAction({ onClick, message }))
        .toEqual({ onClick, children: message.defaultMessage });
    });
  });
  describe('useCloseAction', () => {
    it('calls simple action with message and uses closeModal action', () => {
      expect(actions.useCloseAction(message))
        .toEqual({ action: { onClick: closeModal, children: message.defaultMessage } });
    });
  });
  describe('useExitAction', () => {
    it('returns close action with exit message', () => {
      expect(actions.useExitAction())
        .toEqual({ action: { onClick: closeModal, children: messages.exit.defaultMessage } });
    });
  });
});
