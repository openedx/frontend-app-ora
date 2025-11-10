import React from 'react';

import { Form } from '@openedx/paragon';
import { useIntl } from '@edx/frontend-platform/i18n';

import { useViewStep } from 'hooks/routing';
import {
  useOverallFeedbackInstructions,
  useOverallFeedbackFormFields,
} from 'hooks/assessment';

import InfoPopover from 'components/InfoPopover';
import messages from 'components/Assessment/messages';

import { stepNames } from 'constants/index';

/**
 * <OverallFeedback />
 */
const OverallFeedback = () => {
  const { formatMessage } = useIntl();
  const instructions = useOverallFeedbackInstructions();
  const { value, onChange } = useOverallFeedbackFormFields();

  const step = useViewStep();
  if (step === stepNames.studentTraining) {
    return null;
  }
  return (
    <Form.Group>
      <Form.Label className="criteria-label">
        <span className="criteria-title">
          {formatMessage(messages.overallComments)}
        </span>
        <InfoPopover>
          <div data-testid="instructions-test-id">{instructions}</div>
        </InfoPopover>
      </Form.Label>
      <Form.Control
        as="textarea"
        className="rubric-feedback feedback-input"
        floatingLabel={formatMessage(messages.addComments)}
        value={value}
        onChange={onChange}
      />
    </Form.Group>
  );
};

export default OverallFeedback;
