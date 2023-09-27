import React from 'react';
import PropTypes from 'prop-types';

import { Form } from '@edx/paragon';

import InfoPopover from 'components/InfoPopover';
import RadioCriterion from './RadioCriterion';
import CriterionFeedback from './CriterionFeedback';
import ReviewCriterion from './ReviewCriterion';

/**
 * <CriterionContainer />
 */
const CriterionContainer = ({
  isGrading,
  criterion,
}) => (
  <Form.Group>
    <Form.Label className="criteria-label">
      <span className="criteria-title">{criterion.name}</span>
      <InfoPopover>
        <div className="help-popover-option">{criterion.description}</div>
        <hr />
        {criterion.options.map((option) => (
          <div key={option.name} className="help-popover-option">
            <strong>{option.name}</strong>
            <br />
            {option.description}
          </div>
        ))}
      </InfoPopover>
    </Form.Label>
    <div className="rubric-criteria">
      {isGrading ? (
        <RadioCriterion {...{ criterion, isGrading }} />
      ) : (
        <ReviewCriterion criterion={criterion} />
      )}
    </div>
    {isGrading && <CriterionFeedback {...{ criterion }} />}
  </Form.Group>
);

CriterionContainer.propTypes = {
  isGrading: PropTypes.bool.isRequired,
  criterion: PropTypes.shape({
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    options: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
      }),
    ).isRequired,
  }).isRequired,
};

export default CriterionContainer;
