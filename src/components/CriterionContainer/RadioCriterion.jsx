import React from 'react';
import PropTypes from 'prop-types';

import { Form } from '@edx/paragon';
import { useIntl } from '@edx/frontend-platform/i18n';

import messages from './messages';

/**
 * <RadioCriterion />
 */
const RadioCriterion = ({ formFields, criterion }) => {
  const { formatMessage } = useIntl();
  const { isInvalid, onChange, selected } = formFields;

  return (
    <Form.RadioSet name={criterion.name} value={selected}>
      {criterion.options.map((option, optionIndex) => (
        <Form.Radio
          className="criteria-option"
          key={option.name}
          value={`${optionIndex}`}
          description={formatMessage(messages.optionPoints, {
            points: option.points,
          })}
          onChange={onChange}
        >
          {option.name}
        </Form.Radio>
      ))}
      {isInvalid && (
        <Form.Control.Feedback type="invalid" className="feedback-error-msg">
          {formatMessage(messages.rubricSelectedError)}
        </Form.Control.Feedback>
      )}
    </Form.RadioSet>
  );
};

const optionPropType = PropTypes.shape({
  name: PropTypes.string.isRequired,
  points: PropTypes.number.isRequired,
});
RadioCriterion.propTypes = {
  criterion: PropTypes.shape({
    name: PropTypes.string.isRequired,
    options: PropTypes.arrayOf(optionPropType).isRequired,
  }).isRequired,
  formFields: PropTypes.shape({
    isInvalid: PropTypes.bool,
    onChange: PropTypes.func,
    selected: PropTypes.string,
  }).isRequired,
};

export default RadioCriterion;
