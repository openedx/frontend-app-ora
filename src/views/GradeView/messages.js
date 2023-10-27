import { defineMessages } from '@edx/frontend-platform/i18n';

const messages = defineMessages({
  aboutYourGrade: {
    id: 'ora-grade-view.aboutYourGrade',
    defaultMessage: 'About your grade: ',
    description: 'About your grade',
  },
  yourFinalGrade: {
    id: 'ora-grade-view.yourFinalGrade',
    defaultMessage: 'Your final grade: {earned}/{possible}',
    description: 'Your final grade',
  },
  finalGradeInfo: {
    id: 'ora-grade-view.finalGradeInfo',
    defaultMessage: 'Your grade is based on your {step} score for this problem. Other assessments don\'t count towards your final score.',
    description: 'Final grade info',
  },
  peerAsFinalGradeInfo: {
    id: 'ora-grade-view.peerAsFinalGradeInfo',
    defaultMessage: 'Only the required number of peer grades will counted against your final grade. The others are shown, but are not included in your grade calculation',
    description: 'Peer as final grade info',
  },
  unweightedGradesInfo: {
    id: 'ora-grade-view.unweightedGradesInfo',
    defaultMessage: 'These grades are given to your response. However, these are not used to compute your final grade.',
    description: 'Unweighted grades info',
  },
  unweightedGrades: {
    id: 'ora-grade-view.unweightedGrades',
    defaultMessage: 'Unweighted Grades',
    description: 'Unweighted grades',
  },
  selfStepLabel: {
    id: 'ora-grade-view.selfStepLabel',
    defaultMessage: 'Self',
    description: 'Self step label',
  },
  peerStepLabel: {
    id: 'ora-grade-view.peerStepLabel',
    defaultMessage: 'Peer',
    description: 'Peer step label',
  },
  staffStepLabel: {
    id: 'ora-grade-view.staffStepLabel',
    defaultMessage: 'Staff',
    description: 'Staff step label',
  },
  peerUnweightedStepLabel: {
    id: 'ora-grade-view.unweightedPeerStepLabel',
    defaultMessage: 'Unweighted Peer',
    description: 'Unweighted peer step label',
  },
});

export default messages;
