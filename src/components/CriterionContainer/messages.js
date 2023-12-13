import { defineMessages } from '@edx/frontend-platform/i18n';

const messages = defineMessages({
  addComments: {
    id: 'frontend-app-ora.CriterionFeedback.addCommentsLabel',
    defaultMessage: 'Add comments',
    description: 'label for editable feedback field',
  },
  comments: {
    id: 'frontend-app-ora.CriterionFeedback.commentsLabel',
    defaultMessage: 'Comments',
    description: 'label for read-only feedback field',
  },
  optional: {
    id: 'frontend-app-ora.CriterionFeedback.optional',
    defaultMessage: '(Optional)',
    description: 'additional label for optional feedback field',
  },
  optionPoints: {
    id: 'frontend-app-ora.RadioCriterion.optionPoints',
    defaultMessage: '{points} points',
    description: 'criterion option point value display',
  },
  rubricSelectedError: {
    id: 'frontend-app-ora.RadioCriterion.rubricSelectedError',
    defaultMessage: 'Rubric selection is required',
    description: 'Error message when rubric radio did not get selected',
  },
  studentTrainingSelectedError: {
    id: 'frontend-app-ora.RadioCriterion.studentTrainingSelectedError',
    defaultMessage: 'Reevaluate and select a new score',
    description: 'Error message when select wrong student training',
  },
  criterionFeedbackError: {
    id: 'frontend-app-ora.CriterionFeedback.criterionFeedbackError',
    defaultMessage: 'The feedback is required',
    description: 'Error message when feedback is required',
  },
});

export default messages;
