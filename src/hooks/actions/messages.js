import { defineMessages } from '@edx/frontend-platform/i18n';
import { stepNames } from 'constants';

const messages = defineMessages({
  finishLater: {
    id: 'ora-mfe.ModalActions.simpleAction.finishLater',
    defaultMessage: 'Finish later',
    description: 'Finish later (close) button text',
  },
  startTraining: {
    id: 'ora-mfe.ModalActions.startTraining',
    defaultMessage: 'Begin practice grading',
    description: 'Action button to begin studentTraining step',
  },
  startSelf: {
    id: 'ora-mfe.ModalActions.startSelf',
    defaultMessage: 'Begin self grading',
    description: 'Action button to begin self assessment step',
  },
  startPeer: {
    id: 'ora-mfe.ModalActions.startPeer',
    defaultMessage: 'Begin peer grading',
    description: 'Action button to begin peer assessment step',
  },
  viewGrades: {
    id: 'ora-mfe.ModalActions.viewGrades',
    defaultMessage: 'View your grades',
    description: 'Action button to load Grades step',
  },
  exit: {
    id: 'ora-mfe.ModalActions.exit',
    defaultMessage: 'Exit',
    description: 'Action button to exit Grades step',
  },
  loadNext: {
    id: 'ora-mfe.ModalActions.loadNext',
    defaultMessage: 'Grade next',
    description: 'Action button to load next peer response',
  },
  loadingNext: {
    id: 'ora-mfe.ModalActions.loadingNext',
    defaultMessage: 'Loading next',
    description: 'Action button text while loading next peer assessment',
  },
  peerResponse: {
    id: 'ora-mfe.ModalActions.peerResponse',
    defaultMessage: 'peer response',
    description: 'Peer type of response for "Load(ing/ed) next <type>" action',
  },
  practiceResponse: {
    id: 'ora-mfe.ModalActions.practiceResponse',
    defaultMessage: 'practice response',
    description: 'Student Training type of response for "Load(ing/ed) next <type>" action',
  },
});

export const loadNextSteps = {
  [stepNames.peer]: messages.peerResponse,
  [stepNames.studentTraining]: messages.practiceResponse,
};

export default messages;
