import React from 'react';
import PropTypes from 'prop-types';

import { Form } from '@edx/paragon';
import { useIntl } from '@edx/frontend-platform/i18n';

import { useViewStep } from 'hooks/routing';
import { feedbackRequirement, stepNames } from 'constants';
import {
  useShowValidation,
  useCriterionFeedbackFormFields,
} from 'hooks/assessment';

import messages from './messages';

/**
 * <CriterionFeedback />
 */
const CriterionFeedback = ({ criterion, criterionIndex }) => {
  const { formatMessage } = useIntl();
  const step = useViewStep();
  const showValidation = useShowValidation();
  const { isInvalid, value, onChange } = useCriterionFeedbackFormFields(criterionIndex);

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
    <Form.Group isInvalid={showValidation && isInvalid}>
      <Form.Control
        as="textarea"
        className="criterion-feedback feedback-input"
        floatingLabel={commentMessage}
        value={value}
        onChange={onChange}
      />
      {showValidation && isInvalid && (
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
