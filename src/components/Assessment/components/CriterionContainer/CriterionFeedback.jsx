import React from 'react';
import PropTypes from 'prop-types';

import { Form } from '@edx/paragon';
import { useIntl } from '@edx/frontend-platform/i18n';

import { feedbackRequirement } from 'data/services/lms/constants';

import messages from './messages';

/**
 * <CriterionFeedback />
 */
const CriterionFeedback = ({ criterion }) => {
  const { formatMessage } = useIntl();

  let commentMessage = formatMessage(messages.addComments);
  if (criterion.feedbackRequired === feedbackRequirement.optional) {
    commentMessage += ` ${formatMessage(messages.optional)}`;
  }

  const { feedbackValue, feedbackIsInvalid, feedbackOnChange } = criterion;

  if (
    !criterion.feedbackEnabled
    || criterion.feedbackRequired === feedbackRequirement.disabled
  ) {
    return null;
  }

  return (
    <Form.Group isInvalid={feedbackIsInvalid}>
      <Form.Control
        as="textarea"
        className="criterion-feedback feedback-input"
        floatingLabel={commentMessage}
        value={feedbackValue}
        onChange={feedbackOnChange}
      />
      {feedbackIsInvalid && (
        <Form.Control.Feedback type="invalid" className="feedback-error-msg">
          {formatMessage(messages.criterionFeedbackError)}
        </Form.Control.Feedback>
      )}
    </Form.Group>
  );
};

CriterionFeedback.propTypes = {
  criterion: PropTypes.shape({
    feedbackValue: PropTypes.string.isRequired,
    feedbackIsInvalid: PropTypes.bool.isRequired,
    feedbackOnChange: PropTypes.func.isRequired,
    feedbackEnabled: PropTypes.bool.isRequired,
    feedbackRequired: PropTypes.oneOf(Object.values(feedbackRequirement)).isRequired,
  }).isRequired,
};

export default CriterionFeedback;
