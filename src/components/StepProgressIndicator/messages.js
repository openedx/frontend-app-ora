import { defineMessages } from '@edx/frontend-platform/i18n';

const messages = defineMessages({
  progress: {
    defaultMessage: '{done} of {needed} completed',
    description: 'Progress indicator for assessments steps with multiple assessments',
    id: 'frontend-app-ora.StepProgressIndicator.progress',
  },
  gradeNextPeer: {
    defaultMessage: 'Grade next peer',
    description: 'Progress indicator action button text to load next peer assessment',
    id: 'frontend-app-ora.StepProgressIndicator.gradeNextPeer',
  },
  loadNextPractice: {
    defaultMessage: 'Load next practice response',
    description: 'Progress indicator action button text to load next practice assessment',
    id: 'frontend-app-ora.StepProgressIndicator.loadNextPractice',
  },
});

export default messages;
