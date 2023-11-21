import React, { useCallback } from 'react';
import PropTypes from 'prop-types';

import { IconButton, Icon } from '@edx/paragon';
import { Delete } from '@edx/paragon/icons';
import { useIntl } from '@edx/frontend-platform/i18n';
import { useRefreshPageData } from 'hooks/app';
import { queryKeys } from 'constants';

import messages from './messages';

const ActionCell = ({
  onDeletedFile,
  disabled,
  row,
}) => {
  const { formatMessage } = useIntl();
  const refreshPageData = useRefreshPageData();
  const deleteFile = useCallback(() => {
    console.log({ deleteFile: row });
    onDeletedFile(row.original.fileIndex);
  }, [onDeletedFile, row.original.fileIndex]);
  return (
    <>
      {!disabled && (
        <IconButton
          src={Delete}
          alt={formatMessage(messages.deleteButtonAltText)}
          iconAs={Icon}
          onClick={deleteFile}
          disabled={disabled}
        />
      )}
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
