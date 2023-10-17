import { StrictDict } from '@edx/react-unit-test-utils';

import { stepNames } from 'data/services/lms/constants';
import { assessmentSteps } from '../oraConfig';
import { closedStates, progressKeys } from '../constants';
/* eslint-disable camelcase */

export const createTeamInfo = ({
  team_name = 'Team name',
  team_usernames = ['user1', 'user2'],
  previous_team_name = null,
  has_submitted = false,
} = {}) => ({
  team_name,
  team_usernames,
  previous_team_name,
  has_submitted,
});

export const createSubmissionStatus = ({
  has_submitted = false,
  has_cancelled = false,
  closedState = closedStates.open,
  team_info = null,
} = {}) => ({
  ...closedState,
  has_submitted,
  has_cancelled,
  team_info,
  cancelled_by: has_cancelled ? 'Cancelling-User' : null,
  cancelled_at: has_cancelled ? '2023-04-14T20:00:00Z' : null,
});

const subStatuses = {
  cancelled: createSubmissionStatus({ has_cancelled: true }),
  cancelledAfterSubmission: createSubmissionStatus({ has_submitted: true, has_cancelled: true }),
  closed: createSubmissionStatus({ closedState: closedStates.closed }),
  notAvailable: createSubmissionStatus({ closedState: closedStates.notAvailable }),
  unsubmitted: createSubmissionStatus(),
  submitted: createSubmissionStatus({ has_submitted: true }),
};

const teamStatuses = {
  unsubmitted: createTeamInfo(),
  submitted: createTeamInfo({ has_submitted: true }),
  previousTeam: createTeamInfo({ previous_team_name: 'Previous Team Name' }),
  needTeam: createTeamInfo({ team_name: null, team_usernames: null }),
};
const teamSubStatuses = {
  cancelled: { ...subStatuses.cancelled, team_info: teamStatuses.unsubmitted },
  cancelledAfterSubmission: {
    ...subStatuses.cancelledAfterSubmission,
    team_info: teamStatuses.unsubmitted,
  },
  closed: { ...subStatuses.closed, team_info: teamStatuses.unsubmitted },
  notAvailable: { ...subStatuses.notAvailable, team_info: teamStatuses.unsubmitted },
  unsubmitted: { ...subStatuses.unsubmitted, team_info: teamStatuses.unsubmitted },
  submitted: { ...subStatuses.submitted, team_info: teamStatuses.submitted },
  teamAlreadySubmitted: { ...subStatuses.unsubmitted, team_info: teamStatuses.submitted },
  submittedOnPreviousTeam: { ...subStatuses.submitted, team_info: teamStatuses.previousTeam },
};

export const createPeerStepInfo = ({
  closedState = closedStates.open,
  numCompleted = 0,
  isWaiting = false,
  numReceived = 0,
} = {}) => ({
  ...closedState,
  number_of_assessments_completed: numCompleted,
  is_waiting_for_submissions: isWaiting,
  number_of_received_assessments: numReceived,
});

const peerStatuses = {
  unsubmitted: createPeerStepInfo(),
  closed: createPeerStepInfo({ closedState: closedStates.closed }),
  notAvilable: createPeerStepInfo({ closedState: closedStates.notAvailable }),
  waiting: createPeerStepInfo({ is_waiting_for_submission: true }),
  partial: createPeerStepInfo({ number_of_assessments_completed: 1 }),
  finished: createPeerStepInfo({
    closedState: closedStates.open,
    numCompleted: assessmentSteps.settings.peer.data.min_number_to_grade,
    isWaiting: false,
    numReceived: assessmentSteps.settings.peer.data.min_number_to_be_graded_by,
  }),
};

export const createTrainingStepInfo = ({
  closedState = closedStates.open,
  numCompleted = 0,
} = {}) => ({
  ...closedState,
  number_of_assessments_completed: numCompleted,
  expected_rubric_selections: [
    { name: 'Criterion 1 name', selection: 'Option 4 name' },
    { name: 'Criterion 2 name', selection: 'Option 3 name' },
    { name: 'Criterion 3 name', selection: 'Option 2 name' },
    { name: 'Criterion 4 name', selection: 'Option 1 name' },
  ],
});

const trainingStatuses = {
  unsubmitted: createTrainingStepInfo(),
  partial: createTrainingStepInfo({ numCompleted: 1}),
  finished: createTrainingStepInfo({
    closedState: closedStates.open,
    numCompleted: assessmentSteps.settings.training.data.examples.length,
  }),
};

const finishedStates = StrictDict({
  [stepNames.submission]: subStatuses.finished,
  [stepNames.studentTraining]: trainingStatuses.finished,
  [stepNames.self]: closedStates.open,
  [stepNames.peer]: peerStatuses.finished,
});

const staffStates = {
  afterSubmission: { step: stepNames.staff },
  afterSelf: { step: stepNames.staff, self: closedStates.open },
  afterPeer: { step: stepNames.staff },
};

