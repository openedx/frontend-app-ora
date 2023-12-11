import { useCancellationInfo } from 'hooks/app';

import messages from '../messages';

import useCreateAlert from './useCreateAlert';

const useCancelledAlerts = ({ step }) => {
  const createAlert = useCreateAlert({ step });
  const cancellationInfo = useCancellationInfo();
  let out = [];
  const {
    hasCancelled,
    cancelledBy,
    cancelledAt,
  } = cancellationInfo;
  const alertMessages = messages.alerts.submission;
  const headingMessages = messages.headings.submission;
  if (hasCancelled) {
    out = [
      createAlert({
        message: cancelledBy ? alertMessages.cancelledBy : alertMessages.cancelledAt,
        heading: cancelledBy ? headingMessages.cancelledBy : headingMessages.cancelledAt,
        messageVals: { cancelledAt, cancelledBy },
      }),
    ];
  }
  return { cancelledAlerts: out, hasCancelled };
};

export default useCancelledAlerts;
