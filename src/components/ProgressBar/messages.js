import { defineMessages } from '@edx/frontend-platform/i18n';

const messages = defineMessages({
  createSubmission: {
    id: 'frontend-app-ora.ProgressBar.createSubmission',
    defaultMessage: 'Create response',
    description: 'Create response progress indicator',
  },
  studentTraining: {
    id: 'frontend-app-ora.ProgressBar.studentTraining',
    defaultMessage: 'Practice grading',
    description: 'Student training step progress indicator',
  },
  selfAssess: {
    id: 'frontend-app-ora.ProgressBar.selfAssess',
    defaultMessage: 'Self grading',
    description: 'Self assessment step progress indicator',
  },
  peerAssess: {
    id: 'frontend-app-ora.ProgressBar.peerAssess',
    defaultMessage: 'Grade peers',
    description: 'Peer assessment step progress indicator',
  },
  myGrade: {
    id: 'frontend-app-ora.ProgressBar.myGrade',
    defaultMessage: 'My grade',
    description: 'My Grade step progress indicator',
  },
});

export default messages;
