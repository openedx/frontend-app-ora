import { defineMessages } from '@edx/frontend-platform/i18n';

const messages = defineMessages({
  cancelledHeader: {
    id: 'ora-grading.AssessmentView.cancelledBodyMessage',
    defaultMessage: 'This step has been cancelled',
    description: 'Alert header for the cancelled badge',
  },
  cancelledMessage: {
    id: 'ora-grading.AssessmentView.cancelledBodyMessage',
    defaultMessage: 'Lorem ipsum',
    description: 'Alert message for the cancelled badge',
  },

  completedHeader: {
    id: 'ora-grading.AssessmentView.completedHeader',
    defaultMessage: 'Practice grading complete',
    description: 'Alert header for the completed badge',
  },
  completedMessage: {
    id: 'ora-grading.AssessmentView.completedMessage',
    defaultMessage: 'Practice grading complete',
    description: 'Alert header for the completed badge',
  },
  completedButton: {
    id: 'ora-grading.AssessmentView.completedButton',
    defaultMessage: 'Begin peer grading',
    description: 'Label for button to view your grade',
  },

  closedHeader: {
    id: 'ora-grading.AssessmentView.closedHeader',
    defaultMessage: 'The due date for this step has passed',
    description: 'Alert header for the incomplete badge',
  },
  closedMessage: {
    id: 'ora-grading.AssessmentView.closedMessage',
    defaultMessage: 'Lorem ipsum',
    description: 'Alert message for the incomplete badge',
  },
});

export default messages;
