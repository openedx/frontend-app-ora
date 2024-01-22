import { StrictDict } from '@edx/react-unit-test-utils';

export const feedbackRequirement = StrictDict({
  disabled: 'disabled',
  required: 'required',
  optional: 'optional',
});

export const queryKeys = StrictDict({
  oraConfig: 'oraConfig',
  pageData: 'pageData',
});

export const MutationStatus = StrictDict({
  idle: 'idle',
  loading: 'loading',
  error: 'error',
  success: 'success',
});

export const stepStates = StrictDict({
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

export const closedReasons = StrictDict({
  pastDue: 'pastDue',
  notAvailable: 'notAvailable', // (yet)
});

export const stepNames = StrictDict({
  xblock: 'xblock',
  xblockStudio: 'xblockStudio',
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

export const routeSteps = StrictDict({
  xblock: stepNames.xblock,
  xblock_studio: stepNames.xblockStudio,
  submission: stepNames.submission,
  peer_assessment: stepNames.peer,
  self_assessment: stepNames.self,
  student_training: stepNames.studentTraining,
  graded: stepNames.done,
});

export const stepRoutes = StrictDict(Object.keys(routeSteps).reduce(
  (curr, route) => ({ ...curr, [routeSteps[route]]: route }),
  {},
));

export default { feedbackRequirement, queryKeys, MutationStatus };
