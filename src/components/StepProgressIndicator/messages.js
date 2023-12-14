import { defineMessages } from '@edx/frontend-platform/i18n';

const messages = defineMessages({
  progress: {
    defaultMessage: '{done} of {needed} completed',
    description: 'Progress indicator for assessments steps with multiple assessments',
    id: 'frontend-app-ora.StepProgressIndicator.progress',
  },
  gradeNextPeerOptional: {
    defaultMessage: 'Grade next peer (optional)',
    description: 'When peer response is optional',
    id: 'frontend-app-ora.StepProgressIndicator.optional',
  },
});

export default messages;
