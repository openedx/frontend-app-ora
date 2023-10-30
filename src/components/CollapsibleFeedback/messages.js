import { defineMessages } from '@edx/frontend-platform/i18n';

const messages = defineMessages({
  readMore: {
    id: 'ora-collapsible-comment.readMore',
    defaultMessage: 'Read more',
    description: 'Read more button text',
  },
  readLess: {
    id: 'ora-collapsible-comment.readLess',
    defaultMessage: 'Read less',
    description: 'Read less button text',
  },
  grade: {
    id: 'ora-collapsible-comment.grade',
    defaultMessage: '{stepLabel} Grade:',
    description: 'Grade button text',
  },
  gradePoints: {
    id: 'ora-collapsible-comment.gradePoints',
    defaultMessage: '{earned} / {possible}',
    description: 'Grade points button text',
  },
  notWeightedGradeLabel: {
    id: 'ora-collapsible-comment.notWeightedGradeLabel',
    defaultMessage: '(Not weighted toward final grade))',
    description: 'Not weighted grade label',
  },
  overallFeedback: {
    id: 'ora-collapsible-comment.overallFeedback',
    defaultMessage: 'Overall Feedback',
    description: 'Overall feedback label',
  },
});

export default messages;
