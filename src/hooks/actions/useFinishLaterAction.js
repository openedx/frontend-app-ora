import React from 'react';
import { useIntl } from '@edx/frontend-platform/i18n';

import { stepNames, MutationStatus } from 'constants/index';

import { useTextResponses, useHasSubmitted } from 'data/redux/hooks';
import { useFinishLater } from 'data/services/lms/hooks/actions';

import { useCloseModal } from 'hooks/modal';
import { useViewStep } from 'hooks/routing';

import messages from './messages';

const useFinishLaterAction = () => {
  const { formatMessage } = useIntl();
  const viewStep = useViewStep();
  const textResponses = useTextResponses();
  const finishLaterMutation = useFinishLater();
  const hasSubmitted = useHasSubmitted();
  const closeModal = useCloseModal();
  const isInvalid = textResponses.every(r => r === '');

  const saveDraft = React.useCallback(() => (
    finishLaterMutation.mutateAsync({ textResponses }).then(closeModal)
  ), [finishLaterMutation, textResponses, closeModal]);
  const onClick = isInvalid ? closeModal : saveDraft;

  if (viewStep !== stepNames.submission || hasSubmitted) {
    return null;
  }

  return {
    action: {
      onClick,
      state: finishLaterMutation.status,
      labels: {
        default: formatMessage(messages.finishLater),
        [MutationStatus.idle]: formatMessage(messages.finishLater),
        [MutationStatus.loading]: formatMessage(messages.savingResponse),
      },
    },
  };
};

export default useFinishLaterAction;
