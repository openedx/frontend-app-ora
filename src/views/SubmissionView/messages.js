import { defineMessages } from '@edx/frontend-platform/i18n';
import { MutationStatus } from 'constants';

const messages = defineMessages({
  yourResponse: {
    id: 'frontend-app-ora.SubmissionView.yourResponse',
    defaultMessage: 'Your response',
    description: 'Label for the response textarea',
  },
  draftSaved: {
    id: 'frontend-app-ora.SubmissionView.draftSaved',
    defaultMessage: 'Draft saved',
    description: 'Label for the draft saved message',
  },
  instructions: {
    id: 'frontend-app-ora.SubmissionView.instructions',
    defaultMessage: 'Instructions',
    description: 'Label for the instructions textarea',
  },
  instructionsText: {
    id: 'frontend-app-ora.SubmissionView.instructionsText',
    defaultMessage: `Create a response to the prompt below.
    Progress will be saved automatically and you can return to complete your
    progress at any time. After you submit your response, you cannot edit
    it.`,
    description: 'Description for the instructions textarea',
  },
  startTraining: {
    id: 'ora-grading.SubmissionView.startTraining',
    defaultMessage: 'Start practice grading',
    description: 'Action button text for start action to Student Training step',
  },
});

export const submitActionMessages = defineMessages({
  [MutationStatus.idle]: {
    id: 'ora-grading.SubmissionAction.submit',
    defaultMessage: 'Submit response',
    description: 'Submit button text',
  },
  [MutationStatus.loading]: {
    id: 'ora-grading.SubmissionAction.submitting',
    defaultMessage: 'Submitting response',
    description: 'Submit button text while submitting',
  },
  [MutationStatus.success]: {
    id: 'ora-grading.SubmissionAction.submitted',
    defaultMessage: 'Response submitted',
    description: 'Submit button text after successful submission',
  },

});

export const saveActionMessages = defineMessages({
  [MutationStatus.idle]: {
    id: 'ora-grading.SaveAction.save',
    defaultMessage: 'Finish later',
    description: 'Save for later button text',
  },
  [MutationStatus.loading]: {
    id: 'ora-grading.SaveAction.saving',
    defaultMessage: 'Saving response',
    description: 'Save for later button text while saving',
  },
});

export default {
  ...messages,
  ...submitActionMessages,
  ...saveActionMessages,
};
