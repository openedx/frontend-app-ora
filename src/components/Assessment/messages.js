import { defineMessages } from '@edx/frontend-platform/i18n';

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
    defaultMessage: 'Submit grade',
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
    defaultMessage: 'Finish grading later',
    description: 'Button text for close modal action in the assessment view',
  },
});

export default messages;
