import { createSlice } from '@reduxjs/toolkit';

import { StrictDict } from 'utils';

const initialState = {
  assessment: {
    submittedAssessment: null,
    showTrainingError: false,
  },
  formFields: {
    criteria: [],
    overallFeedback: '',
  },
  hasSubmitted: false,
  showValidation: false,

  testDirty: false,
  testProgressKey: null,
  testDataPath: undefined,
};

// eslint-disable-next-line no-unused-vars
const app = createSlice({
  name: 'app',
  initialState,
  reducers: {
    loadAssessment: (state, { payload }) => ({
      ...state,
      assessment: { ...initialState.assessment, submittedAssessment: payload.data },
    }),
    setHasSubmitted: (state, { payload }) => ({
      ...state,
      hasSubmitted: payload,
      testDirty: payload, // test
    }),
    setShowValidation: (state, { payload }) => ({ ...state, showValidation: payload }),
    setShowTrainingError: (state, { payload }) => ({
      ...state,
      assessment: { ...state.assessment, showTrainingError: payload },
    }),
    resetAssessment: (state) => ({
      ...state,
      formFields: initialState.formFields,
      assessment: initialState.assessment,
      hasSubmitted: false,
      showValidation: false,
    }),
    setFormFields: (state, { payload }) => ({
      ...state,
      formFields: { ...state.formFields, ...payload },
    }),
    setCriterionOption: (state, { payload }) => {
      const { criterionIndex, option } = payload;
      // eslint-disable-next-line
      state.formFields.criteria[criterionIndex].selectedOption = option;
      return state;
    },
    setCriterionFeedback: (state, { payload }) => {
      const { criterionIndex, feedback } = payload;
      // eslint-disable-next-line
      state.formFields.criteria[criterionIndex].feedback = feedback;
      return state;
    },
    setOverallFeedback: (state, { payload }) => {
      // eslint-disable-next-line
      state.formFields.overallFeedback = payload;
      return state;
    },
    setTestProgressKey: (state, { payload }) => ({
      ...state,
      testProgressKey: payload,
      testDirty: false,
    }),
    setTestDataPath: (state, { payload }) => ({ ...state, testDataPath: payload }),
  },
});

const actions = StrictDict(app.actions);

const { reducer } = app;

export {
  actions,
  initialState,
  reducer,
};
