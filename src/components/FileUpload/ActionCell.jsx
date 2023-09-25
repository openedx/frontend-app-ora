import React, { useCallback } from 'react';
import PropTypes from 'prop-types';

import { IconButton, Icon } from '@edx/paragon';
import { Delete, Preview } from '@edx/paragon/icons';
import { useIntl } from '@edx/frontend-platform/i18n';

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
  }, [onDeletedFile, row.index]);
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

ActionCell.defaultProps = {
  onDeletedFile: () => {},
};

ActionCell.propTypes = {
  onDeletedFile: PropTypes.func,
  disabled: PropTypes.bool.isRequired,
  row: PropTypes.shape({
    index: PropTypes.number.isRequired,
  }).isRequired,
};

export default ActionCell;
