import React from 'react';
import PropTypes from 'prop-types';

import { Form, FormControlFeedback } from '@edx/paragon';
import { FormattedMessage } from '@edx/frontend-platform/i18n';

import messages from './messages';

/**
 * <ReviewCriterion />
 */
const ReviewCriterion = ({ criterion }) => (
  <div className="review-criterion">
    {criterion.options.map((option) => (
      <div key={option.name} className="criteria-option">
        <div>
          <Form.Label className="option-label">{option.name}</Form.Label>
          <FormControlFeedback className="option-points">
            <FormattedMessage {...messages.optionPoints} values={{ points: option.points }} />
          </FormControlFeedback>
        </div>
      </div>
    ))}
  </div>
);

ReviewCriterion.propTypes = {
  criterion: PropTypes.shape({
    options: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string.isRequired,
        points: PropTypes.number.isRequired,
      }),
    ).isRequired,
  }).isRequired,
};

export default ReviewCriterion;
