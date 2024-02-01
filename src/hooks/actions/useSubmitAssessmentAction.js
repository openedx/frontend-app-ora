import { useIntl } from '@edx/frontend-platform/i18n';

import { MutationStatus, stepNames } from 'constants/index';

import { useIsAssessmentInvalid, useOnSubmit } from 'hooks/assessment';
import { useViewStep } from 'hooks/routing';
import { useIsMounted } from 'hooks/utils';

import useConfirmAction from './useConfirmAction';

import messages, {
  viewStepMessages,
  confirmTitles,
  confirmDescriptions,
} from './messages';

/**
 * useSubmitAssessmentAction()
 * @description Returns an action object that can be used to submit an assessment.
 * @returns {Object} An action object that can be used to submit an assessment.
 */
const useSubmitAssessmentAction = () => {
  const { formatMessage } = useIntl();
  const isMounted = useIsMounted();
  const { onSubmit, status: submitStatus } = useOnSubmit();
  const viewStep = useViewStep();
  const confirmAction = useConfirmAction();
  const isInvalid = useIsAssessmentInvalid();

  const viewStepMessage = viewStepMessages[viewStep];
  if (!isMounted.current || !viewStepMessage) {
    return { action: null };
  }
  const viewStepLabel = formatMessage(viewStepMessage);
  const defaultLabel = formatMessage(messages.submitGrade, { viewStep: `${viewStepLabel} ` });

  const action = {
    onClick: onSubmit,
    state: submitStatus,
    labels: {
      default: defaultLabel,
      [MutationStatus.loading]: formatMessage(messages.submittingGrade),
      [MutationStatus.success]: formatMessage(messages.gradeSubmitted),
    },
  };

  // Don't bother showing the confirm modal if we're doing student training
  // or if the assessment is invalid and we're just going to show validation
  // errors
  if (viewStep === stepNames.studentTraining || isInvalid) {
    return { action };
  }

  return confirmAction({
    action,
    title: formatMessage(confirmTitles[viewStep]),
    description: formatMessage(confirmDescriptions.assessment),
  });
};

export default useSubmitAssessmentAction;
