import { assessmentSteps } from '../oraConfig';
/* eslint-disable camelcase */

// Progress
export const createProgressData = ({
  active_step_name = null,
  has_received_final_grade = false,
  step_info = {},
}) => ({
  active_step_name,
  has_received_final_grade,
  step_info,
});

export const closedStates = {
  open: { isClosed: false },
  notAvailable: { isClosed: true, closedReason: 'notAvailable' },
  closed: { isClosed: true, closedReason: 'pastDue' },
};

export const genPeerStepInfo = ({
  closedState,
  numCompleted = 0,
  isWaiting = false,
  numReceived = 0,
}) => ({
  ...closedState,
  number_of_assessments_completed: numCompleted,
  is_waiting_for_submissions: isWaiting,
  number_of_received_assessments: numReceived,
});

export const genTrainingStepInfo = ({ closedState, numCompleted }) => ({
  ...closedState,
  number_of_assessments_completed: numCompleted,
  expected_rubric_selections: [
    { name: 'Criterion 1 name', selection: 'Option 4 name' },
    { name: 'Criterion 2 name', selection: 'Option 3 name' },
    { name: 'Criterion 3 name', selection: 'Option 2 name' },
    { name: 'Criterion 4 name', selection: 'Option 1 name' },
  ],
});

const finishedTrainingStepInfo = genTrainingStepInfo({
  closedState: closedStates.open,
  numCompleted: assessmentSteps.settings.training.data.examples.length,
});

const finishedPeerStepInfo = genPeerStepInfo({
  closedState: closedStates.open,
  numCompleted: assessmentSteps.settings.peer.data.min_number_to_grade,
  isWaiting: false,
  numReceived: assessmentSteps.settings.peer.data.min_number_to_be_graded_by,
});

export default {
  submission: createProgressData({}),
  training: ({
    closedState = closedStates.open,
    numCompleted,
  }) => createProgressData({
    active_step_name: 'studentTraining',
    step_info: {
      studentTraining: genTrainingStepInfo({ closedState, numCompleted }),
      self: null,
      peer: null,
    },
  }),
  self: createProgressData({
    active_step_name: 'self',
    step_info: {
      studentTraining: finishedTrainingStepInfo,
      self: closedStates.open,
      peer: null,
    },
  }),
  peer: ({
    closedState = closedStates.open,
    numCompleted = 0,
    isWaiting = false,
    numReceived = 0,
  } = {}) => createProgressData({
    active_step_name: 'peer',
    step_info: {
      studentTraining: finishedTrainingStepInfo,
      self: closedStates.open,
      peer: genPeerStepInfo({
        closedState,
        numCompleted,
        isWaiting,
        numReceived,
      }),
    },
  }),
  staff: createProgressData({
    active_step_name: 'staff',
    step_info: {
      training: finishedTrainingStepInfo,
      self: closedStates.open,
      peer: finishedPeerStepInfo,
    },
  }),
  graded: createProgressData({
    active_step_name: null,
    has_received_final_grade: true,
    received_grades: {
      peer: { earned: 5, possible: 25 },
      staff: { earned: 8, possible: 10 },
    },
    step_info: {
      training: finishedTrainingStepInfo,
      self: closedStates.open,
      peer: finishedPeerStepInfo,
    },
  }),
};
