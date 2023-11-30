import { defineMessages } from '@edx/frontend-platform/i18n';

const messages = defineMessages({
  gradeSubmitted: {
    id: 'frontend-app-ora.Rubric.gradeSubmitted',
    defaultMessage: 'Grade Submitted',
    description: 'Submit Grade button text after successful submission',
  },
  rubric: {
    id: 'frontend-app-ora.Rubric.rubric',
    defaultMessage: 'Rubric',
    description: 'Rubric interface label',
  },
  submitGrade: {
    id: 'frontend-app-ora.Rubric.submitGrade',
    defaultMessage: 'Submit grade',
    description: 'Submit Grade button text',
  },
  submittingGrade: {
    id: 'frontend-app-ora.Rubric.submittingGrade',
    defaultMessage: 'Submitting grade',
    description: 'Submit Grade button text while submitting',
  },
  overallComments: {
    id: 'frontend-app-ora.Rubric.overallComments',
    defaultMessage: 'Overall comments',
    description: 'Rubric overall comments label',
  },
  addComments: {
    id: 'frontend-app-ora.Rubric.addComments',
    defaultMessage: 'Add comments (Optional)',
    description: 'Rubric comments input label',
  },
  comments: {
    id: 'frontend-app-ora.Rubric.comments',
    defaultMessage: 'Comments (Optional)',
    description: 'Rubric comments display label',
  },
  overallFeedbackError: {
    id: 'frontend-app-ora.RubricFeedback.error',
    defaultMessage: 'The overall feedback is required',
    description: 'Error message when feedback input is required',
  },
  header: {
    id: 'frontend-app-ora.Rubric.header',
    defaultMessage: 'Grading criteria',
    description: 'Rubric header text',
  },
});

export default messages;
