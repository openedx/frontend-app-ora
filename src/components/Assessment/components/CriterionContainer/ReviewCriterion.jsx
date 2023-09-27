import React from 'react';
import PropTypes from 'prop-types';

import { Form, FormControlFeedback } from '@edx/paragon';
import { FormattedMessage } from '@edx/frontend-platform/i18n';

import messages from './messages';

/**
 * <ReviewCriterion />
 */
const ReviewCriterion = ({ criterion }) => {
  const option = criterion.options[criterion.optionsValue];
  return (
    <div className="review-criterion">
      <Form.Label className="option-label">{option.name}</Form.Label>
      <div key={option.name} className="criteria-option">
        <div>
          <FormControlFeedback className="option-points">
            <FormattedMessage {...messages.optionPoints} values={{ points: option.points }} />
          </FormControlFeedback>
          {criterion.feedbackValue && (
            <div className="rubric-feedback">
              {criterion.feedbackValue}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

ReviewCriterion.propTypes = {
  criterion: PropTypes.shape({
    optionsValue: PropTypes.string.isRequired,
    feedbackValue: PropTypes.string,
    options: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string.isRequired,
        points: PropTypes.number.isRequired,
      }),
    ).isRequired,
  }).isRequired,
};

export default ReviewCriterion;
