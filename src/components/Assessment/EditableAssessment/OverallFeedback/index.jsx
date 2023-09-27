import React from 'react';
import PropTypes from 'prop-types';

import { Form } from '@edx/paragon';
import { useIntl } from '@edx/frontend-platform/i18n';

import InfoPopover from 'components/InfoPopover';

import messages from 'components/Assessment/messages';

/**
 * <OverallFeedback />
 */
const OverallFeedback = ({
  prompt,
  value,
  isDisabled,
  isInvalid,
  onChange,
}) => {
  const { formatMessage } = useIntl();

  const inputLabel = formatMessage(
    !isDisabled ? messages.addComments : messages.comments,
  );

  return (
    <Form.Group>
      <Form.Label className="criteria-label">
        <span className="criteria-title">
          {formatMessage(messages.overallComments)}
        </span>
        <InfoPopover>
          <div>{prompt}</div>
        </InfoPopover>
      </Form.Label>
      <Form.Control
        as="textarea"
        className="rubric-feedback feedback-input"
        floatingLabel={inputLabel}
        value={value}
        onChange={onChange}
        disabled={isDisabled}
      />
      {isInvalid && (
        <Form.Control.Feedback type="invalid" className="feedback-error-msg">
          {formatMessage(messages.overallFeedbackError)}
        </Form.Control.Feedback>
      )}
    </Form.Group>
  );
};

OverallFeedback.defaultProps = {
  value: '',
  isDisabled: false,
  isInvalid: false,
};

OverallFeedback.propTypes = {
  prompt: PropTypes.string.isRequired,
  value: PropTypes.string,
  isDisabled: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
  isInvalid: PropTypes.bool,
};

export default OverallFeedback;
