import { StrictDict } from '@edx/react-unit-test-utils';
import { stepNames } from 'data/services/lms/constants';

export const viewKeys = StrictDict({
  xblock: 'xblock',
  submission: 'submission',
  studentTraining: 'student_training',
  self: 'self_assessment',
  peer: 'peer_assessment',
  done: 'graded',
});

export const progressKeys = StrictDict({
  cancelledDuringSubmission: 'cancelled_during_submission',
  cancelledDuringStudentTraining: 'cancelled_during_student_training',
  cancelledDuringSelf: 'cancelled_during_self',
  cancelledDuringPeer: 'cancelled_during_peer',
  cancelledDuringStaff: 'cancelled_during_staff',
  submissionEarly: 'submission_early',
  submissionClosed: 'submission_closed',
  submissionTeamAlreadySubmitted: 'submission_team_already_submitted',
  submissionNeedTeam: 'submission_need_team',
  submissionUnsaved: 'submission_unsaved',
  submissionSaved: 'submission_saved',
  submissionFinished: 'submission_finished',
  studentTraining: 'student_training',
  studentTrainingValidation: 'student_training_validation',
  studentTrainingPartial: 'student_training_partial',
  studentTrainingFinished: 'student_training_finished',
  selfAssessment: 'self_assessment',
  selfAssessmentLate: 'self_assessment_late',
  selfAssessmentFinished: 'self_assessment_finished',
  peerAssessment: 'peer_assessment',
  peerAssessmentEarly: 'peer_assessment_early',
  peerAssessmentLate: 'peer_assessment_late',
  peerAssessmentWaiting: 'peer_assessment_waiting',
  peerAssessmentFinished: 'peer_assessment_finished',
  staffAfterSubmission: 'staff_after_submission',
  staffAfterSelf: 'staff_after_self',
  staffAfterPeer: 'staff_after_peer',
  graded: 'graded',
  gradedSubmittedOnPreviousTeam: 'graded_submitted_on_previous_team',
});

export const teamStates = [
  progressKeys.gradedSubmittedOnPreviousTeam,
  progressKeys.submissionTeamAlreadySubmitted,
  progressKeys.submissionNeedTeam,
];

export const closedStates = {
  open: { isClosed: false },
  notAvailable: { isClosed: true, closedReason: 'notAvailable' },
  closed: { isClosed: true, closedReason: 'pastDue' },
};

export const stepConfigs = StrictDict({
  all: [stepNames.studentTraining, stepNames.self, stepNames.peer, stepNames.staff],
  self: [stepNames.self],
  peer: [stepNames.peer],
  staff: [stepNames.staff],
  trainingAndSelf: [stepNames.studentTraining, stepNames.self],
  trainingAndPeer: [stepNames.studentTraining, stepNames.peer],
  selfAndStaff: [stepNames.self, stepNames.staff],
});

export const stateStepConfigs = {
  [progressKeys.staffAfterSubmission]: stepConfigs.staff,
  [progressKeys.staffAfterSelf]: stepConfigs.selfAndStaff,
};
