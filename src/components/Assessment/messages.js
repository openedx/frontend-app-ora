import { defineMessages } from '@edx/frontend-platform/i18n';
import { stepNames } from 'constants';

const messages = defineMessages({
  gradeSubmitted: {
    id: 'frontend-app-ora.EditableAssessment.gradeSubmitted',
    defaultMessage: 'Grade Submitted',
    description: 'Submit Grade button text after successful submission',
  },
  rubric: {
    id: 'frontend-app-ora.EditableAssessment.rubric',
    defaultMessage: 'Rubric',
    description: 'Rubric interface label',
  },
  submitGrade: {
    id: 'frontend-app-ora.EditableAssessment.submitGrade',
    defaultMessage: 'Submit{viewStep}grade',
    description: 'Submit Grade button text',
  },
  submittingGrade: {
    id: 'frontend-app-ora.EditableAssessment.submittingGrade',
    defaultMessage: 'Submitting grade',
    description: 'Submit Grade button text while submitting',
  },
  overallComments: {
    id: 'frontend-app-ora.EditableAssessment.overallComments',
    defaultMessage: 'Overall comments',
    description: 'Rubric overall comments label',
  },
  addComments: {
    id: 'frontend-app-ora.EditableAssessment.addComments',
    defaultMessage: 'Add comments (Optional)',
    description: 'Rubric comments input label',
  },
  comments: {
    id: 'frontend-app-ora.EditableAssessment.comments',
    defaultMessage: 'Comments (Optional)',
    description: 'Rubric comments display label',
  },
  overallFeedbackError: {
    id: 'frontend-app-ora.EditableAssessment.overallFeedbackError',
    defaultMessage: 'The overall feedback is required',
    description: 'Error message when feedback input is required',
  },
  finishLater: {
    id: 'frontend-app-ora.EditableAssessment.finishLater',
    defaultMessage: 'Exit without saving',
    description: 'Button text for close modal action in the assessment view',
  },
});

export const viewStepMessages = defineMessages({
  [stepNames.self]: {
    id: 'frontend-app-ora.EditableAssessment.viewStep.self',
    defaultMessage: 'self',
    description: 'View step label for self assessment',
  },
  [stepNames.peer]: {
    id: 'frontend-app-ora.EditableAssessment.viewStep.peer',
    defaultMessage: 'peer',
    description: 'View step label for peer assessment',
  },
  [stepNames.studentTraining]: {
    id: 'frontend-app-ora.EditableAssessment.viewStep.studentTraining',
    defaultMessage: 'practice',
    description: 'View step label for student training',
  },
});

export default messages;
