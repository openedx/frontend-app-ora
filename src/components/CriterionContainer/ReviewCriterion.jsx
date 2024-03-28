import React from 'react';
import PropTypes from 'prop-types';

import { Form, FormControlFeedback } from '@openedx/paragon';
import { FormattedMessage } from '@edx/frontend-platform/i18n';

import messages from './messages';

/**
 * <ReviewCriterion />
 */
const ReviewCriterion = ({ criterion }) => (
  <Form.Group>
    <div className="review-criterion">
      {criterion.options.map((option) => (
        <div className="d-flex text-nowrap" key={option.name}>
          <Form.Label className="option-label">{option.label}</Form.Label>
          <div key={option.name} className="criteria-option">
            <div>
              <FormControlFeedback className="option-points">
                <FormattedMessage
                  {...messages.optionPoints}
                  values={{ points: option.points }}
                />
              </FormControlFeedback>
            </div>
          </div>
        </div>
      ))}
    </div>
  </Form.Group>
);

ReviewCriterion.propTypes = {
  criterion: PropTypes.shape({
    options: PropTypes.arrayOf(PropTypes.shape({
      name: PropTypes.string,
      label: PropTypes.string,
      point: PropTypes.number,
    })),
  }).isRequired,
};

export default ReviewCriterion;
