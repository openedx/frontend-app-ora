import { defineMessages } from '@edx/frontend-platform/i18n';

const messages = defineMessages({
  teamAlreadySubmittedHeader: {
    id: 'ora-grading.StatusView.Submission.teamAlreadySubmittedHeader',
    defaultMessage: 'Your team has already submitted the assignment',
    description: 'Alert header for the team already submitted badge',
  },
  teamAlreadySubmittedMessage: {
    id: 'ora-grading.StatusView.Submission.teamAlreadySubmittedMessage',
    defaultMessage: 'Lorem ipsum',
    description: 'Alert message for the team already submitted badge',
  },

  completedHeader: {
    id: 'ora-grading.StatusView.Submission.completedHeader',
    defaultMessage: 'Your response has been submitted!',
    description: 'Alert header for the completed badge',
  },
  completedMessage: {
    id: 'ora-grading.StatusView.Submission.completedMessage',
    defaultMessage: 'Lorem Ipsum',
    description: 'Alert header for the completed badge',
  },

  closedHeader: {
    id: 'ora-grading.StatusView.Submission.closedHeader',
    defaultMessage: 'The due date for this step has passed',
    description: 'Alert header for the incomplete badge',
  },
  closedMessage: {
    id: 'ora-grading.StatusView.Submission.closedMessage',
    defaultMessage: 'Lorem ipsum',
    description: 'Alert message for the incomplete badge',
  },
});

export default messages;
