import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { StrictDict } from '@edx/react-unit-test-utils';

import * as types from './types';

const initialState = {
  assessment: {
    submittedAssessment: null,
    showTrainingError: false,
  },
  response: null,
  tempResponse: null,
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
  initialState: initialState as types.AppState,
  reducers: {
    loadAssessment: (state: types.AppState, action: PayloadAction<types.AssessmentAction>) => ({
      ...state,
      assessment: { ...initialState.assessment, submittedAssessment: action.payload.data },
    }),
    loadResponse: (state: types.AppState, action: PayloadAction<types.Response>) => (
      state.hasSubmitted
        ? { ...state, tempResponse: action.payload }
        : { ...state, response: action.payload }
    ),
    setHasSubmitted: (state: types.AppState, action: PayloadAction<boolean>) => {
      const out = {
        ...state,
        hasSubmitted: action.payload,
        testDirty: action.payload, // test
      };
      if (!action.payload) {
        out.response = out.tempResponse;
      }
      return out;
    },
    setShowValidation: (state: types.AppState, action: PayloadAction<boolean>) => ({
      ...state,
      showValidation: action.payload,
    }),
    setShowTrainingError: (state: types.AppState, action: PayloadAction<boolean>) => ({
      ...state,
      assessment: { ...state.assessment, showTrainingError: action.payload },
    }),
    resetAssessment: (state: types.AppState) => ({
      ...state,
      formFields: initialState.formFields,
      assessment: initialState.assessment,
      hasSubmitted: initialState.hasSubmitted,
      showValidation: initialState.showValidation,
      response: state.tempResponse,
      tempResponse: initialState.tempResponse,
    }),
    setFormFields: (state: types.AppState, action: PayloadAction<types.FormFields>) => ({
      ...state,
      formFields: { ...state.formFields, ...action.payload },
    }),
    setCriterionOption: (state: types.AppState, action: PayloadAction<types.CriterionAction>) => {
      const { criterionIndex, option } = action.payload;
      // eslint-disable-next-line
      state.formFields.criteria[criterionIndex].selectedOption = option;
      return state;
    },
    setCriterionFeedback: (
      state: types.AppState,
      action: PayloadAction<types.CriterionAction>,
    ) => {
      const { criterionIndex, feedback } = action.payload;
      // eslint-disable-next-line
      state.formFields.criteria[criterionIndex].feedback = feedback;
      return state;
    },
    setOverallFeedback: (state: types.AppState, action: PayloadAction<string>) => {
      // eslint-disable-next-line
      state.formFields.overallFeedback = action.payload;
      return state;
    },
    setTestProgressKey: (state: types.AppState, action: PayloadAction<string>) => ({
      ...state,
      testProgressKey: action.payload,
      testDirty: false,
    }),
    setTestDataPath: (state: types.AppState, action: PayloadAction<string>) => ({
      ...state,
      testDataPath: action.payload,
    }),
  },
});

const actions = StrictDict(app.actions);

const { reducer } = app;

export {
  actions,
  initialState,
  reducer,
};
