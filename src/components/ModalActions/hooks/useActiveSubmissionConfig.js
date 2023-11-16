import React from 'react';

import { MutationStatus } from 'constants';
import messages from './messages';

const useActiveSubmissionConfig = ({
  options = {},
  closeModal,
  formatMessage,
}) => {
  const saveAndClose = React.useCallback(
    () => (options.finishLater ? options.finishLater().then(closeModal) : null),
    [options, closeModal],
  );

  if (!options) { return null; }

  const { submit, submitStatus, finishLaterStatus } = options;

  return {
    primary: {
      onClick: submit,
      state: submitStatus,
      labels: {
        [MutationStatus.idle]: formatMessage(messages.submitResponse),
        [MutationStatus.loading]: formatMessage(messages.submittingResponse),
      },
    },
    secondary: {
      onClick: saveAndClose,
      state: finishLaterStatus,
      labels: {
        [MutationStatus.idle]: formatMessage(messages.finishLater),
        [MutationStatus.loading]: formatMessage(messages.savingResponse),
      },
    },
  };
};
export default useActiveSubmissionConfig;
