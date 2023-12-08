import React from 'react';
import PropTypes from 'prop-types';

import {
  OverlayTrigger,
  Popover,
  Icon,
  IconButton,
  Tooltip,
} from '@edx/paragon';
import { InfoOutline } from '@edx/paragon/icons';
import { useIntl } from '@edx/frontend-platform/i18n';

import { nullMethod } from 'utils';

import messages from './messages';

/**
 * <InfoPopover />
 */
export const InfoPopover = ({ onClick, children }) => {
  const { formatMessage } = useIntl();
  return (
    <OverlayTrigger
      trigger="focus"
      placement="top"
      flip
      overlay={(
        <Tooltip>Help</Tooltip>
      )}
    >
      <OverlayTrigger
        trigger="focus"
        placement="bottom"
        flip
        overlay={(
          <Popover id="info-popover" className="overlay-help-popover">
            <Popover.Content>{children}</Popover.Content>
          </Popover>
        )}
      >
        <>
          <IconButton
            className="ml-2 esg-help-icon"
            src={InfoOutline}
            alt={formatMessage(messages.altText)}
            iconAs={Icon}
            onClick={onClick}
            size="inline"
          />
          <span className="ml-2.5 micro">
            Rubric details
          </span>
        </>
      </OverlayTrigger>
    </OverlayTrigger>
  );
};

InfoPopover.defaultProps = {
  onClick: nullMethod,
};
InfoPopover.propTypes = {
  onClick: PropTypes.func,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export default InfoPopover;
