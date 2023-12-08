import { useIntl } from '@edx/frontend-platform/i18n';

import useConfirmAction from './useConfirmAction';
import messages, { confirmTitles, confirmDescriptions } from './messages';

const useDeleteFileAction = ({
  fileIndex,
  onDeletedFile,
}) => {
  const { formatMessage } = useIntl();
  const confirmAction = useConfirmAction();
  return confirmAction({
    action: {
      onClick: () => { onDeletedFile(fileIndex); },
      children: formatMessage(messages.deleteFile),
    },
    title: formatMessage(confirmTitles.deleteFile),
    description: formatMessage(confirmDescriptions.deleteFile),
  });
};
export default useDeleteFileAction;
