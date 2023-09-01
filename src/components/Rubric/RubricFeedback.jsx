import React from 'react';
import PropTypes from 'prop-types';

import { Form } from '@edx/paragon';
import { useIntl } from '@edx/frontend-platform/i18n';

import InfoPopover from 'components/InfoPopover';

import messages from './messages';

/**
 * <RubricFeedback />
 */
const RubricFeedback = ({
  overallFeedbackPrompt,
  overallFeedback,
  overallFeedbackDisabled,
  overallFeedbackIsInvalid,
  onOverallFeedbackChange,
}) => {
  const { formatMessage } = useIntl();

  const inputLabel = formatMessage(
    !overallFeedbackDisabled ? messages.addComments : messages.comments,
  );

  return (
    <Form.Group>
      <Form.Label className="criteria-label">
        <span className="criteria-title">
          {formatMessage(messages.overallComments)}
        </span>
        <InfoPopover>
          <div>{overallFeedbackPrompt}</div>
        </InfoPopover>
      </Form.Label>
      <Form.Control
        as="textarea"
        className="rubric-feedback feedback-input"
        floatingLabel={inputLabel}
        value={overallFeedback}
        onChange={onOverallFeedbackChange}
        disabled={overallFeedbackDisabled}
      />
      {overallFeedbackIsInvalid && (
        <Form.Control.Feedback type="invalid" className="feedback-error-msg">
          {formatMessage(messages.overallFeedbackError)}
        </Form.Control.Feedback>
      )}
    </Form.Group>
  );
};

RubricFeedback.defaultProps = {
  overallFeedback: '',
  overallFeedbackDisabled: false,
  overallFeedbackIsInvalid: false,
};

RubricFeedback.propTypes = {
  overallFeedbackPrompt: PropTypes.string.isRequired,
  overallFeedback: PropTypes.string,
  overallFeedbackDisabled: PropTypes.bool,
  onOverallFeedbackChange: PropTypes.func.isRequired,
  overallFeedbackIsInvalid: PropTypes.bool,
};

export default RubricFeedback;
