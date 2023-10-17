import { defineMessages } from '@edx/frontend-platform/i18n';

import { stepNames } from 'data/services/lms/constants';

const messages = defineMessages({
  [stepNames.submission]: {
    defaultMessage: '<Submittion Instructions: TODO>',
    description: 'Submission step instructions',
    id: 'frontend-app-ora.instructions.submisison',
  },
  [stepNames.studentTraining]: {
    defaultMessage: '<Student Training Instructions: TODO>',
    description: 'StudentTraining step instructions',
    id: 'frontend-app-ora.instructions.studentTraining',
  },
  [stepNames.self]: {
    defaultMessage: '<Self Assessment Instructions: TODO>',
    description: 'Self Assessment step instructions',
    id: 'frontend-app-ora.instructions.selfAssessment',
  },
  [stepNames.peer]: {
    defaultMessage: '<Peer Assessment Instructions: TODO>',
    description: 'Peer Assessment step instructions',
    id: 'frontend-app-ora.instructions.peerAssessment',
  },
  [stepNames.done]: {
    defaultMessage: 'You have successfully completed this problem and received a {earned}/{possible}.',
    description: 'Graded step instructions',
    id: 'frontend-app-ora.instructions.done',
  },
});

export default messages;
