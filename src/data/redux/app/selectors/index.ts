import { createSelector } from '@reduxjs/toolkit';
import * as types from '../types';

type RootState = { app: types.AppState };

const rootSelector = (state: RootState): types.AppState => state.app;

const assessmentData = createSelector(
  rootSelector,
  (app: types.AppState): types.Assessment => app.assessment,
);
const formFieldsData = createSelector(
  rootSelector,
  (app: types.AppState): types.FormFields => app.formFields,
);
const selectors = {
  criterionFeedback: (state: RootState, criterionIndex: number): string | undefined => (
    formFieldsData(state).criteria[criterionIndex]?.feedback
  ),

  criterionOption: (state: RootState, criterionIndex: number): number | undefined => (
    formFieldsData(state).criteria[criterionIndex]?.selectedOption
  ),

  response: createSelector(
    rootSelector,
    (app: types.AppState): types.Response => app.response,
  ),

  hasSubmitted: createSelector(
    rootSelector,
    (app: types.AppState) => app.hasSubmitted,
  ),

  overallFeedback: (state: RootState): string => formFieldsData(state).overallFeedback,

  showTrainingError: createSelector(
    assessmentData,
    (assessment: types.Assessment): boolean => assessment?.showTrainingError,
  ),

  showValidation: createSelector(
    rootSelector,
    (app: types.AppState) => app.showValidation,
  ),

  submittedAssessment: createSelector(
    assessmentData,
    (assessment: types.Assessment) => assessment.submittedAssessment,
  ),

  // test
  testProgressKey: createSelector(
    rootSelector,
    ({ testProgressKey }) => testProgressKey,
  ),
  testDirty: createSelector(
    rootSelector,
    (app: types.AppState): boolean => app.testDirty,
  ),
  testDataPath: createSelector(
    rootSelector,
    (app: types.AppState): string | null | undefined => app.testDataPath,
  ),
};

export default {
  assessment: assessmentData,
  formFields: formFieldsData,
  ...selectors,
};
