import { defineMessages } from '@edx/frontend-platform/i18n';

import { stepNames } from 'constants';

const messages = defineMessages({
  [stepNames.submission]: {
    defaultMessage: 'Enter your response to the prompt. Your work will save automatically and you can return to complete your response at any time before the due date. After you submit your response, you cannot edit it.',
    description: 'Submission step instructions',
    id: 'frontend-app-ora.instructions.submisison',
  },
  [stepNames.studentTraining]: {
    defaultMessage: 'Before you begin to assess your peers\' responses, you\'ll learn how to complete peer assessments by reviewing responses that instructors have already assessed. If you select the same options for the response that the instructor selected, you\'ll move to the next step. If you don\'t select the same options, you\'ll review the response and try again.',
    description: 'StudentTraining step instructions',
    id: 'frontend-app-ora.instructions.studentTraining',
  },
  [stepNames.self]: {
    defaultMessage: 'Assess your response',
    description: 'Self Assessment step instructions',
    id: 'frontend-app-ora.instructions.selfAssessment',
  },
  [stepNames.peer]: {
    defaultMessage: 'Read and assess the following response from one of your peers.',
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
