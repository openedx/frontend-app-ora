/* eslint-disable camelcase */

export const createRubricState = ({
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

export default {
  criteriaFeedbackEnabled: {
    empty: createRubricState({
      options_selected: emptySelections,
      criterion_feedback: {
        'Criterion 1 name': '',
        'Criterion 2 name': '',
        'Criterion 3 name': '',
        'Criterion 4 name': '',
      },
    }),
    filled: createRubricState({
      options_selected: filledSelections,
      criterion_feedback: {
        'Criterion 1 name': 'feedback 1',
        'Criterion 2 name': 'feedback 2',
        'Criterion 3 name': 'feedback 3',
        'Criterion 4 name': 'feedback 4',
      },
      overall_feedback: 'nice job',
    }),
  },
  criteriaFeedbackDisabled: {
    empty: createRubricState({
      options_selected: emptySelections,
      criterion_feedback: {},
    }),
    filled: createRubricState({
      options_selected: filledSelections,
      criterion_feedback: {},
      overall_feedback: 'nice job',
    }),
  },
};
