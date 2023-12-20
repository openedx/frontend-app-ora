import React from 'react';
import { stepNames } from 'constants/index';

import {
  useFinishLater,
  useGlobalState,
  useHasSubmitted,
  useTextResponses,
} from 'hooks/app';
import { useCloseModal } from 'hooks/modal';

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
    if (hasSubmitted) {
      return closeModal();
    }
    return userConfirm
      ? userConfirm().then(confirm => confirm && closeModal())
      : closeModal();
  }, [
    closeModal,
    userConfirm,
    activeStepName,
    hasSubmitted,
    finishLater,
    textResponses,
  ]);
};

export default useOnCloseModal;
