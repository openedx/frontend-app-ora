import React from 'react';
import PropTypes from 'prop-types';
import { useIntl } from '@edx/frontend-platform/i18n';
import { ActionRow, StatefulButton } from '@edx/paragon';
import { MutationStatus } from 'data/services/lms/constants';
import messages from './messages';

const SubmissionActions = ({
  submitResponseHandler,
  submitResponseStatus,
  saveResponseHandler,
  saveResponseStatus,
}) => {
  const { formatMessage } = useIntl();

  return (
    <ActionRow>
      <StatefulButton
        variant="secondary"
        onClick={saveResponseHandler}
        state={saveResponseStatus}
        disabledStates={[MutationStatus.loading]}
        labels={{
          default: formatMessage(messages.saveActionSave),
          [MutationStatus.loading]: formatMessage(
            messages.saveActionSaving,
          ),
        }}
      />
      <StatefulButton
        onClick={submitResponseHandler}
        state={submitResponseStatus}
        disabledStates={[MutationStatus.loading, MutationStatus.success]}
        labels={{
          [MutationStatus.idle]: formatMessage(messages.submissionActionSubmit),
          [MutationStatus.loading]: formatMessage(
            messages.submissionActionSubmitting,
          ),
          [MutationStatus.success]: formatMessage(
            messages.submissionActionSubmitted,
          ),
        }}
      />
    </ActionRow>
  );
};

SubmissionActions.propTypes = {
  submitResponseHandler: PropTypes.func.isRequired,
  submitResponseStatus: PropTypes.oneOf(Object.values(MutationStatus))
    .isRequired,
  saveResponseHandler: PropTypes.func.isRequired,
  saveResponseStatus: PropTypes.oneOf(Object.values(MutationStatus))
    .isRequired,
};

export default SubmissionActions;
