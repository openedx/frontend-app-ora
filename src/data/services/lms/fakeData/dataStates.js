import { StrictDict } from '@edx/react-unit-test-utils';
import { routeSteps } from 'data/services/lms/constants';
import pageData from './pageData';

export const viewKeys = StrictDict({
  xblock: 'xblock',
  submission: 'submission',
  studentTraining: 'student_training',
  self: 'self_assessment',
  peer: 'peer_assessment',
  myGrades: 'my_grades',
});

export const progressKeys = StrictDict({
  unsaved: 'unsaved',
  saved: 'saved',
  studentTraining: 'studentTraining',
  self: 'self',
  peer: 'peer',
  peerWaiting: 'peerWaiting',
  staff: 'staff',
  graded: 'graded',
});

export const progressStates = {
  unsaved: pageData.progressStates.submission,
  saved: pageData.progressStates.submission,
  studentTraining: pageData.progressStates.training({ numCompleted: 0 }),
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
  [viewKeys.studentTraining]: pageData.submissionStates.individualSubmission,
  [viewKeys.peer]: pageData.submissionStates.individualSubmission,
  [viewKeys.myGrades]: pageData.submissionStates.individualSubmission,
};

export const assessmentStatesByView = {
  [viewKeys.xblock]: null,
  [viewKeys.submission]: null,
  [viewKeys.self]: null,
  [viewKeys.studentTraining]: null,
  [viewKeys.peer]: null,
  [viewKeys.myGrades]: {
    effectiveAssessmentType: 'staff',
    ...pageData.assessmentStates.graded,
  },
};

export const loadState = (opts) => {
  const { view } = opts;
  let progressKey = opts.progressKey || routeSteps[view];
  if (progressKey === routeSteps.submission) {
    progressKey = progressKeys.unsaved;
  }

  const state = {
    progress: progressStates[progressKey],
    submission: submissionStatesByView[view],
    assessment: assessmentStatesByView[view],
  };
  if (view === viewKeys.submission && progressKey === progressKeys.unsaved) {
    state.submission = pageData.submissionStates.emptySubmission;
  }
  console.log({
    progressKey,
    view,
    state,
  });
  return state;
};
