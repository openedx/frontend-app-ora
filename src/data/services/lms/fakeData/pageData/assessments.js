/* eslint-disable camelcase */

export const createAssessmentState = ({
  options_selected = [],
  criterion_feedback,
  overall_feedback = '',
}) => ({
  options_selected,
  criterion_feedback,
  overall_feedback,
});

export const emptySelections = {
  'Criterion 1 name': null,
  'Criterion 2 name': null,
  'Criterion 3 name': null,
  'Criterion 4 name': null,
};
export const filledSelections = {
  'Criterion 1 name': 'Option 4 name',
  'Criterion 2 name': 'Option 3 name',
  'Criterion 3 name': 'Option 2 name',
  'Criterion 4 name': 'Option 1 name',
};

const gradedState = createAssessmentState({
  options_selected: filledSelections,
  criterion_feedback: {
    'Criterion 1 name': 'feedback 1',
    'Criterion 2 name': 'feedback 2',
    'Criterion 3 name': 'feedback 3',
    'Criterion 4 name': 'feedback 4',
  },
  overall_feedback: 'nice job',
});

export default {
  graded: {
    staff: {
      stepScore: { earned: 10, possible: 10 },
      assessment: gradedState,
    },
    peer: {
      stepScore: { earned: 10, possible: 10 },
      assessment: [
        gradedState,
        gradedState,
        gradedState,
        gradedState,
        gradedState,
      ],
    },
    peerUnweighted: {
      stepScore: null,
      assessment: [
        gradedState,
        gradedState,
        gradedState,
      ],
    },
    self: {
      stepScore: { earned: 10, possible: 10 },
      assessment: gradedState,
    },
  },
};
