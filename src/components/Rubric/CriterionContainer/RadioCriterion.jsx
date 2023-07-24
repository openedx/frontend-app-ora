import React from 'react';
import PropTypes from 'prop-types';

import { Form } from '@edx/paragon';
import { useIntl } from '@edx/frontend-platform/i18n';
import { StrictDict, useKeyedState } from '@edx/react-unit-test-utils';

import messages from './messages';

export const stateKeys = StrictDict({
  value: 'value',
});

/**
 * <RadioCriterion />
 */
const RadioCriterion = ({
  isGrading,
  criterion,
}) => {
  const [value, setValue] = useKeyedState(stateKeys.value, '');
  const { formatMessage } = useIntl();
  const onChange = ({ target }) => { setValue(target.value); };
  const isInvalid = value === '';

  return (
    <Form.RadioSet name={criterion.name} value={value}>
      {criterion.options.map((option) => (
        <Form.Radio
          className="criteria-option"
          key={option.name}
          value={option.name}
          description={formatMessage(messages.optionPoints, { points: option.points })}
          onChange={onChange}
          disabled={!isGrading}
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

RadioCriterion.propTypes = {
  isGrading: PropTypes.bool.isRequired,
  criterion: PropTypes.shape({
    name: PropTypes.string,
    options: PropTypes.arrayOf(PropTypes.shape({
      name: PropTypes.string,
      description: PropTypes.string,
      points: PropTypes.number,
    })),
  }).isRequired,
};

export default RadioCriterion;
