import { StrictDict } from '@edx/react-unit-test-utils';
import oraConfig from './oraConfig';
import pageData from './pageData';

export const viewKeys = StrictDict({
  xblock: 'xblock',
  submission: 'submission',
  training: 'student_training',
  self: 'self_assessment',
  peer: 'peer_assessment',
  myGrades: 'my_grades',
});

export const progressKeys = StrictDict({
  unsaved: 'unsaved',
  saved: 'saved',
  training: 'training',
  self: 'self',
  peer: 'peer',
  peerWaiting: 'peerWaiting',
  staff: 'staff',
  graded: 'graded',
});

export const progressStates = {
  unsaved: pageData.progressStates.submission,
  saved: pageData.progressStates.submission,
  training: pageData.progressStates.training(0),
  self: pageData.progressStates.self,
  peer: pageData.progressStates.peer(),
  peerWaiting: pageData.progressStates.peer({ numCompleted: 1, isWaiting: true }),
  staff: pageData.progressStates.staff,
  graded: pageData.progressStates.graded,
};

export const submissionStatesByView = {
  [viewKeys.xblock]: null,
  [viewKeys.submission]: pageData.submissionStates.individualSubmission,
  [viewKeys.self]: pageData.submissionStates.individualSubmission,
  [viewKeys.training]: pageData.submissionStates.individualSubmission,
  [viewKeys.peer]: pageData.submissionStates.individualSubmission,
  [viewKeys.myGrades]: pageData.submissionStates.individualSubmission,
};

export const assessmentStatesByView = {
  [viewKeys.xblock]: null,
  [viewKeys.submission]: null,
  [viewKeys.self]: null,
  [viewKeys.training]: null,
  [viewKeys.peer]: null,
  [viewKeys.myGrades]: {
    effectiveAssessmentType: 'staff',
    ...pageData.assessmentStates.graded,
  },
};

export const loadState = ({ view, progressKey }) => {
  const state = {
    progress: progressStates[progressKey],
    submission: submissionStatesByView[view],
    assessment: assessmentStatesByView[view],
  };
  if (view === viewKeys.submission && progressKey === progressKeys.unsaved) {
    state.submission = pageData.submissionStates.emptySubmission;
  }
  return state;
};
