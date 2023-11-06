import React from 'react';

import { Form } from '@edx/paragon';
import { useIntl } from '@edx/frontend-platform/i18n';

import { useViewStep } from 'hooks';
import InfoPopover from 'components/InfoPopover';
import messages from 'components/Assessment/messages';
import { useOverallFeedbackFormFields } from 'context/AssessmentContext/hooks';
import { stepNames } from 'data/services/lms/constants';

/**
 * <OverallFeedback />
 */
const OverallFeedback = () => {
  const { formatMessage } = useIntl();
  const { prompt, value, onChange } = useOverallFeedbackFormFields();
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
          <div>{prompt}</div>
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
