import { defineMessages } from '@edx/frontend-platform/i18n';

const messages = defineMessages({
  teamAlreadySubmittedHeader: {
    id: 'frontend-app-ora.StatusView.Submission.teamAlreadySubmittedHeader',
    defaultMessage: 'Your team has already submitted the assignment',
    description: 'Alert header for the team already submitted badge',
  },
  teamAlreadySubmittedMessage: {
    id: 'frontend-app-ora.StatusView.Submission.teamAlreadySubmittedMessage',
    defaultMessage: 'Lorem ipsum',
    description: 'Alert message for the team already submitted badge',
  },

  completedHeader: {
    id: 'frontend-app-ora.StatusView.Submission.completedHeader',
    defaultMessage: 'Your response has been submitted!',
    description: 'Alert header for the completed badge',
  },
  completedMessage: {
    id: 'frontend-app-ora.StatusView.Submission.completedMessage',
    defaultMessage: 'Lorem Ipsum',
    description: 'Alert header for the completed badge',
  },

  closedHeader: {
    id: 'frontend-app-ora.StatusView.Submission.closedHeader',
    defaultMessage: 'The due date for this step has passed',
    description: 'Alert header for the incomplete badge',
  },
  closedMessage: {
    id: 'frontend-app-ora.StatusView.Submission.closedMessage',
    defaultMessage: 'Lorem ipsum',
    description: 'Alert message for the incomplete badge',
  },
});

export default messages;
