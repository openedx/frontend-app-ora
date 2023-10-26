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
    defaultMessage: 'This is your score, your points earned over the total points possible.',
    description: 'Final grade info',
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
  unweightedPeerStepLabel: {
    id: 'ora-grade-view.unweightedPeerStepLabel',
    defaultMessage: 'Unweighted Peer',
    description: 'Unweighted peer step label',
  },
});

export default messages;
