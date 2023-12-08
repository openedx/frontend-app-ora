import React from 'react';
import PropTypes from 'prop-types';

import {
  OverlayTrigger,
  Popover,
  Icon,
  IconButton,
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
    <div className="d-inline-block">
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
        <IconButton
          className="ml-2 esg-help-icon"
          src={InfoOutline}
          alt={formatMessage(messages.altText)}
          iconAs={Icon}
          onClick={onClick}
          size="inline"
        />
      </OverlayTrigger>
      <span className="ml-2.5 micro">
        Rubric details
      </span>
    </div>
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
