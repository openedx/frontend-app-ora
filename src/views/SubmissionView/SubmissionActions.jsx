import React from 'react';
import PropTypes from 'prop-types';
import { useIntl } from '@edx/frontend-platform/i18n';
import { ActionRow, Button, StatefulButton } from '@edx/paragon';
import { MutationStatus } from 'data/services/lms/constants';
import messages from './messages';

const SubmissionActions = ({ submitResponseHandler, submitResponseStatus }) => {
  const { formatMessage } = useIntl();

  return (
    <ActionRow>
      <Button variant="secondary">{formatMessage(messages.submissionActionFinishLater)}</Button>
      <StatefulButton
        onClick={submitResponseHandler}
        state={submitResponseStatus}
        disabledStates={[MutationStatus.loading, MutationStatus.success]}
        labels={{
          [MutationStatus.idle]: formatMessage(messages.submissionActionSubmit),
          [MutationStatus.loading]: formatMessage(messages.submissionActionSubmitting),
          [MutationStatus.success]: formatMessage(messages.submissionActionSubmitted),
        }}
      />
    </ActionRow>
  );
};

SubmissionActions.propTypes = {
  submitResponseHandler: PropTypes.func.isRequired,
  submitResponseStatus: PropTypes.oneOf(Object.values(MutationStatus)).isRequired,
};

export default SubmissionActions;
