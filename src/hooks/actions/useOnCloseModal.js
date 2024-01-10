import React from 'react';
import { stepNames } from 'constants/index';

import {
  useFinishLater,
  useGlobalState,
  useHasSubmitted,
  useTextResponses,
} from 'hooks/app';
import { useCloseModal } from 'hooks/modal';

/**
 * useOnCloseModal(userConfirm)
 * @description A hook that returns a function that closes the modal
 * @param {Function} userConfirm? - A function that returns a promise that resolves to a boolean
 * @returns {Function} - A function that closes the modal
 */
const useOnCloseModal = (userConfirm) => {
  const hasSubmitted = useHasSubmitted();
  const { activeStepName } = useGlobalState();
  const closeModal = useCloseModal();
  const textResponses = useTextResponses();
  const finishLater = useFinishLater();
  return React.useCallback(() => {
    if (activeStepName === stepNames.submission && !hasSubmitted) {
      return finishLater.mutateAsync({ textResponses });
    }
    if (hasSubmitted || !userConfirm) {
      return closeModal();
    }
    return userConfirm().then(confirm => {
      if (confirm) { closeModal(); }
    });
  }, [
    activeStepName,
    closeModal,
    finishLater,
    hasSubmitted,
    textResponses,
    userConfirm,
  ]);
};

export default useOnCloseModal;
