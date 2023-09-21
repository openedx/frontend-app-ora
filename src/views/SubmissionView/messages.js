import { defineMessages } from '@edx/frontend-platform/i18n';

const messages = defineMessages({
  submissionActionFinishLater: {
    id: 'ora-grading.SubmissionAction.finishLater',
    defaultMessage: 'Finish later',
    description: 'Finish later button text',
  },
  submissionActionSubmit: {
    id: 'ora-grading.SubmissionAction.submit',
    defaultMessage: 'Submit response',
    description: 'Submit button text',
  },
  submissionActionSubmitting: {
    id: 'ora-grading.SubmissionAction.submitting',
    defaultMessage: 'Submitting response',
    description: 'Submit button text while submitting',
  },
  submissionActionSubmitted: {
    id: 'ora-grading.SubmissionAction.submitted',
    defaultMessage: 'Response submitted',
    description: 'Submit button text after successful submission',
  },
});

export default messages;
