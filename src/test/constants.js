import { stepNames } from 'constants/index';
import { progressKeys } from 'constants/mockData';

const lmsBaseUrl = 'test-base-url';
export const courseId = 'test-course-id';
export const xblockId = 'test-xblock-id';
export const baseUrl = `${lmsBaseUrl}/courses/${courseId}/xblock/${xblockId}/handler`;
export const config = {
  LMS_BASE_URL: lmsBaseUrl,
};

const stepProgressKeys = {
  [stepNames.submission]: [
    progressKeys.submissionUnsaved,
    progressKeys.submissionSaved,
  ],
  [stepNames.studentTraining]: [
    progressKeys.studentTraining,
    progressKeys.studentTrainingPartial,
  ],
  [stepNames.self]: [progressKeys.selfAssessment],
  [stepNames.peer]: [
    progressKeys.peerAssessment,
    progressKeys.peerAssessmentPartial,
    progressKeys.peerAssessmentWaiting,
    progressKeys.peerAssessmentWaitingForGrades,
  ],
  [stepNames.done]: [progressKeys.graded],
};
const viewProgressKeys = {
  [stepNames.xblock]: Object.values(progressKeys),
  [stepNames.submission]: [
    ...stepProgressKeys.submission,
    ...stepProgressKeys.studentTraining,
    ...stepProgressKeys.self,
    ...stepProgressKeys.peer,
    ...stepProgressKeys.done,
  ],
  [stepNames.studentTraining]: stepProgressKeys.studentTraining,
  [stepNames.self]: stepProgressKeys.self,
  [stepNames.peer]: stepProgressKeys.peer,
  [stepNames.done]: stepProgressKeys.done,
};

export const stepOrders = {
  self: [stepNames.self],
  peer: [stepNames.studentTraining, stepNames.peer],
  staff: [stepNames.staff],
  selfToPeer: [stepNames.studentTraining, stepNames.self, stepNames.peer],
  selfToStaff: [stepNames.self, stepNames.staff],
  peerToSelf: [stepNames.peer, stepNames.self],
  peerToSelfWithTraining: [stepNames.studentTraining, stepNames.peer, stepNames.self],
  peerToStaff: [stepNames.peer, stepNames.self, stepNames.staff],
  peerToStaffWithTraining: [stepNames.studentTraining, stepNames.peer, stepNames.self, stepNames.staff],
};

const allSteps = (stepOrder) => [stepNames.submission, ...stepOrders[stepOrder]];
const loadKeys = (step) => stepProgressKeys[step];
const checkForProgressKeys = (steps) => (key) => steps.map(loadKeys).flat().includes(key);

export const getProgressKeys = (stepOrder, stepName) => viewProgressKeys[stepName]
  .filter(checkForProgressKeys(
    stepName === stepNames.xblock ? allSteps(stepOrder) : stepOrders[stepOrder],
  ));
