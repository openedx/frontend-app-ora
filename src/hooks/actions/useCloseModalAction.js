import { assessmentSteps, stepNames } from 'constants/index';
import { useIsRevisit } from 'hooks';
import { useHasSubmitted } from 'hooks/app';
import { useViewStep } from 'hooks/routing';

import useOnCloseModal from './useOnCloseModal';
import useFinishLaterAction from './useFinishLaterAction';
import useExitWithoutSavingAction from './useExitWithoutSavingAction';

const useCloseModalAction = () => {
  const onClose = useOnCloseModal();
  const hasSubmitted = useHasSubmitted();
  const isRevisit = useIsRevisit();
  const stepName = useViewStep();
  const simpleClose = { action: { children: 'Close', onClick: onClose } };
  const finishLaterAction = useFinishLaterAction();
  const exitWithoutSavingAction = useExitWithoutSavingAction();
  console.log({ simpleClose, finishLaterAction, exitWithoutSavingAction });

  if (stepName === stepNames.submission) {
    return (isRevisit || hasSubmitted) ? simpleClose : finishLaterAction;
  }
  if (assessmentSteps.includes(stepName)) {
    return hasSubmitted ? simpleClose : exitWithoutSavingAction;
  }
  return simpleClose;
};

export default useCloseModalAction;
