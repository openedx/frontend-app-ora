import React from 'react';
import PropTypes from 'prop-types';

import { Form } from '@edx/paragon';
import { useIntl } from '@edx/frontend-platform/i18n';

import messages from './messages';

/**
 * <RadioCriterion />
 */
const RadioCriterion = ({ isGrading, criterion }) => {
  const { formatMessage } = useIntl();

  const { optionsValue, optionsIsInvalid, optionsOnChange } = criterion;

  return (
    <Form.RadioSet name={criterion.name} value={optionsValue}>
      {criterion.options.map((option) => (
        <Form.Radio
          className="criteria-option"
          key={option.name}
          value={option.name}
          description={formatMessage(messages.optionPoints, {
            points: option.points,
          })}
          onChange={optionsOnChange}
          disabled={!isGrading}
        >
          {option.name}
        </Form.Radio>
      ))}
      {optionsIsInvalid && (
        <Form.Control.Feedback type="invalid" className="feedback-error-msg">
          {formatMessage(messages.rubricSelectedError)}
        </Form.Control.Feedback>
      )}
    </Form.RadioSet>
  );
};

RadioCriterion.propTypes = {
  isGrading: PropTypes.bool.isRequired,
  criterion: PropTypes.shape({
    optionsValue: PropTypes.string.isRequired,
    optionsIsInvalid: PropTypes.bool.isRequired,
    optionsOnChange: PropTypes.func.isRequired,
    name: PropTypes.string.isRequired,
    options: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string.isRequired,
        points: PropTypes.number.isRequired,
      }),
    ).isRequired,
  }).isRequired,
};

export default RadioCriterion;
