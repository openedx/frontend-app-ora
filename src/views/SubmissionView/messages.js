import { defineMessages } from '@edx/frontend-platform/i18n';

const messages = defineMessages({
  yourResponse: {
    id: 'ora-grading.SubmissionView.yourResponse',
    defaultMessage: 'Your response',
    description: 'Label for the response textarea',
  },
  draftSaved: {
    id: 'ora-grading.SubmissionView.draftSaved',
    defaultMessage: 'Draft saved',
    description: 'Label for the draft saved message',
  },
  instructions: {
    id: 'ora-grading.SubmissionView.instructions',
    defaultMessage: 'Instructions',
    description: 'Label for the instructions textarea',
  },
  instructionsText: {
    id: 'ora-grading.SubmissionView.instructionsText',
    defaultMessage: `Create a response to the prompt below.
    Progress will be saved automatically and you can return to complete your
    progress at any time. After you submit your response, you cannot edit
    it.`,
    description: 'Description for the instructions textarea',
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
  saveForLaterActionSave: {
    id: 'ora-grading.SaveForLaterAction.save',
    defaultMessage: 'Finish later',
    description: 'Save for later button text',
  },
  saveForLaterActionSaving: {
    id: 'ora-grading.SaveForLaterAction.saving',
    defaultMessage: 'Saving response',
    description: 'Save for later button text while saving',
  },
});

export default messages;
