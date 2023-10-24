import React from 'react';
import PropTypes from 'prop-types';

import { Collapsible, Icon } from '@edx/paragon';
import { ExpandMore, ExpandLess } from '@edx/paragon/icons';
import { useIntl } from '@edx/frontend-platform/i18n';
import messages from './messages';

const Feedback = ({ criterion, selectedOption, selectedPoints, commentHeader, commentBody, defaultOpen }) => {
  const [isExpanded, setIsExpanded] = React.useState(defaultOpen);
  const { formatMessage } = useIntl();

  return (
    <>
      <div className='mt-2'>
        <h5>{criterion.name}</h5>
        {selectedOption && <p>{selectedOption} -- {selectedPoints} points</p>}
      </div>
      <div className='bg-gray-100 p-3'>
        <Collapsible.Advanced
          open={isExpanded}
          onToggle={() => setIsExpanded(!isExpanded)}
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
};

export default Feedback;
