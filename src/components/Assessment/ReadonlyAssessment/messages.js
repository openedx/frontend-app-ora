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
    defaultMessage: '{stepLabel} grade',
    description: 'Unweighted grade group text',
  },
  grade: {
    id: 'frontend-app-ora.grade',
    defaultMessage: '{stepLabel} grade:',
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
    defaultMessage: 'Overall feedback',
    description: 'Overall feedback label',
  },
  stepComments: {
    id: 'ora-collapsible-comment.stepComments',
    defaultMessage: '{step} comments',
    description: 'Step comments label for completed assessments',
  },
  comments: {
    id: 'ora-collapsible-comment.comments',
    defaultMessage: 'comments',
    description: 'Comments label for completed assessments',
  },
  submittedGrade: {
    id: 'ora-collapsible-comment.submittedGrade',
    defaultMessage: 'Submitted grade',
    description: 'Header for submitted grade display',
  },
  submittedAssessment: {
    id: 'ora-collapsible-comment.submittedAssessment',
    defaultMessage: 'Submitted assessment',
    description: 'Header for submitted assessment display',
  },
  comment: {
    id: 'ora-collapsible-comment.comment',
    defaultMessage: 'Comments',
    description: 'Header for comment component if no step provided',
  },
  stepComment: {
    id: 'ora-collapsible-comment.stepComment',
    defaultMessage: '{step} comment',
    description: 'Header for comment component if step is provided',
  },
  points: {
    id: 'ora-collapsible-comment.points',
    defaultMessage: 'Points',
    description: 'Header for points component',
  },
});

export default messages;
