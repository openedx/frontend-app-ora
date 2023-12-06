import React from 'react';
import PropTypes from 'prop-types';

import { Button, StatefulButton } from '@edx/paragon';
import { useIntl } from '@edx/frontend-platform/i18n';

import { useCloseModal } from 'hooks/modal';
import { MutationStatus } from 'constants';

import { useViewStep } from 'hooks/routing';
import messages, { viewStepMessages } from '../messages';

/**
 * <Rubric />
 */
const AssessmentActions = ({
  onSubmit,
  submitStatus,
}) => {
  const closeModal = useCloseModal();
  const { formatMessage } = useIntl();
  const step = useViewStep();
  const viewStep = viewStepMessages[step] ? `${formatMessage(viewStepMessages[step])} ` : '';

  return (
    <div className="assessment-footer">
      <Button className="w-100" onClick={closeModal} variant="outline-primary">
        {formatMessage(messages.finishLater)}
      </Button>
      <StatefulButton
        className="w-100"
        onClick={onSubmit}
        state={submitStatus}
        labels={{
          [MutationStatus.idle]: formatMessage(messages.submitGrade, { viewStep }),
          [MutationStatus.loading]: formatMessage(messages.submittingGrade),
          [MutationStatus.success]: formatMessage(messages.gradeSubmitted),
        }}
      />
    </div>
  );
};

AssessmentActions.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  submitStatus: PropTypes.string.isRequired,
};

export default AssessmentActions;
