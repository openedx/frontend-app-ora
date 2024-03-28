import React from 'react';
import PropTypes from 'prop-types';

import { IconButton, Icon } from '@openedx/paragon';
import { Delete } from '@openedx/paragon/icons';
import { useIntl } from '@edx/frontend-platform/i18n';

import { useDeleteFileAction } from 'hooks/actions';

import ConfirmDialog from 'components/ConfirmDialog';

import messages from './messages';

const ActionCell = ({
  onDeletedFile,
  disabled,
  row,
}) => {
  const { formatMessage } = useIntl();
  const deleteFileAction = useDeleteFileAction({
    fileIndex: row.original.fileIndex,
    onDeletedFile,
  });
  return !disabled && (
    <>
      <IconButton
        src={Delete}
        alt={formatMessage(messages.deleteButtonAltText)}
        iconAs={Icon}
        onClick={deleteFileAction.action.onClick}
        disabled={disabled}
      />
      <ConfirmDialog {...deleteFileAction.confirmProps} />
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
    original: PropTypes.shape({
      fileIndex: PropTypes.number,
    }),
  }).isRequired,
};

export default ActionCell;
