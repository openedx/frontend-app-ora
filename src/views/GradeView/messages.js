import { defineMessages } from '@edx/frontend-platform/i18n';

const messages = defineMessages({
  aboutYourGrade: {
    id: 'frontend-app-ora.aboutYourGrade',
    defaultMessage: 'About your grade: ',
    description: 'About your grade',
  },
  yourFinalGrade: {
    id: 'frontend-app-ora.yourFinalGrade',
    defaultMessage: 'Your final grade: {earned}/{possible}',
    description: 'Your final grade',
  },
  finalGradeInfo: {
    id: 'frontend-app-ora.finalGradeInfo',
    defaultMessage: 'Your grade is based on your {step} score for this problem. Other assessments don\'t count towards your final score.',
    description: 'Final grade info',
  },
  peerAsFinalGradeInfo: {
    id: 'frontend-app-ora.peerAsFinalGradeInfo',
    defaultMessage: 'Only the required number of peer grades will counted against your final grade. The others are shown, but are not included in your grade calculation',
    description: 'Peer as final grade info',
  },
  unweightedGradesInfo: {
    id: 'frontend-app-ora.unweightedGradesInfo',
    defaultMessage: 'These grades are given to your response. However, these are not used to compute your final grade.',
    description: 'Unweighted grades info',
  },
  unweightedGrades: {
    id: 'frontend-app-ora.unweightedGrades',
    defaultMessage: 'Unweighted Grades',
    description: 'Unweighted grades',
  },
  selfStepLabel: {
    id: 'frontend-app-ora.selfStepLabel',
    defaultMessage: 'Self',
    description: 'Self step label',
  },
  peerStepLabel: {
    id: 'frontend-app-ora.peerStepLabel',
    defaultMessage: 'Peer',
    description: 'Peer step label',
  },
  staffStepLabel: {
    id: 'frontend-app-ora.staffStepLabel',
    defaultMessage: 'Staff',
    description: 'Staff step label',
  },
  peerUnweightedStepLabel: {
    id: 'frontend-app-ora.unweightedPeerStepLabel',
    defaultMessage: 'Unweighted Peer',
    description: 'Unweighted peer step label',
  },
});

export const labelMessages = {
  self: {
    id: 'ora-grade-view.selfStepLabel',
    defaultMessage: 'Self',
    description: 'Self step label',
  },
  peer: {
    id: 'ora-grade-view.peerStepLabel',
    defaultMessage: 'Peer',
    description: 'Peer step label',
  },
  staff: {
    id: 'ora-grade-view.staffStepLabel',
    defaultMessage: 'Staff',
    description: 'Staff step label',
  },
  peerUnweighted: {
    id: 'ora-grade-view.unweightedPeerStepLabel',
    defaultMessage: 'Unweighted Peer',
    description: 'Unweighted peer step label',
  },
};

export default messages;
