import { useIntl } from '@edx/frontend-platform/i18n';
import { useCloseModal } from 'hooks/modal';

import messages from './messages';

export const useSimpleAction = ({ onClick, message }) => {
  const { formatMessage } = useIntl();
  return { onClick, children: formatMessage(message) };
};

export const useCloseAction = (message) => {
  const onClick = useCloseModal();
  const action = useSimpleAction({ onClick, message });
  return { action };
};

export const useExitAction = () => useCloseAction(messages.exit);
