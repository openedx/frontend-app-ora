import { StrictDict } from '@edx/react-unit-test-utils';

import { stepNames } from 'data/services/lms/constants';
import { assessmentSteps } from '../oraConfig';
import { closedStates, progressKeys } from '../constants';
/* eslint-disable camelcase */

// Progress
export const createProgressData = ({
  active_step_name = null,
  has_received_final_grade = false,
  step_info = {},
} = {}) => ({
  active_step_name,
  has_received_final_grade,
  step_info,
});

export const genPeerStepInfo = ({
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

export const genTrainingStepInfo = ({
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

const finishedStates = StrictDict({
  [stepNames.studentTraining]: genTrainingStepInfo({
    closedState: closedStates.open,
    numCompleted: assessmentSteps.settings.training.data.examples.length,
  }),
  [stepNames.self]: closedStates.open,
  [stepNames.peer]: genPeerStepInfo({
    closedState: closedStates.open,
    numCompleted: assessmentSteps.settings.peer.data.min_number_to_grade,
    isWaiting: false,
    numReceived: assessmentSteps.settings.peer.data.min_number_to_be_graded_by,
  }),
});

export const getProgressState = ({ progressKey, stepConfig }) => {
  const genStepInfo = ({
    isGraded = false,
    step = null,
    studentTraining = null,
    self = null,
    peer = null,
  }) => {
    const stepIndex = isGraded ? stepConfig.length - 1 : stepConfig.indexOf(step);
    const out = {};
    for (let i = 0; i < stepIndex; i++) {
      const finishedStep = stepConfig[i];
      out[finishedStep] = finishedStates[finishedStep];
    }
    return {
      studentTraining,
      self,
      peer,
      ...out,
    };
  };

  const genSimpleState = (step) => createProgressData({
    active_step_name: step,
    step_info: genStepInfo({ step }),
  });

  const genFinishedState = (step) => {
    if (step === stepNames.submission) {
      return stepConfig[0];
    }
    const stepIndex = stepConfig.indexOf(step);
    const nextStep = stepConfig[stepIndex + 1];
    return {
      activeStepName: nextStep,
      step_info: genStepInfo({ step: nextStep }),
    };
  };

  const mapping = {
    [progressKeys.cancelledDuringSubmission]: genSimpleState(stepNames.submission),
    [progressKeys.cancelledDuringStudentTraining]: genSimpleState(stepNames.studentTraining),
    [progressKeys.cancelledDuringSelf]: genSimpleState(stepNames.self),
    [progressKeys.cancelledDuringPeer]: genSimpleState(stepNames.peer),
    [progressKeys.cancelledDuringStaff]: genSimpleState(stepNames.staff),
    [progressKeys.submissionEarly]: genSimpleState(stepNames.submission),
    [progressKeys.submissionClosed]: genSimpleState(stepNames.submission),
    [progressKeys.submissionTeamAlreadySubmitted]: genSimpleState(stepNames.submission),
    [progressKeys.submissionNeedTeam]: genSimpleState(stepNames.submission),
    [progressKeys.submissionUnsaved]: genSimpleState(stepNames.submission),
    [progressKeys.submissionSaved]: genSimpleState(stepNames.submission),

    [progressKeys.submissionFinished]: genFinishedState(stepNames.submission),

    [progressKeys.studentTraining]: createProgressData({
      active_step_name: stepNames.studentTraining,
      step_info: genStepInfo({ studentTraining: genTrainingStepInfo(), step: stepNames.studentTraining }),
    }),
    [progressKeys.studentTrainingValidation]: createProgressData({
      active_step_name: stepNames.studentTraining,
      step_info: genStepInfo({
        studentTraining: genTrainingStepInfo(),
        step: stepNames.studentTraining,
      }),
    }),
    [progressKeys.studentTrainingPartial]: createProgressData({
      active_step_name: stepNames.studentTraining,
      step_info: genStepInfo({
        studentTraining: genTrainingStepInfo({ numCompleted: 1 }),
        step: stepNames.studentTraining,
      }),
    }),
    [progressKeys.studentTrainingFinished]: genFinishedState(stepNames.studentTraining),

    [progressKeys.selfAssessment]: createProgressData({
      active_step_name: stepNames.self,
      step_info: genStepInfo({
        self: closedStates.open,
        step: stepNames.self,
      }),
    }),
    [progressKeys.selfAssessmentLate]: createProgressData({
      active_step_name: stepNames.self,
      step_info: genStepInfo({
        self: closedStates.closed,
        step: stepNames.self,
      }),
    }),
    [progressKeys.selfAssessmentFinished]: genFinishedState(stepNames.self),

    [progressKeys.peerAssessment]: createProgressData({
      active_step_name: stepNames.peer,
      step_info: genStepInfo({
        peer: genPeerStepInfo(),
        step: stepNames.peer,
      }),
    }),
    [progressKeys.peerAssessmentEarly]: createProgressData({
      active_step_name: stepNames.peer,
      step_info: genStepInfo({
        peer: genPeerStepInfo({ closedState: closedStates.notAvailable }),
        step: stepNames.peer,
      }),
    }),
    [progressKeys.peerAssessmentWaiting]: createProgressData({
      active_step_name: stepNames.peer,
      step_info: genStepInfo({
        peer: genPeerStepInfo({ isWaiting: true }),
        step: stepNames.peer,
      }),
    }),
    [progressKeys.peerAssessmentLate]: createProgressData({
      active_step_name: stepNames.peer,
      step_info: genStepInfo({
        peer: genPeerStepInfo({ closedState: closedStates.closed }),
        step: stepNames.peer,
      }),
    }),
    [progressKeys.peerAssessmentFinished]: genFinishedState(stepNames.peer),

    [progressKeys.staffAfterSubmission]: createProgressData({
      active_step_name: stepNames.staff,
      step_info: genStepInfo({ step: stepNames.staff }),
    }),
    [progressKeys.staffAfterSelf]: createProgressData({
      active_step_name: stepNames.staff,
      step_info: genStepInfo({
        self: closedStates.open,
        step: stepNames.staff,
      }),
    }),
    [progressKeys.staffAfterPeer]: createProgressData({
      active_step_name: stepNames.staff,
      step_info: genStepInfo({
        peer: finishedStates[stepNames.peer],
        step: stepNames.staff,
      }),
    }),

    [progressKeys.graded]: createProgressData({
      active_step_name: stepConfig[stepConfig.length - 1],
      step_info: genStepInfo({ isGradsed: true }),
      has_received_final_grade: true,
    }),
    [progressKeys.gradedSubmittedOnPreviousTeam]: createProgressData({
      active_step_name: stepConfig[stepConfig.length - 1],
      has_received_final_grade: true,
      step_info: genStepInfo({ isGradsed: true }),
    }),
  };
  return mapping[progressKey];
};

export default {
  getProgressState,
};
