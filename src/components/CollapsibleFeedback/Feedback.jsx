import React from 'react';
import PropTypes from 'prop-types';

import { Collapsible, Icon } from '@edx/paragon';
import { ExpandMore, ExpandLess } from '@edx/paragon/icons';
import { useIntl } from '@edx/frontend-platform/i18n';
import messages from './messages';
import InfoPopover from 'components/InfoPopover';

const Feedback = ({
  criterionName,
  selectedOption,
  selectedPoints,
  commentHeader,
  commentBody,
  defaultOpen,
}) => {
  const [isExpanded, setIsExpanded] = React.useState(defaultOpen);
  const { formatMessage } = useIntl();

  const toggle = () => setIsExpanded(!isExpanded);

  return (
    <>
      <div className='mt-2'>
        <div className='d-flex justify-content-between align-items-center'>
          <h5 className='mb-0'>{criterionName}</h5>
          <InfoPopover onClick={() => {}}>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.
            </p>
          </InfoPopover>
        </div>
        {selectedOption && (
          <p>
            {selectedOption} -- {selectedPoints} points
          </p>
        )}
      </div>
      <div className='bg-gray-100 p-3'>
        <Collapsible.Advanced
          open={isExpanded}
          onToggle={toggle}
        >
          <Collapsible.Trigger className='d-flex justify-content-between'>
            <h5 className='mb-0'>{commentHeader} Comment</h5>
            {isExpanded ? (
              <div className='d-flex mb-0 small'>
                <span>{formatMessage(messages.readLess)}</span>
                <Icon src={ExpandLess} />
              </div>
            ) : (
              <div className='d-flex mb-0 small'>
                <span>{formatMessage(messages.readMore)}</span>
                <Icon src={ExpandMore} />
              </div>
            )}
          </Collapsible.Trigger>
          <Collapsible.Body className='pt-2'>
            <p>{commentBody}</p>
          </Collapsible.Body>
        </Collapsible.Advanced>
      </div>
    </>
  );
};
Feedback.defaultProps = {
  defaultOpen: false,
};
Feedback.propTypes = {
  defaultOpen: PropTypes.bool,
  criterionName: PropTypes.string.isRequired,
  selectedOption: PropTypes.string,
  selectedPoints: PropTypes.number,
  commentHeader: PropTypes.string.isRequired,
  commentBody: PropTypes.string.isRequired,
};

export default Feedback;
