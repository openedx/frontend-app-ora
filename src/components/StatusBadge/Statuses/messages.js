import { defineMessages } from '@edx/frontend-platform/i18n';

const messages = defineMessages({
  yourResponse: {
    id: 'frontend-app-ora.AssessmentView.yourResponse',
    defaultMessage: 'Your response',
    description: 'Label for the response textarea',
  },
  instructions: {
    id: 'frontend-app-ora.AssessmentView.instructions',
    defaultMessage: 'Instructions',
    description: 'Label for the instructions textarea',
  },
  instructionsText: {
    id: 'frontend-app-ora.AssessmentView.instructionsText',
    defaultMessage: `Create a response to the prompt below.
    Progress will be saved automatically and you can return to complete your
    progress at any time. After you submit your response, you cannot edit
    it.`,
    description: 'Description for the instructions textarea',
  },
  inProgressBadge: {
    id: 'frontend-app-ora.AssessmentView.inProgressBadge',
    defaultMessage: 'In Progress',
    description: 'Label for the in progress badge',
  },
  inProgressHeader: {
    id: 'frontend-app-ora.AssessmentView.inProgressHeader',
    defaultMessage: 'Self-grading due by {dueDate}',
    description: 'Header for the in progress badge',
  },
  inProgressText: {
    id: 'frontend-app-ora.AssessmentView.inProgressBadgeText',
    defaultMessage: `Assess your own response and give
    yourself a grade. Progress will be saved automatically and you
    can return to complete your self assessment at any time. After
    you submit your grade, you cannot edit it.`,
    description: 'Description for the in progress badge',
  },
  inProgressButton: {
    id: 'frontend-app-ora.AssessmentView.inProgressButton',
    defaultMessage: 'Begin self assessment',
    description: 'Label for button to begin self assessment',
  },
  completedBadge: {
    id: 'frontend-app-ora.AssessmentView.completedBadge',
    defaultMessage: 'Completed',
    description: 'Label for the completed badge',
  },
  completedHeader: {
    id: 'frontend-app-ora.AssessmentView.completedHeader',
    defaultMessage: 'Practice grading is complete!',
    description: 'Header for the completed badge',
  },
  completedBodyHeader: {
    id: 'frontend-app-ora.AssessmentView.completedBodyHeader',
    defaultMessage: 'Practice grading complete',
    description: 'Alert header for the completed badge',
  },
  completedBodyButton: {
    id: 'frontend-app-ora.AssessmentView.completedBodyButton',
    defaultMessage: 'Begin peer grading',
    description: 'Label for button to view your grade',
  },
  errorBadge: {
    id: 'frontend-app-ora.AssessmentView.errorBadge',
    defaultMessage: 'Incomplete',
    description: 'Label for the incomplete badge',
  },
  errorHeader: {
    id: 'frontend-app-ora.AssessmentView.errorBadgeHeader',
    defaultMessage: 'This step is past due!',
    description: 'Header for the incomplete badge',
  },
  errorBodyHeader: {
    id: 'frontend-app-ora.AssessmentView.errorBodyHeader',
    defaultMessage: 'The due date for this step has passed',
    description: 'Alert header for the incomplete badge',
  },
  cancelledBadge: {
    id: 'frontend-app-ora.AssessmentView.cancelledBadge',
    defaultMessage: 'Cancelled',
    description: 'Label for the cancelled badge',
  },
  cancelledHeader: {
    id: 'frontend-app-ora.AssessmentView.cancelledBadgeHeader',
    defaultMessage: 'Self-grading Due by {dueDate}',
    description: 'Header for the cancelled badge',
  },
  cancelledBodyHeader: {
    id: 'frontend-app-ora.AssessmentView.cancelledBodyHeader',
    defaultMessage: 'This step has been cancelled',
    description: 'Alert header for the cancelled badge',
  },
});

export default messages;
