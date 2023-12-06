import { createSelector } from '@reduxjs/toolkit';
import * as types from './types';

type RootState = { app: types.AppState };

const selectors: { [k: string]: any } = {
  root: (state: RootState): types.AppState => state.app,
};
selectors.assessment = createSelector(
  selectors.root,
  (app: types.AppState): types.Assessment => app.assessment,
);
selectors.formFields = createSelector(
  selectors.root,
  (app: types.AppState): types.FormFields => app.formFields,
);
selectors.criterionFeedback = (state: RootState, criterionIndex: number): string | undefined => (
  selectors.formFields(state).criteria[criterionIndex]?.feedback
);

selectors.criterionOption = (state: RootState, criterionIndex: number): number | undefined => (
  selectors.formFields(state).criteria[criterionIndex]?.selectedOption
);

selectors.overallFeedback = (state: RootState): string => (
  selectors.formFields(state).overallFeedback
);

selectors.hasSubmitted = createSelector(
  selectors.root,
  (app: types.AppState) => app.hasSubmitted,
);

selectors.response = createSelector(
  selectors.root,
  (app: types.AppState): types.Response => app.response,
);

selectors.showTrainingError = createSelector(
  selectors.assessment,
  (assessment: types.Assessment): boolean => assessment?.showTrainingError,
);

selectors.showValidation = createSelector(
  selectors.root,
  (app: types.AppState) => app.showValidation,
);

selectors.submittedAssessment = createSelector(
  selectors.assessment,
  (assessment: types.Assessment) => assessment.submittedAssessment,
);

// test
selectors.testDataPath = createSelector(
  selectors.root,
  (app: types.AppState): string | null | undefined => app.testDataPath,
);
selectors.testDirty = createSelector(
  selectors.root,
  (app: types.AppState): boolean => app.testDirty,
);
selectors.testProgressKey = createSelector(
  selectors.root,
  (app: types.AppState): string | null | undefined => app.testProgressKey,
);

export default selectors;
