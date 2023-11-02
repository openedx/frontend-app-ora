import { defineMessages } from '@edx/frontend-platform/i18n';

const messages = defineMessages({
  cancelledHeader: {
    id: 'frontend-app-ora.AssessmentView.cancelledBodyMessage',
    defaultMessage: 'This step has been cancelled',
    description: 'Alert header for the cancelled badge',
  },
  cancelledMessage: {
    id: 'frontend-app-ora.AssessmentView.cancelledBodyMessage',
    defaultMessage: 'Lorem ipsum',
    description: 'Alert message for the cancelled badge',
  },

  completedHeader: {
    id: 'frontend-app-ora.AssessmentView.completedHeader',
    defaultMessage: 'Practice grading complete',
    description: 'Alert header for the completed badge',
  },
  completedMessage: {
    id: 'frontend-app-ora.AssessmentView.completedMessage',
    defaultMessage: 'Practice grading complete',
    description: 'Alert header for the completed badge',
  },
  completedButton: {
    id: 'frontend-app-ora.AssessmentView.completedButton',
    defaultMessage: 'Begin peer grading',
    description: 'Label for button to view your grade',
  },

  closedHeader: {
    id: 'frontend-app-ora.AssessmentView.closedHeader',
    defaultMessage: 'The due date for this step has passed',
    description: 'Alert header for the incomplete badge',
  },
  closedMessage: {
    id: 'frontend-app-ora.AssessmentView.closedMessage',
    defaultMessage: 'Lorem ipsum',
    description: 'Alert message for the incomplete badge',
  },
});

export default messages;
