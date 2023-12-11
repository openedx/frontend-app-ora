import { defineMessages } from '@edx/frontend-platform/i18n';
import { stepNames } from 'constants/index';

const messages = defineMessages({
  [stepNames.self]: {
    defaultMessage: 'Self grading',
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

const responseMessages = defineMessages({
  [stepNames.self]: {
    defaultMessage: 'Your response',
    description: 'Self assessment view response header text',
    id: 'frontend-app-ora.selfAssessmentView.responseHeader',
  },
  [stepNames.peer]: {
    defaultMessage: 'Peer response',
    description: 'Peer assessment view response header text',
    id: 'frontend-app-ora.peerAssessmentView.responseHeader',
  },
  [stepNames.studentTraining]: {
    defaultMessage: 'Example response',
    description: 'Student training view response header text',
    id: 'frontend-app-ora.studentTrainingView.responseHeader',
  },
});

export default {
  ...messages,
  responseMessages,
};
