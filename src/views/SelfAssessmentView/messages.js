import { defineMessages } from '@edx/frontend-platform/i18n';

const messages = defineMessages({
  yourResponse: {
    id: 'ora-grading.AssessmentView.yourResponse',
    defaultMessage: 'Your response',
    description: 'Label for the response textarea',
  },
  instructions: {
    id: 'ora-grading.AssessmentView.instructions',
    defaultMessage: 'Instructions',
    description: 'Label for the instructions textarea',
  },
  instructionsText: {
    id: 'ora-grading.AssessmentView.instructionsText',
    defaultMessage: `Create a response to the prompt below.
    Progress will be saved automatically and you can return to complete your
    progress at any time. After you submit your response, you cannot edit
    it.`,
    description: 'Description for the instructions textarea',
  },
  submissionActionSubmit: {
    id: 'ora-grading.AssessmentAction.submit',
    defaultMessage: 'Submit response',
    description: 'Submit button text',
  },
  submissionActionSubmitting: {
    id: 'ora-grading.AssessmentAction.submitting',
    defaultMessage: 'Submitting response',
    description: 'Submit button text while submitting',
  },
  submissionActionSubmitted: {
    id: 'ora-grading.AssessmentAction.submitted',
    defaultMessage: 'Response submitted',
    description: 'Submit button text after successful submission',
  },
  saveActionSave: {
    id: 'ora-grading.SaveAction.save',
    defaultMessage: 'Finish later',
    description: 'Save for later button text',
  },
  saveActionSaving: {
    id: 'ora-grading.SaveAction.saving',
    defaultMessage: 'Saving response',
    description: 'Save for later button text while saving',
  },
});

export default messages;
