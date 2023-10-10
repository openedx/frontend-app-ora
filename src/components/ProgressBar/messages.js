import { defineMessages } from '@edx/frontend-platform/i18n';

const messages = defineMessages({
  createSubmission: {
    id: 'ora-grading.ProgressBar.createSubmission',
    defaultMessage: 'Create your response',
    description: 'Create response progress indicator',
  },
  studentTraining: {
    id: 'ora-grading.ProgressBar.studentTraining',
    defaultMessage: 'Practice grading',
    description: 'Student training step progress indicator',
  },
  selfAssess: {
    id: 'ora-grading.ProgressBar.selfAssess',
    defaultMessage: 'Grade yourself',
    description: 'Self assessment step progress indicator',
  },
  peerAssess: {
    id: 'ora-grading.ProgressBar.peerAssess',
    defaultMessage: 'Grade peers',
    description: 'Peer assessment step progress indicator',
  },
  myGrade: {
    id: 'ora-grading.ProgressBar.myGrade',
    defaultMessage: 'My grade',
    description: 'My Grade step progress indicator',
  },
});

export default messages;
