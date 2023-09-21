import React from 'react';
import { IconButton, Icon } from '@edx/paragon';

import { useIntl } from '@edx/frontend-platform/i18n';
import { Delete, Preview } from '@edx/paragon/icons';

import messages from './messages';

const ActionCell = () => {
  const { formatMessage } = useIntl();
  return (
    <>
      <IconButton
        src={Delete}
        alt={formatMessage(messages.deleteButtonAltText)}
        iconAs={Icon}
      />
      <IconButton
        src={Preview}
        alt={formatMessage(messages.previewButtonAltText)}
        iconAs={Icon}
      />
    </>
  );
};

export default ActionCell;
