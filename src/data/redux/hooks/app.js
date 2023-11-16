import { useSelector, useDispatch } from 'react-redux';

import * as redux from 'data/redux';

const selectors = redux.selectors.app;
const actions = redux.actions.app;

/* Simple Selectors */
export const useFormFields = () => useSelector(selectors.formFields);
export const useSubmittedAssessment = () => useSelector(selectors.submittedAssessment);
export const useHasSubmitted = () => useSelector(selectors.hasSubmitted);
export const useShowValidation = () => useSelector(selectors.showValidation);
export const useShowTrainingError = () => useSelector(selectors.showTrainingError);
export const useOverallFeedbackValue = () => useSelector(selectors.overallFeedback);
export const useResponse = () => useSelector(selectors.response);

/* special selectors */
export const useCriterionOption = criterionIndex => (
  useSelector(state => selectors.criterionOption(state, criterionIndex)));
export const useCriterionFeedback = criterionIndex => (
  useSelector(state => selectors.criterionFeedback(state, criterionIndex)));

/* Events */
const useActionHook = (action) => {
  const dispatch = useDispatch();
  return (args) => dispatch(action(args));
};
export const useLoadAssessment = () => useActionHook(actions.loadAssessment);
export const useSetHasSubmitted = () => useActionHook(actions.setHasSubmitted);
export const useSetShowValidation = () => useActionHook(actions.setShowValidation);
export const useSetShowTrainingError = () => useActionHook(actions.setShowTrainingError);
export const useSetFormFields = () => useActionHook(actions.setFormFields);
export const useResetAssessment = () => useActionHook(actions.resetAssessment);
export const useSetOverallFeedback = () => useActionHook(actions.setOverallFeedback);
export const useSetResponse = () => useActionHook(actions.setResponse);

export const useSetCriterionFeedback = (criterionIndex) => {
  const dispatch = useDispatch();
  return (feedback) => dispatch(actions.setCriterionFeedback({ criterionIndex, feedback }));
};
export const useSetCriterionOption = (criterionIndex) => {
  const dispatch = useDispatch();
  return (option) => dispatch(actions.setCriterionOption({ criterionIndex, option }));
};

// Test
export const useTestProgressKey = () => useSelector(selectors.testProgressKey);
export const useTestDirty = () => useSelector(selectors.testDirty);
export const useSetTestProgressKey = () => useActionHook(actions.setTestProgressKey);
export const useTestDataPath = () => useSelector(selectors.testDataPath);
export const useSetTestDataPath = () => useActionHook(actions.setTestDataPath);
