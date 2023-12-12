import React from 'react';
import { useIntl } from '@edx/frontend-platform/i18n';

import useConfirmAction from './useConfirmAction';
import messages, { confirmTitles, confirmDescriptions } from './messages';

const useDeleteFileAction = ({
  fileIndex,
  onDeletedFile,
}) => {
  const { formatMessage } = useIntl();
  const confirmAction = useConfirmAction();
  const deleteFile = React.useCallback(() => {
    onDeletedFile(fileIndex);
  }, [onDeletedFile, fileIndex]);
  return confirmAction({
    action: {
      onClick: deleteFile,
      children: formatMessage(messages.deleteFile),
    },
    title: formatMessage(confirmTitles.deleteFile),
    description: formatMessage(confirmDescriptions.deleteFile),
  });
};

export default useDeleteFileAction;
