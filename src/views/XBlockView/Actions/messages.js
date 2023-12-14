import { defineMessages } from '@edx/frontend-platform/i18n';

import { stepNames } from 'constants/index';

const messages = defineMessages({
  [stepNames.submission]: {
    defaultMessage: 'Create response',
    description: 'Xblock view action button for submission step to work on response',
    id: 'frontend-app-ora.XBlockView.Actions.submission',
  },
  [stepNames.studentTraining]: {
    defaultMessage: 'Go to practice grading',
    description: 'Xblock view action button for studentTraining step to practice grading',
    id: 'frontend-app-ora.XBlockView.Actions.studentTraining',
  },
  [stepNames.self]: {
    defaultMessage: 'Go to self grading',
    description: 'Xblock view action button for self step to self-grade',
    id: 'frontend-app-ora.XBlockView.Actions.self',
  },
  [stepNames.peer]: {
    defaultMessage: 'Go to peer grading',
    description: 'Xblock view action button for peer step to grade peers',
    id: 'frontend-app-ora.XBlockView.Actions.peer',
  },
  [stepNames.done]: {
    defaultMessage: 'View my grades',
    description: 'Xblock view action button for done step to view grades',
    id: 'frontend-app-ora.XBlockView.Actions.done',
  },
  optional: {
    id: 'ora-mfe.ModalActions.optionalPeerResponse',
    defaultMessage: ' (optional)',
    description: 'When peer response is optional',
  },
});

export default messages;
