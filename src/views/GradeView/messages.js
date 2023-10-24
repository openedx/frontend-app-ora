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
  unweightedGrades: {
    id: 'ora-grade-view.unweightedGrades',
    defaultMessage: 'Unweighted Grades',
    description: 'Unweighted grades',
  },
  selfStep: {
    id: 'ora-grade-view.selfStep',
    defaultMessage: 'Self',
    description: 'Self step',
  },
  peerStep: {
    id: 'ora-grade-view.peerStep',
    defaultMessage: 'Peer',
    description: 'Peer step',
  },
  staffStep: {
    id: 'ora-grade-view.staffStep',
    defaultMessage: 'Staff',
    description: 'Staff step',
  },
  unweightedPeerStep: {
    id: 'ora-grade-view.unweightedPeerStep',
    defaultMessage: 'Unweighted Peer',
    description: 'Unweighted peer step',
  },
});

export default messages;
