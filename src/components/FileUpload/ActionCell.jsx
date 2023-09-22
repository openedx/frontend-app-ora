import React, { useCallback } from 'react';
import { IconButton, Icon } from '@edx/paragon';

import { useIntl } from '@edx/frontend-platform/i18n';
import { Delete, Preview } from '@edx/paragon/icons';

import messages from './messages';

const ActionCell = ({
  onDeletedFile,
  disabled,
  row,
}) => {
  const { formatMessage } = useIntl();
  const deleteFile = useCallback(async () => {
    console.log('deleteFile', row.index);
    await onDeletedFile(row.index);
  }, []);
  return (
    <>
      <IconButton
        src={Delete}
        alt={formatMessage(messages.deleteButtonAltText)}
        iconAs={Icon}
        onClick={deleteFile}
        disabled={disabled}
      />
      <IconButton
        src={Preview}
        alt={formatMessage(messages.previewButtonAltText)}
        iconAs={Icon}
        disabled={disabled}
      />
    </>
  );
};

export default ActionCell;
