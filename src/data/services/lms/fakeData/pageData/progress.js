/* eslint-disable camelcase */

// Progress
export const createProgressData = ({
  active_step_name = null,
  has_received_final_grade = false,
  active_step_info = {},
}) => ({
  active_step_name,
  has_received_final_grade,
  active_step_info,
});

export default {
  submission: createProgressData({}),
  training: (numCompleted) => createProgressData({
    active_step_name: 'training',
    active_step_info: {
      number_of_assessments_completed: numCompleted,
      expected_rubric_selections: [
        { name: 'Criterion 1 name', selection: 'Option 4 name' },
        { name: 'Criterion 2 name', selection: 'Option 3 name' },
        { name: 'Criterion 3 name', selection: 'Option 2 name' },
        { name: 'Criterion 4 name', selection: 'Option 1 name' },
      ],
    },
  }),
  peer: ({
    numCompleted = 0,
    isWaiting = false,
    numReceived = 0,
  } = {}) => createProgressData({
    active_step_name: 'peer',
    active_step_info: {
      number_of_assessments_completed: numCompleted,
      is_waiting_for_submissions: isWaiting,
      number_of_received_assessments: numReceived,
    },
  }),
  self: createProgressData({
    active_step_name: 'self',
    active_step_info: {},
  }),
  staff: createProgressData({
    active_step_name: 'staff',
    active_step_info: {},
  }),
  graded: createProgressData({
    active_step_name: null,
    has_received_final_grade: true,
    received_grades: {
      peer: { earned: 5, possible: 25 },
      staff: { earned: 8, possible: 10 },
    },
  }),
};
