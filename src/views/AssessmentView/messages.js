import { defineMessages } from '@edx/frontend-platform/i18n';
import { stepNames } from 'data/services/lms/constants';

const messages = defineMessages({
  [stepNames.self]: {
    defaultMessage: 'Grade yourelf',
    description: 'Self assessment view header text',
    id: 'frontend-app-ora.selfAssessmentView.header',
  },
  [stepNames.peer]: {
    defaultMessage: 'Grade your peers',
    description: 'Peer assessment view header text',
    id: 'frontend-app-ora.peerAssessmentView.header',
  },
  [stepNames.studentTraining]: {
    defaultMessage: 'Practice grading',
    description: 'Student training view header text',
    id: 'frontend-app-ora.studentTrainingView.header',
  },
});

export default messages;
