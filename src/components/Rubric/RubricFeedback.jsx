import React from 'react';
import PropTypes from 'prop-types';

import { Form } from '@edx/paragon';
import { useIntl } from '@edx/frontend-platform/i18n';
import { StrictDict, useKeyedState } from '@edx/react-unit-test-utils';

import { useRubricConfig } from 'data/services/lms/hooks/selectors';

import InfoPopover from 'components/InfoPopover';

import messages from './messages';

export const stateKeys = StrictDict({
  value: 'value',
});

/**
 * <RubricFeedback />
 */
const RubricFeedback = ({
  isGrading,
}) => {
  const [value, setValue] = useKeyedState('');
  const { formatMessage } = useIntl();
  const feedbackPrompt = useRubricConfig().feedbackConfig.defaultText;

  const onChange = (event) => {
    setValue(event.target.value);
  };

  const inputLabel = formatMessage(
    isGrading ? messages.addComments : messages.comments,
  );

  return (
    <Form.Group>
      <Form.Label className="criteria-label">
        <span className="criteria-title">
          {formatMessage(messages.overallComments)}
        </span>
        <InfoPopover>
          <div>{feedbackPrompt}</div>
        </InfoPopover>
      </Form.Label>
      <Form.Control
        as="textarea"
        className="rubric-feedback feedback-input"
        floatingLabel={inputLabel}
        value={value}
        onChange={onChange}
        disabled={!isGrading}
      />
      {
        /*
        {isInvalid && (
          <Form.Control.Feedback type="invalid" className="feedback-error-msg">
            <FormattedMessage {...messages.overallFeedbackError} />
          </Form.Control.Feedback>
        )}
        */
      }
    </Form.Group>
  );
};

RubricFeedback.propTypes = {
  isGrading: PropTypes.bool.isRequired,
};

export default RubricFeedback;
