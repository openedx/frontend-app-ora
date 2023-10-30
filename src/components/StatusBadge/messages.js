import { defineMessages } from '@edx/frontend-platform/i18n';

const messages = defineMessages({
  inProgressBadge: {
    id: 'frontend-app-ora.StatusAlert.inProgressBadge',
    defaultMessage: 'In Progress',
    description: 'Label for the in progress badge',
  },
  completedBadge: {
    id: 'frontend-app-ora.StatusAlert.completedBadge',
    defaultMessage: 'Completed',
    description: 'Label for the completed badge',
  },
  errorBadge: {
    id: 'frontend-app-ora.StatusAlert.errorBadge',
    defaultMessage: 'Incomplete',
    description: 'Label for the incomplete badge',
  },
  cancelledBadge: {
    id: 'frontend-app-ora.StatusAlert.cancelledBadge',
    defaultMessage: 'Cancelled',
    description: 'Label for the cancelled badge',
  },
});

export default messages;
