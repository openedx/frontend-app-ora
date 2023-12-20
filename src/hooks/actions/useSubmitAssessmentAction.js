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

const useSubmitAssessmentAction = () => {
  const isMounted = useIsMounted();
  const { onSubmit, status: submitStatus } = useOnSubmit();
  const { formatMessage } = useIntl();
  const viewStep = useViewStep();
  const viewStepMessage = viewStepMessages[viewStep]
    ? `${formatMessage(viewStepMessages[viewStep])} `
    : '';
  const confirmAction = useConfirmAction();
  const isInvalid = useIsAssessmentInvalid();

  if (!isMounted.current) {
    return { action: null };
  }
  const action = {
    onClick: onSubmit,
    state: submitStatus,
    labels: {
      default: formatMessage(messages.submitGrade, {
        viewStep: viewStepMessage,
      }),
      [MutationStatus.loading]: formatMessage(messages.submittingGrade),
      [MutationStatus.success]: formatMessage(messages.gradeSubmitted),
    },
  };
  if (viewStep === stepNames.studentTraining || isInvalid) {
    // Don't bother showing the confirm modal if we're doing student training
    // or if the assessment is invalid and we're just going to show validation
    // errors
    return { action };
  }
  return confirmAction({
    action,
    title: formatMessage(confirmTitles[viewStep]),
    description: formatMessage(confirmDescriptions.assessment),
  });
};

export default useSubmitAssessmentAction;
