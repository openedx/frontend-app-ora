import { useIntl } from '@edx/frontend-platform/i18n';

import { MutationStatus, stepNames } from 'constants/index';
import useConfirmAction from './useConfirmAction';

import messages, { confirmDescriptions, confirmTitles } from './messages';

/**
 * useSubmitResponseAction({ options })
 * @description returns a confirmAction that will submit the response
 * @param {object} options - { submit (function), submitStatus (MutationStatus) }`
 * @returns {object} confirmAction
 */
const useSubmitResponseAction = ({ options }) => {
  const { formatMessage } = useIntl();
  const { submit, submitStatus } = options;
  const confirmAction = useConfirmAction();
  return confirmAction({
    action: {
      onClick: submit,
      state: submitStatus,
      labels: {
        default: formatMessage(messages.submitResponse),
        [MutationStatus.loading]: formatMessage(messages.submittingResponse),
      },
    },
    title: formatMessage(confirmTitles[stepNames.submission]),
    description: formatMessage(confirmDescriptions[stepNames.submission]),
  });
};
export default useSubmitResponseAction;
