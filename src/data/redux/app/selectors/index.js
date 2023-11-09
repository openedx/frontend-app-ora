import { createSelector } from '@reduxjs/toolkit';

const rootSelector = ({ app }) => app;
const assessmentData = createSelector(rootSelector, ({ assessment }) => assessment);
const formFieldsData = createSelector(rootSelector, ({ formFields }) => formFields);
const selectors = {
  criterionFeedback: (state, criterionIndex) => (
    formFieldsData(state).criteria[criterionIndex]?.feedback
  ),

  criterionOption: (state, criterionIndex) => (
    formFieldsData(state).criteria[criterionIndex]?.selectedOption
  ),

  hasSubmitted: createSelector(rootSelector, ({ hasSubmitted }) => hasSubmitted),

  overallFeedback: (state) => formFieldsData(state).overallFeedback,

  showTrainingError: createSelector(assessmentData, (assessment) => assessment?.showTrainingError),

  showValidation: createSelector(rootSelector, ({ showValidation }) => showValidation),

  submittedAssessment:
    createSelector(assessmentData, ({ submittedAssessment }) => submittedAssessment),
};

export default {
  assessment: assessmentData,
  formFields: formFieldsData,
  ...selectors,
};
