import { useIntl } from '@edx/frontend-platform/i18n';

import useConfirmAction from './useConfirmAction';
import { useCloseAction } from './simpleActions';

import messages, { confirmTitles, confirmDescriptions } from './messages';

const useExitWithoutSavingAction = () => {
  const { formatMessage } = useIntl();
  const closeAction = useCloseAction(messages.finishLater);
  const confirmAction = useConfirmAction();

  return confirmAction({
    action: {
      ...closeAction,
      children: formatMessage(messages.exitWithoutSaving),
    },
    title: formatMessage(confirmTitles.exit),
    description: formatMessage(confirmDescriptions.exit),
  });
};

export default useExitWithoutSavingAction;
