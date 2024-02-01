import { useIntl } from '@edx/frontend-platform/i18n';
import { assessmentSteps, stepNames } from 'constants/index';
import { useIsRevisit } from 'hooks';
import { useHasSubmitted } from 'hooks/app';
import { useViewStep } from 'hooks/routing';

import useOnCloseModal from './useOnCloseModal';
import useFinishLaterAction from './useFinishLaterAction';
import useExitWithoutSavingAction from './useExitWithoutSavingAction';

import messages from './messages';

/**
 * useCloseModalAction()
 * @description Returns the action to be used for the close button in the modal.
 * @returns {Object} The action to be used for the close button in the modal.
 */
const useCloseModalAction = () => {
  const { formatMessage } = useIntl();
  const onClick = useOnCloseModal();
  const hasSubmitted = useHasSubmitted();
  const isRevisit = useIsRevisit();
  const stepName = useViewStep();
  const finishLaterAction = useFinishLaterAction();
  const exitWithoutSavingAction = useExitWithoutSavingAction();

  const action = { children: formatMessage(messages.close), onClick };
  const simpleClose = { action };

  if (stepName === stepNames.submission) {
    return (isRevisit || hasSubmitted) ? simpleClose : finishLaterAction;
  }

  if (assessmentSteps.includes(stepName)) {
    return hasSubmitted ? simpleClose : exitWithoutSavingAction;
  }

  // Graded step, no progress to save
  return simpleClose;
};

export default useCloseModalAction;
