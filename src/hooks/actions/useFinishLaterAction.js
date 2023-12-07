import { useIntl } from '@edx/frontend-platform/i18n';

import { stepNames, MutationStatus } from 'constants/index';

import { useTextResponses, useHasSubmitted } from 'data/redux/hooks';
import { useFinishLater } from 'data/services/lms/hooks/actions';

import { useCloseModal } from '../modal';
import { useViewStep } from '../routing';

import messages from './messages';

const useFinishLaterAction = () => {
  const { formatMessage } = useIntl();
  const viewStep = useViewStep();
  const textResponses = useTextResponses();
  const finishLaterMutation = useFinishLater();
  const hasSubmitted = useHasSubmitted();
  const closeModal = useCloseModal();

  if (viewStep === stepNames.submission && !hasSubmitted) {
    return {
      action: {
        onClick: () => {
          if (textResponses.every(r => r === '')) {
            return closeModal();
          }
          return finishLaterMutation.mutateAsync({ textResponses }).then(closeModal);
        },
        state: finishLaterMutation.status,
        labels: {
          default: formatMessage(messages.finishLater),
          [MutationStatus.loading]: formatMessage(messages.savingResponse),
        },
      },
    };
  }
  return null;
};

export default useFinishLaterAction;
