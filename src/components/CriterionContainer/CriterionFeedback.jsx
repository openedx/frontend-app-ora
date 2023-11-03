import React from 'react';
import PropTypes from 'prop-types';

import { Form } from '@edx/paragon';
import { useIntl } from '@edx/frontend-platform/i18n';

import { feedbackRequirement } from 'data/services/lms/constants';

import messages from './messages';

/**
 * <CriterionFeedback />
 */
const CriterionFeedback = ({ criterion, formFields }) => {
  const { formatMessage } = useIntl();

  let commentMessage = formatMessage(messages.addComments);
  if (criterion.feedbackRequired === feedbackRequirement.optional) {
    commentMessage += ` ${formatMessage(messages.optional)}`;
  }
  const { feedbackEnabled, feedbackRequired } = criterion;
  const { value, isInvalid, onChange } = formFields;

  if (!feedbackEnabled || feedbackRequired === feedbackRequirement.disabled) {
    return null;
  }

  return (
    <Form.Group isInvalid={isInvalid}>
      <Form.Control
        as="textarea"
        className="criterion-feedback feedback-input"
        floatingLabel={commentMessage}
        value={value}
        onChange={onChange}
      />
      {isInvalid && (
        <Form.Control.Feedback type="invalid" className="feedback-error-msg">
          {formatMessage(messages.criterionFeedbackError)}
        </Form.Control.Feedback>
      )}
    </Form.Group>
  );
};

CriterionFeedback.propTypes = {
  criterion: PropTypes.shape({
    feedbackEnabled: PropTypes.bool.isRequired,
    feedbackRequired: PropTypes.oneOf(Object.values(feedbackRequirement)).isRequired,
  }).isRequired,
  formFields: PropTypes.shape({
    value: PropTypes.string,
    isInvalid: PropTypes.bool,
    onChange: PropTypes.func,
  }).isRequired,
};

export default CriterionFeedback;
