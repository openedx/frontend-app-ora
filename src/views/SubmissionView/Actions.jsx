import React from 'react';
import PropTypes from 'prop-types';
import { useIntl } from '@edx/frontend-platform/i18n';
import { ActionRow, StatefulButton } from '@edx/paragon';
import { MutationStatus } from 'data/services/lms/constants';
import messages from './messages';

const SubmissionActions = ({
  submitResponse,
  saveResponse,
}) => {
  const { formatMessage } = useIntl();

  return (
    <ActionRow>
      <StatefulButton
        variant="secondary"
        onClick={saveResponse.handler}
        state={saveResponse.status}
        disabledStates={[MutationStatus.loading]}
        labels={{
          default: formatMessage(messages.saveActionSave),
          [MutationStatus.loading]: formatMessage(
            messages.saveActionSaving,
          ),
        }}
      />
      <StatefulButton
        onClick={submitResponse.handler}
        state={submitResponse.status}
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
  saveResponse: PropTypes.shape({
    status: PropTypes.oneOf(Object.values(MutationStatus)).isRequired,
    handler: PropTypes.func.isRequired,
  }).isRequired,
  submitResponse: PropTypes.shape({
    status: PropTypes.oneOf(Object.values(MutationStatus)).isRequired,
    handler: PropTypes.func.isRequired,
  }).isRequired,
};

export default SubmissionActions;
