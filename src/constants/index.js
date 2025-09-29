export const feedbackRequirement = Object.freeze({
  disabled: 'disabled',
  required: 'required',
  optional: 'optional',
});

export const queryKeys = Object.freeze({
  oraConfig: 'oraConfig',
  pageData: 'pageData',
});

export const MutationStatus = Object.freeze({
  idle: 'idle',
  loading: 'loading',
  error: 'error',
  success: 'success',
});

export const stepStates = Object.freeze({
  inProgress: 'inProgress',
  done: 'done',
  cancelled: 'cancelled',
  closed: 'closed',
  notAvailable: 'notAvailable',
  teamAlreadySubmitted: 'teamAlreadySubmitted',
  needTeam: 'needTeam',
  waiting: 'waiting',
  waitingForPeerGrades: 'waitingForPeerGrades',
  submitted: 'submitted', // ui-only
  trainingValidation: 'trainingValidation', // ui-only
});

export const closedReasons = Object.freeze({
  pastDue: 'pastDue',
  notAvailable: 'notAvailable', // (yet)
});

export const stepNames = Object.freeze({
  xblock: 'xblock',
  xblockStudio: 'xblockStudio',
  xblockPreview: 'xblockPreview',
  submission: 'submission',
  peer: 'peer',
  self: 'self',
  studentTraining: 'studentTraining',
  staff: 'staff',
  done: 'done',
});

export const assessmentSteps = [
  stepNames.studentTraining,
  stepNames.self,
  stepNames.peer,
];

export const routeSteps = Object.freeze({
  xblock: stepNames.xblock,
  xblock_studio: stepNames.xblockStudio,
  xblock_preview: stepNames.xblockPreview,
  submission: stepNames.submission,
  peer_assessment: stepNames.peer,
  self_assessment: stepNames.self,
  student_training: stepNames.studentTraining,
  graded: stepNames.done,
});

export const stepRoutes = Object.freeze(Object.keys(routeSteps).reduce(
  (curr, route) => ({ ...curr, [routeSteps[route]]: route }),
  {},
));

export default { feedbackRequirement, queryKeys, MutationStatus };
