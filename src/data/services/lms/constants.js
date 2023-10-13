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
  completed: 'completed',
  cancelled: 'cancelled',
  closed: 'closed',
  notAvailable: 'notAvailable',
  teamAlreadySubmitted: 'teamAlreadySubmitted',
});

export const closedReasons = StrictDict({
  pastDue: 'pastDue',
  notAvailable: 'notAvailable', // (yet)
});

export const stepNames = StrictDict({
  submission: 'submission',
  peer: 'peer',
  self: 'self',
  studentTraining: 'studentTraining',
  staff: 'staff',
  myGrades: 'myGrades',
});

export const routeSteps = StrictDict({
  submission: stepNames.submission,
  peer_assessment: stepNames.peer,
  self_assessment: stepNames.self,
  student_training: stepNames.studentTraining,
  my_grades: stepNames.myGrades,
});

export const stepRoutes = StrictDict(Object.keys(routeSteps).reduce(
  (curr, route) => ({ ...curr, [routeSteps[route]]: route }),
  {},
));

export default { feedbackRequirement, queryKeys, MutationStatus };
