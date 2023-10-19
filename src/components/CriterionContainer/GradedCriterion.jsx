import React from 'react';
import PropTypes from 'prop-types';

import { Form, FormControlFeedback } from '@edx/paragon';
import { FormattedMessage } from '@edx/frontend-platform/i18n';

import messages from './messages';

/**
 * <GradedCriterion />
 */
const GradedCriterion = ({ selectedOption, feedbackValue }) => (
  <div className="review-criterion">
    <Form.Label className="option-label">{selectedOption.name}</Form.Label>
    <div key={selectedOption.name} className="criteria-option">
      <div>
        <FormControlFeedback className="option-points">
          <FormattedMessage
            {...messages.optionPoints}
            values={{ points: selectedOption.points }}
          />
        </FormControlFeedback>
        {feedbackValue && <div className="rubric-feedback">{feedbackValue}</div>}
      </div>
    </div>
  </div>
);

GradedCriterion.defaultProps = {
  feedbackValue: null,
};
GradedCriterion.propTypes = {
  selectedOption: PropTypes.shape({
    name: PropTypes.string.isRequired,
    points: PropTypes.number.isRequired,
  }).isRequired,
  feedbackValue: PropTypes.string,
};

export default GradedCriterion;
