import React from 'react';
import PropTypes from 'prop-types';
import { useIntl } from '@edx/frontend-platform/i18n';
import { ActionRow, StatefulButton } from '@edx/paragon';
import { MutationStatus } from 'data/services/lms/constants';
import messages from './messages';

const SubmissionActions = ({
  submitResponseHandler,
  submitResponseStatus,
  saveResponseForLaterHandler,
  saveResponseForLaterStatus,
}) => {
  const { formatMessage } = useIntl();

  return (
    <ActionRow>
      <StatefulButton
        variant="secondary"
        onClick={saveResponseForLaterHandler}
        state={saveResponseForLaterStatus}
        disabledStates={[MutationStatus.loading]}
        labels={{
          default: formatMessage(messages.saveForLaterActionSave),
          [MutationStatus.loading]: formatMessage(
            messages.saveForLaterActionSaving,
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
  saveResponseForLaterHandler: PropTypes.func.isRequired,
  saveResponseForLaterStatus: PropTypes.oneOf(Object.values(MutationStatus))
    .isRequired,
};

export default SubmissionActions;
