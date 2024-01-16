import { defineMessages } from '@edx/frontend-platform/i18n';
import { stepNames } from 'constants/index';

const messages = defineMessages({
  deleteFile: {
    id: 'frontend-app-ora.Actions.simpleAction.deleteFile',
    defaultMessage: 'Delete file',
    description: 'Delete file button text',
  },
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
    description: 'Action button to load grades step',
  },
  exit: {
    id: 'frontend-app-ora.Actions.exit',
    defaultMessage: 'Exit',
    description: 'Action button to exit grades step',
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
    defaultMessage: 'peer',
    description: 'Peer type of response for "Load(ing/ed) next <type>" action',
  },
  practiceResponse: {
    id: 'frontend-app-ora.Actions.practiceResponse',
    defaultMessage: 'practice response',
    description: 'Student training type of response for "Load(ing/ed) next <type>" action',
  },
  gradeSubmitted: {
    id: 'frontend-app-ora.Actions.gradeSubmitted',
    defaultMessage: 'Grade submitted',
    description: 'Submit grade button text after successful submission',
  },
  submitGrade: {
    id: 'frontend-app-ora.Actions.submitGrade',
    defaultMessage: 'Submit {viewStep}grade',
    description: 'Submit grade button text',
  },
  submittingGrade: {
    id: 'frontend-app-ora.Actions.submittingGrade',
    defaultMessage: 'Submitting grade',
    description: 'Submit grade button text while submitting',
  },
});

export const confirmTitles = defineMessages({
  exit: {
    id: 'frontend-app-ora.Actions.confirmTitle.exit',
    defaultMessage: 'Are you sure you want to exit?',
    description: 'Exit confirmation dialog title',
  },
  [stepNames.submission]: {
    id: 'frontend-app-ora.Actions.confirmTitle.submission',
    defaultMessage: 'Are you sure you want to submit this response?',
    description: 'Response submission confirmation dialog title',
  },
  [stepNames.self]: {
    id: 'frontend-app-ora.Actions.confirmTitle.self',
    defaultMessage: 'Ready to submit your self grade?',
    description: 'Self submission confirmation dialog title',
  },
  [stepNames.peer]: {
    id: 'frontend-app-ora.Actions.confirmTitle.peer',
    defaultMessage: 'Ready to submit this peer grade?',
    description: 'Peer submission confirmation dialog title',
  },
  deleteFile: {
    id: 'frontend-app-ora.Actions.confirmTitle.deleteFile',
    defaultMessage: 'Are you sure you want to delete the file?',
    description: 'File deletion confirm dialog title',
  },
});
export const confirmDescriptions = defineMessages({
  exit: {
    id: 'frontend-app-ora.Actions.confirmDescription.exit',
    defaultMessage: 'Your work will not be saved',
    description: 'Exit confirmation dialog description',
  },
  [stepNames.submission]: {
    id: 'frontend-app-ora.Actions.confirmDescription.submission',
    defaultMessage: 'The response cannot be edited or deleted once it has been submitted',
    description: 'Response submission confirmation dialog description',
  },
  assessment: {
    id: 'frontend-app-ora.Actions.confirmDescription.assessment',
    defaultMessage: 'Once your grade is submitted, it cannot be changed.',
    description: 'Assessment submission confirmation dialog description',
  },
  deleteFile: {
    id: 'frontend-app-ora.Actions.confirmDescription.deleteFile',
    defaultMessage: 'This cannot be undone',
    description: 'File deletion confirm dialog title',
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
