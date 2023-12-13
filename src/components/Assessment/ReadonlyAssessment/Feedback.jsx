import React from 'react';
import PropTypes from 'prop-types';

import { Collapsible, Icon } from '@edx/paragon';
import { ExpandMore, ExpandLess } from '@edx/paragon/icons';
import { useIntl } from '@edx/frontend-platform/i18n';

import InfoPopover from 'components/InfoPopover';

import messages from './messages';

const Feedback = ({
  criterionName,
  criterionDescription,
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
      <div className='"mt-2'>
        <div className="d-flex justify-content-between align-items-center">
          <h5 className="mb-0">{criterionName}</h5>
          {criterionDescription && (
            <InfoPopover>
              <p>{criterionDescription}</p>
            </InfoPopover>
          )}
        </div>
        {selectedOption && (
          <p>{selectedOption}: {selectedPoints} points</p>
        )}
      </div>
      {commentBody && (
        <div className="bg-gray-100 p-3">
          <Collapsible.Advanced open={isExpanded} onToggle={toggle}>
            <Collapsible.Trigger className="d-flex justify-content-between">
              <h5 className="mb-0">
                {commentHeader
                  ? formatMessage(messages.stepComment, { step: commentHeader })
                  : formatMessage(messages.comment)}
              </h5>
              {isExpanded ? (
                <div className="d-flex mb-0 small">
                  <span>{formatMessage(messages.readLess)}</span>
                  <Icon src={ExpandLess} />
                </div>
              ) : (
                <div className="d-flex mb-0 small">
                  <span>{formatMessage(messages.readMore)}</span>
                  <Icon src={ExpandMore} />
                </div>
              )}
            </Collapsible.Trigger>
            <Collapsible.Body className="pt-2">
              <p>{commentBody}</p>
            </Collapsible.Body>
          </Collapsible.Advanced>
        </div>
      )}
    </>
  );
};
Feedback.defaultProps = {
  defaultOpen: true,
  commentHeader: null,
  criterionDescription: null,
  selectedOption: null,
  selectedPoints: null,
};
Feedback.propTypes = {
  defaultOpen: PropTypes.bool,
  criterionName: PropTypes.string.isRequired,
  criterionDescription: PropTypes.string,
  selectedOption: PropTypes.string,
  selectedPoints: PropTypes.number,
  commentHeader: PropTypes.string,
  commentBody: PropTypes.string.isRequired,
};

export default Feedback;