const nullStepInfo = { studentTraining: null, self: null, peer: null };

export const getProgressState = ({ viewStep, progressKey, stepConfig }) => {
  const createStepInfo = ({
    isGraded = false,
    step = null,
    submission = createSubmissionStatus(),
    studentTraining = null,
    self = null,
    peer = null,
  }) => {
    if (step === stepNames.submission) {
      return { submission, ...nullStepInfo };
    }

    // by default, pass null for all steps after submission
    const stepIndex = (isGraded || viewStep === stepNames.xblock)
      ? stepConfig.length - 1 : stepConfig.indexOf(step);
    const out = {};
    for (let i = 0; i < stepIndex; i++) {
      out[stepConfig[i]] = finishedStates[stepConfig[i]];
    }

    return {
      submission,
      studentTraining,
      self,
      peer,
      ...out,
    };
  };

  const createProgressData = (activeStepName, stepInfoData) => ({
    active_step_name: activeStepName,
    step_info: createStepInfo({ step: activeStepName, ...stepInfoData }),
  });

  const createFinishedState = (step) => {
    if (step === stepNames.submission) {
      return stepConfig[0];
    }
    const stepIndex = stepConfig.indexOf(step);
    const nextStep = stepConfig[stepIndex + 1];
    return createProgressData(nextStep, { step: nextStep });
  };

  const submissionState = (stepInfoData) => (
    createProgressData(stepNames.submission, { submission: stepInfoData })
  );
  const createCancelledState = (step) => (
    createProgressData(step, { submission: subStatuses.cancelled })
  );

  const trainingState = (stepInfoData) => createProgressData(
    stepNames.studentTraining,
    { studentTraining: stepInfoData, step: stepNames.studentTraining },
  );

  const selfState = (closedState) => createProgressData(
    stepNames.self,
    { self: closedState, step: stepNames.self },
  );

  const peerState = (stepInfoData) => createProgressData(
    stepNames.peer,
    { peer: stepInfoData, step: stepNames.peer },
  );

  const staffState = (stepInfoData = {}) => (
    createProgressData(stepNames.staff, { step: stepNames.staff, ...stepInfoData })
  );

  const mapping = StrictDict({
    [progressKeys.cancelledDuringSubmission]: createCancelledState(stepNames.submission),
    [progressKeys.cancelledDuringStudentTraining]: createCancelledState(stepNames.studentTraining),
    [progressKeys.cancelledDuringSelf]: createCancelledState(stepNames.self),
    [progressKeys.cancelledDuringPeer]: createCancelledState(stepNames.peer),
    [progressKeys.cancelledDuringStaff]: createCancelledState(stepNames.staff),

    [progressKeys.submissionEarly]: submissionState(subStatuses.notAvailable),
    [progressKeys.submissionClosed]: submissionState(subStatuses.closed),
    [progressKeys.submissionTeamAlreadySubmitted]:
      submissionState(teamSubStatuses.teamAlreadySubmitted),
    [progressKeys.submissionNeedTeam]: submissionState(teamSubStatuses.needTeam),
    [progressKeys.submissionUnsaved]: submissionState(subStatuses.unsubmitted),
    [progressKeys.submissionSaved]: submissionState(subStatuses.unsubmitted),

    [progressKeys.submissionFinished]: createFinishedState(stepNames.submission),

    [progressKeys.studentTraining]: trainingState(trainingStatuses.unsubmitted),
    [progressKeys.studentTrainingValidation]: trainingState(trainingStatuses.unsubmitted),
    [progressKeys.studentTrainingPartial]: trainingState(trainingStatuses.partial),
    [progressKeys.studentTrainingFinished]: createFinishedState(stepNames.studentTraining),

    [progressKeys.selfAssessment]: selfState(closedStates.open),
    [progressKeys.selfAssessmentLate]: selfState(closedStates.closed),
    [progressKeys.selfAssessmentFinished]: createFinishedState(stepNames.self),

    [progressKeys.peerAssessment]: peerState(peerStatuses.unsubmitted),
    [progressKeys.peerAssessmentEarly]: peerState(peerStatuses.notAvailable),
    [progressKeys.peerAssessmentWaiting]: peerState(peerStatuses.waiting),
    [progressKeys.peerAssessmentLate]: peerState(peerStatuses.closed),
    [progressKeys.peerAssessmentFinished]: createFinishedState(stepNames.peer),

    [progressKeys.staffAfterSubmission]: staffState(),
    [progressKeys.staffAfterSelf]: staffState(),
    [progressKeys.staffAfterPeer]: staffState({ peer: finishedStates.peer }),
    [progressKeys.graded]:
      createProgressData(stepConfig[stepConfig.length - 1], { isGraded: true }),
    [progressKeys.gradedSubmittedOnPreviousTeam]:
      createProgressData(stepConfig[stepConfig.length - 1], { isGrdaed: true }),
  });
  return mapping[progressKey];
};

export default {
  getProgressState,
};
