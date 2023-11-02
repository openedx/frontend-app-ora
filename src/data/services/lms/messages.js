import { defineMessages } from '@edx/frontend-platform/i18n';
import { stepNames } from './constants';

const messages = defineMessages({
  [stepNames.studentTraining]: {
    defaultMessage: 'Practice grading',
    description: 'studentTraining label',
    id: 'frontend-app-ora.lmsAPI.studentTrainingLabel',
  },
  [stepNames.self]: {
    defaultMessage: 'Self assessment',
    description: 'self label',
    id: 'frontend-app-ora.lmsAPI.selfLabel',
  },
  [stepNames.peer]: {
    defaultMessage: 'Peer assessment',
    description: 'peer label',
    id: 'frontend-app-ora.lmsAPI.peerLabel',
  },
  [stepNames.staff]: {
    defaultMessage: 'Staff assessment',
    description: 'staff label',
    id: 'frontend-app-ora.lmsAPI.staffLabel',
  },
});

export default messages;
