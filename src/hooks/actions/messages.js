import { defineMessages } from '@edx/frontend-platform/i18n';
import { stepNames } from 'constants';

const messages = defineMessages({
  finishLater: {
    id: 'frontend-app-ora.Actions.simpleAction.finishLater',
    defaultMessage: 'Finish the rest later',
    description: 'Finish later (close) button text',
  },
  exitWithoutSaving: {
    id: 'frontend-app-ora.Actions.simpleAction.exitWithoutSaving',
    defaultMessage: 'Exit without saving',
    description: 'Exit without saving (close) button text',
  },
  savingResponse: {
    id: 'frontend-app-ora.Actions.savingResponse',
    defaultMessage: 'Saving response',
    description: 'Save for later button text while saving',
  },
  startTraining: {
    id: 'frontend-app-ora.Actions.startTraining',
    defaultMessage: 'Go to practice grading',
    description: 'Action button to begin studentTraining step',
  },
  submitResponse: {
    id: 'frontend-app-ora.Actions.submitResponse',
    defaultMessage: 'Submit response',
    description: 'Submit button text',
  },
  submittingResponse: {
    id: 'frontend-app-ora.Actions.submittingResponse',
    defaultMessage: 'Submitting response',
    description: 'Submit button text while submitting',
  },
  responseSubmitted: {
    id: 'frontend-app-ora.Actions.responseSubmitted',
    defaultMessage: 'Response submitted',
    description: 'Submit button text after successful submission',
  },
  startSelf: {
    id: 'frontend-app-ora.Actions.startSelf',
    defaultMessage: 'Go to self grading',
    description: 'Action button to begin self assessment step',
  },
  startPeer: {
    id: 'frontend-app-ora.Actions.startPeer',
    defaultMessage: 'Begin peer grading',
    description: 'Action button to begin peer assessment step',
  },
  viewGrades: {
    id: 'frontend-app-ora.Actions.viewGrades',
    defaultMessage: 'View your grades',
    description: 'Action button to load Grades step',
  },
  exit: {
    id: 'frontend-app-ora.Actions.exit',
    defaultMessage: 'Exit',
    description: 'Action button to exit Grades step',
  },
  loadNext: {
    id: 'frontend-app-ora.Actions.loadNext',
    defaultMessage: 'Grade next',
    description: 'Action button to load next peer response',
  },
  loadingNext: {
    id: 'frontend-app-ora.Actions.loadingNext',
    defaultMessage: 'Loading next',
    description: 'Action button text while loading next peer assessment',
  },
  peerResponse: {
    id: 'frontend-app-ora.Actions.peerResponse',
    defaultMessage: 'peer response',
    description: 'Peer type of response for "Load(ing/ed) next <type>" action',
  },
  practiceResponse: {
    id: 'frontend-app-ora.Actions.practiceResponse',
    defaultMessage: 'practice response',
    description: 'Student Training type of response for "Load(ing/ed) next <type>" action',
  },
  gradeSubmitted: {
    id: 'frontend-app-ora.Actions.gradeSubmitted',
    defaultMessage: 'Grade Submitted',
    description: 'Submit Grade button text after successful submission',
  },
  submitGrade: {
    id: 'frontend-app-ora.Actions.submitGrade',
    defaultMessage: 'Submit {viewStep}grade',
    description: 'Submit Grade button text',
  },
  submittingGrade: {
    id: 'frontend-app-ora.Actions.submittingGrade',
    defaultMessage: 'Submitting grade',
    description: 'Submit Grade button text while submitting',
  },
});

export const confirmDescriptions = defineMessages({
  exit: {
    id: 'frontend-app-ora.Actions.confirmDescription.exit',
    defaultMessage: 'Your work will not be saved',
    description: 'Exit confirmation dialog description',
  },
});
export const confirmTitles = defineMessages({
  exit: {
    id: 'frontend-app-ora.Actions.confirmTitle.exit',
    defaultMessage: 'Are you sure you want to exit?',
    description: 'Exit confirmation dialog title',
  },
});

export const loadNextSteps = {
  [stepNames.peer]: messages.peerResponse,
  [stepNames.studentTraining]: messages.practiceResponse,
};

export const viewStepMessages = defineMessages({
  [stepNames.self]: {
    id: 'frontend-app-ora.Actions.viewStep.self',
    defaultMessage: 'self',
    description: 'View step label for self assessment',
  },
  [stepNames.peer]: {
    id: 'frontend-app-ora.Actions.viewStep.peer',
    defaultMessage: 'peer',
    description: 'View step label for peer assessment',
  },
  [stepNames.studentTraining]: {
    id: 'frontend-app-ora.Actions.viewStep.studentTraining',
    defaultMessage: 'practice',
    description: 'View step label for student training',
  },
});


export default messages;
