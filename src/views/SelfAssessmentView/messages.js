import { defineMessages } from '@edx/frontend-platform/i18n';

const messages = defineMessages({
  yourResponse: {
    id: 'ora-grading.AssessmentView.yourResponse',
    defaultMessage: 'Your response',
    description: 'Label for the response textarea',
  },
  instructions: {
    id: 'ora-grading.AssessmentView.instructions',
    defaultMessage: 'Instructions',
    description: 'Label for the instructions textarea',
  },
  instructionsText: {
    id: 'ora-grading.AssessmentView.instructionsText',
    defaultMessage: `Create a response to the prompt below.
    Progress will be saved automatically and you can return to complete your
    progress at any time. After you submit your response, you cannot edit
    it.`,
    description: 'Description for the instructions textarea',
  },
  inProgressBadge: {
    id: 'ora-grading.AssessmentView.inProgressBadge',
    defaultMessage: 'In Progress',
    description: 'Label for the in progress badge',
  },
  inProgressHeader: {
    id: 'ora-grading.AssessmentView.inProgressHeader',
    defaultMessage: 'Self-grading due by {dueDate}',
    description: 'Header for the in progress badge',
  },
  inProgressText: {
    id: 'ora-grading.AssessmentView.inProgressBadgeText',
    defaultMessage: `Assess your own response and give
    yourself a grade. Progress will be saved automatically and you
    can return to complete your self assessment at any time. After
    you submit your grade, you cannot edit it.`,
    description: 'Description for the in progress badge',
  },
  inProgressButton: {
    id: 'ora-grading.AssessmentView.inProgressButton',
    defaultMessage: 'Begin self assessment',
    description: 'Label for button to begin self assessment',
  },
  completedBadge: {
    id: 'ora-grading.AssessmentView.completedBadge',
    defaultMessage: 'Completed',
    description: 'Label for the completed badge',
  },
  completedHeader: {
    id: 'ora-grading.AssessmentView.completedHeader',
    defaultMessage: 'Practice grading is complete!',
    description: 'Header for the completed badge',
  },
  completedBodyHeader: {
    id: 'ora-grading.AssessmentView.completedBodyHeader',
    defaultMessage: 'Practice grading complete',
    description: 'Alert header for the completed badge',
  },
  completedBodyButton: {
    id: 'ora-grading.AssessmentView.completedBodyButton',
    defaultMessage: 'Begin peer grading',
    description: 'Label for button to view your grade',
  },
  errorBadge: {
    id: 'ora-grading.AssessmentView.errorBadge',
    defaultMessage: 'Incomplete',
    description: 'Label for the incomplete badge',
  },
  errorHeader: {
    id: 'ora-grading.AssessmentView.errorBadgeHeader',
    defaultMessage: 'This step is past due!',
    description: 'Header for the incomplete badge',
  },
  errorBodyHeader: {
    id: 'ora-grading.AssessmentView.errorBodyHeader',
    defaultMessage: 'The due date for this step has passed',
    description: 'Alert header for the incomplete badge',
  },
  cancelledBadge: {
    id: 'ora-grading.AssessmentView.cancelledBadge',
    defaultMessage: 'Cancelled',
    description: 'Label for the cancelled badge',
  },
  cancelledHeader: {
    id: 'ora-grading.AssessmentView.cancelledBadgeHeader',
    defaultMessage: 'Self-grading Due by {dueDate}',
    description: 'Header for the cancelled badge',
  },
  cancelledBodyHeader: {
    id: 'ora-grading.AssessmentView.cancelledBodyHeader',
    defaultMessage: 'This step has been cancelled',
    description: 'Alert header for the cancelled badge',
  },
});

export default messages;
