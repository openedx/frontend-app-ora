import { defineMessages } from '@edx/frontend-platform/i18n';

const messages = defineMessages({
  readMore: {
    id: 'frontend-app-ora.readMore',
    defaultMessage: 'Read more',
    description: 'Read more button text',
  },
  readLess: {
    id: 'frontend-app-ora.readLess',
    defaultMessage: 'Read less',
    description: 'Read less button text',
  },
  unweightedGrade: {
    id: 'ora-collapsible-comment.unweightedGrade',
    defaultMessage: '{stepLabel} Grade',
    description: 'Unweighted grade group text',
  },
  grade: {
    id: 'frontend-app-ora.grade',
    defaultMessage: '{stepLabel} Grade:',
    description: 'Grade button text',
  },
  gradePoints: {
    id: 'frontend-app-ora.gradePoints',
    defaultMessage: '{earned} / {possible}',
    description: 'Grade points button text',
  },
  notWeightedGradeLabel: {
    id: 'frontend-app-ora.notWeightedGradeLabel',
    defaultMessage: '(Not weighted toward final grade))',
    description: 'Not weighted grade label',
  },
  overallFeedback: {
    id: 'frontend-app-ora.overallFeedback',
    defaultMessage: 'Overall Feedback',
    description: 'Overall feedback label',
  },
});

export default messages;
