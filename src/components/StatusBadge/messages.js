import { defineMessages } from '@edx/frontend-platform/i18n';

const messages = defineMessages({
  inProgressBadge: {
    id: 'ora-grading.StatusAlert.inProgressBadge',
    defaultMessage: 'In Progress',
    description: 'Label for the in progress badge',
  },
  completedBadge: {
    id: 'ora-grading.StatusAlert.completedBadge',
    defaultMessage: 'Completed',
    description: 'Label for the completed badge',
  },
  errorBadge: {
    id: 'ora-grading.StatusAlert.errorBadge',
    defaultMessage: 'Incomplete',
    description: 'Label for the incomplete badge',
  },
  cancelledBadge: {
    id: 'ora-grading.StatusAlert.cancelledBadge',
    defaultMessage: 'Cancelled',
    description: 'Label for the cancelled badge',
  },
});

export default messages;
