import { useIntl } from '@edx/frontend-platform/i18n';

import { MutationStatus } from 'constants/index';

import messages from './messages';

const useSubmitResponseAction = ({
  options = {},
}) => {
  const { formatMessage } = useIntl();
  const { submit, submitStatus } = options;
  return {
    action: {
      onClick: submit,
      state: submitStatus,
      labels: {
        default: formatMessage(messages.submitResponse),
        [MutationStatus.loading]: formatMessage(messages.submittingResponse),
      },
    },
  };
};
export default useSubmitResponseAction;
