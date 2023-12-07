import { useIntl } from '@edx/frontend-platform/i18n';
import { useCloseModal } from 'hooks/modal';

import messages from './messages';

export const useSimpleAction = ({ onClick, message }) => {
  const { formatMessage } = useIntl();
  return { onClick, children: formatMessage(message) };
};

export const useCloseAction = (message) => ({
  action: useSimpleAction({
    onClick: useCloseModal(),
    message,
  }),
});

export const useExitAction = () => useCloseAction(messages.exit);
