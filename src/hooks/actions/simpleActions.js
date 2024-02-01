import { useIntl } from '@edx/frontend-platform/i18n';
import { useCloseModal } from 'hooks/modal';

import messages from './messages';

/**
 * useSimpleAction({ onClick, message })
 * @description Hook to create a simple action object for an ActionButton.
 * @param {function} onClick - The onClick handler for the action.
 * @param {object} message - The message object for the action.
 * @returns {object} - The action object.
 */
export const useSimpleAction = ({ onClick, message }) => {
  const { formatMessage } = useIntl();
  return { onClick, children: formatMessage(message) };
};

/**
 * useCloseAction(message)
 * @description Hook to create a simple action object for an ActionButton that closes the modal.
 * @param {object} message - The message object for the action.
 * @returns {object} - The action object.
 */
export const useCloseAction = (message) => {
  const onClick = useCloseModal();
  const action = useSimpleAction({ onClick, message });
  return { action };
};

/**
 * useExitAction()
 * @description Hook to create a simple action object for an ActionButton that closes the modal.
 * @returns {object} - The action object.
 */
export const useExitAction = () => useCloseAction(messages.exit);
