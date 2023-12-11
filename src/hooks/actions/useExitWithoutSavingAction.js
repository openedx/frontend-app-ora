import { useIntl } from '@edx/frontend-platform/i18n';

import useConfirmAction from './useConfirmAction';
import { useCloseAction } from './simpleActions';

import messages, { confirmTitles, confirmDescriptions } from './messages';

const useExitWithoutSavingAction = () => {
  const { formatMessage } = useIntl();
  const closeAction = useCloseAction(messages.exitWithoutSaving);
  const confirmAction = useConfirmAction();

  return confirmAction({
    action: closeAction,
    title: formatMessage(confirmTitles.exit),
    description: formatMessage(confirmDescriptions.exit),
  });
};

export default useExitWithoutSavingAction;
