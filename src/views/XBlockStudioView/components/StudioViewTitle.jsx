import React from 'react';

import { useIntl } from '@edx/frontend-platform/i18n';
import { Button } from '@edx/paragon';
import { useORAConfigData } from 'hooks/app';
import messages from './messages';
import { useXBlockStudioViewContext } from './XBlockStudioViewProvider';

const StudioViewTitle = () => {
  const { formatMessage } = useIntl();
  const { title } = useORAConfigData();

  const { isAllClosed, toggleAll } = useXBlockStudioViewContext();

  return (
    <div className="block-title">
      <h2>{title}</h2>
      <Button
        className="flex-grow"
        onClick={toggleAll}
      >
        {formatMessage(
          isAllClosed() ? messages.expandAllButton : messages.collapseAllButton,
        )}
      </Button>
    </div>
  );
};

export default StudioViewTitle;
