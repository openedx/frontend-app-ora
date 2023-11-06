import React from 'react';
import PropTypes from 'prop-types';

import { Form } from '@edx/paragon';
import { useIntl } from '@edx/frontend-platform/i18n';

import { useViewStep } from 'hooks';
import { feedbackRequirement, stepNames } from 'data/services/lms/constants';
import { useCriterionFeedbackFormFields } from 'context/AssessmentContext/hooks';

import messages from './messages';

/**
 * <CriterionFeedback />
 */
const CriterionFeedback = ({ criterion, criterionIndex }) => {
  const { value, showValidation, onChange } = useCriterionFeedbackFormFields(criterionIndex);
  const step = useViewStep();

  const { formatMessage } = useIntl();

  if (step === stepNames.studentTraining) {
    return null;
  }

  const { feedbackEnabled, feedbackRequired } = criterion;
  if (!feedbackEnabled || feedbackRequired === feedbackRequirement.disabled) {
    return null;
  }
  let commentMessage = formatMessage(messages.addComments);
  if (feedbackRequired === feedbackRequirement.optional) {
    commentMessage += ` ${formatMessage(messages.optional)}`;
  }

  return (
    <Form.Group isInvalid={showValidation}>
      <Form.Control
        as="textarea"
        className="criterion-feedback feedback-input"
        floatingLabel={commentMessage}
        value={value}
        onChange={onChange}
      />
      {showValidation && (
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
  criterionIndex: PropTypes.number.isRequired,
};

export default CriterionFeedback;
