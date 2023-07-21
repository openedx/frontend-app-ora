import React from 'react';
import PropTypes from 'prop-types';

import { Form } from '@edx/paragon';
import { useIntl } from '@edx/frontend-platform/i18n';
import { StrictDict, useKeyedState } from '@edx/react-unit-test-utils';

import { feedbackRequirement } from 'data/services/lms/constants';
import messages from './messages';

export const stateKeys = StrictDict({
  value: 'value',
});

/**
 * <CriterionFeedback />
 */
const CriterionFeedback = ({
  criterion,
}) => {
  const [value, setValue] = useKeyedState(stateKeys.value, '');
  const { formatMessage } = useIntl();

  if (
    !criterion.feedbackEnabled
    || criterion.feedbackRequired === feedbackRequirement.disabled
  ) {
    return null;
  }

  const onChange = ({ target }) => { setValue(target.value); };
  let commentMessage = formatMessage(messages.addComments);
  if (criterion.feedbackRequired === feedbackRequirement.optional) {
    commentMessage += ` ${formatMessage(messages.optional)}`;
  }

  const isInvalid = value === '';

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
    feedbackEnabled: PropTypes.bool,
    feedbackRequired: PropTypes.string,
  }).isRequired,
};

export default CriterionFeedback;
