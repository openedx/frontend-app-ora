import { useIntl } from '@edx/frontend-platform/i18n';

import { MutationStatus, stepNames } from 'constants/index';

import { useOnSubmit } from 'hooks/assessment';
import { useViewStep } from 'hooks/routing';

import useConfirmAction from './useConfirmAction';

import messages, {
  viewStepMessages,
  confirmTitles,
  confirmDescriptions,
} from './messages';

const useSubmitAssessmentAction = () => {
  const { onSubmit, status: submitStatus } = useOnSubmit();
  const { formatMessage } = useIntl();
  const viewStep = useViewStep();
  const viewStepMessage = viewStepMessages[viewStep]
    ? `${formatMessage(viewStepMessages[viewStep])} `
    : '';
  const confirmAction = useConfirmAction();

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
  if (viewStep === stepNames.studentTraining) {
    return { action };
  }
  return confirmAction({
    action,
    title: formatMessage(confirmTitles[viewStep]),
    description: formatMessage(confirmDescriptions.assessment),
  });
};

export default useSubmitAssessmentAction;
