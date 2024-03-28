import React from 'react';
import PropTypes from 'prop-types';

import { Form } from '@openedx/paragon';

import InfoPopover from 'components/InfoPopover';

import './CriterionContainer.scss';

/**
 * <CriterionContainer />
 */
const CriterionContainer = ({
  criterion,
  input,
  feedback,
}) => (
  <Form.Group>
    <Form.Label className="criteria-label">
      <span className="criteria-title">{criterion.name}</span>
      <InfoPopover>
        <div className="help-popover-option">{criterion.description}</div>
        <hr />
        {criterion.options.map((option) => (
          <div key={option.name} className="help-popover-option">
            <strong>{option.label}</strong>
            <br />
            {option.description}
          </div>
        ))}
      </InfoPopover>
    </Form.Label>
    <div className="rubric-criteria">
      {input}
    </div>
    {feedback}
  </Form.Group>
);

CriterionContainer.defaultProps = {
  input: null,
  feedback: null,
};
CriterionContainer.propTypes = {
  input: PropTypes.node,
  feedback: PropTypes.node,
  criterion: PropTypes.shape({
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    options: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string.isRequired,
        label: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
      }),
    ).isRequired,
  }).isRequired,
};

export default CriterionContainer;
