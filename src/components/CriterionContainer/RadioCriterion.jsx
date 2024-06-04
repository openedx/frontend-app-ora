import React from 'react';
import PropTypes from 'prop-types';

import { Form } from '@openedx/paragon';
import { useIntl } from '@edx/frontend-platform/i18n';

import {
  useShowValidation,
  useShowTrainingError,
  useCriterionOptionFormFields,
} from 'hooks/assessment';

import messages, { trainingMessages } from './messages';

/**
 * <RadioCriterion />
 */
const RadioCriterion = ({
  criterion,
  criterionIndex,
}) => {
  const { formatMessage } = useIntl();
  const {
    value, onChange, isInvalid, trainingOptionValidity,
  } = useCriterionOptionFormFields(criterionIndex);
  const showValidation = useShowValidation();
  const showTrainingError = useShowTrainingError();

  return (
    <Form.RadioSet name={criterion.name} value={value || ''}>
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
          {option.label}
        </Form.Radio>
      ))}

      {(showValidation && isInvalid) && (
        <Form.Control.Feedback type="invalid" className="feedback-error-msg">
          {formatMessage(messages.rubricSelectedError)}
        </Form.Control.Feedback>
      )}

      {(showTrainingError && trainingOptionValidity) && (
        <Form.Control.Feedback type={trainingOptionValidity} className="feedback-success-msg">
          {formatMessage(trainingMessages[trainingOptionValidity])}
        </Form.Control.Feedback>
      )}

    </Form.RadioSet>
  );
};

const optionPropType = PropTypes.shape({
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  points: PropTypes.number.isRequired,
});
RadioCriterion.propTypes = {
  criterion: PropTypes.shape({
    name: PropTypes.string.isRequired,
    options: PropTypes.arrayOf(optionPropType).isRequired,
  }).isRequired,
  criterionIndex: PropTypes.number.isRequired,
};

export default RadioCriterion;
