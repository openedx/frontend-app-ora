import React from 'react';

import { stepNames } from 'constants/index';

import * as reduxHooks from 'data/redux/hooks';
import * as lmsSelectors from 'data/services/lms/hooks/selectors';
import * as lmsActions from 'data/services/lms/hooks/actions';
import * as routingHooks from './routing';
import { useIsMounted } from './utils';

export const hooks = {
  useIsTrainingSelectionValid: () => {
    const assessment = reduxHooks.useFormFields();
    const expected = (lmsSelectors.useStepInfo()?.studentTraining || {}).expectedRubricSelections;
    if (!expected || !assessment) {
      return true;
    }
    return assessment.criteria.every(
      (criterion, criterionIndex) => `${expected[criterionIndex]}` === criterion.selectedOption,
    );
  },

  useInitializeAssessment: () => {
    const emptyRubric = lmsSelectors.useEmptyRubric();
    const setFormFields = reduxHooks.useSetFormFields();
    const setResponse = reduxHooks.useSetResponse();
    const response = lmsSelectors.useResponseData();
    React.useEffect(() => {
      setResponse(response);
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    return React.useCallback(() => {
      setFormFields(emptyRubric);
    }, []); // eslint-disable-line react-hooks/exhaustive-deps
  },

  useIsCriterionFeedbackInvalid: () => {
    const viewStep = routingHooks.useViewStep();
    const criteriaConfig = lmsSelectors.useCriteriaConfig();
    return ({ value, criterionIndex }) => {
      const config = criteriaConfig[criterionIndex];
      return viewStep !== stepNames.studentTraining
        && value === ''
        && config.feedbackRequired;
    };
  },

  useOverallFeedbackFormFields: () => {
    const value = reduxHooks.useOverallFeedbackValue();
    const setFeedback = reduxHooks.useSetOverallFeedback();
    return { value, onChange: (e) => setFeedback(e.target.value) };
  },

  useResetAssessment: () => {
    const reset = reduxHooks.useResetAssessment();
    const setFormFields = reduxHooks.useSetFormFields();
    const emptyRubric = lmsSelectors.useEmptyRubric();
    return () => {
      reset();
      setFormFields(emptyRubric);
    };
  },

  useTrainingOptionValidity: (criterionIndex) => {
    const value = reduxHooks.useCriterionOption(criterionIndex);
    const expected = (lmsSelectors.useStepInfo().studentTraining || {}).expectedRubricSelections;
    if (!value || !expected || expected[criterionIndex] === null) {
      return null;
    }
    return `${expected[criterionIndex]}` === value ? 'valid' : 'invalid';
  },
};

Object.assign(hooks, {
  useCriterionFeedbackFormFields: (criterionIndex) => {
    const value = reduxHooks.useCriterionFeedback(criterionIndex);
    const setFeedback = reduxHooks.useSetCriterionFeedback(criterionIndex);
    const isInvalid = hooks.useIsCriterionFeedbackInvalid()({
      value, criterionIndex,
    });
    return { value, onChange: (e) => setFeedback(e.target.value), isInvalid };
  },

  useCriterionOptionFormFields: (criterionIndex) => {
    const value = reduxHooks.useCriterionOption(criterionIndex);
    const setOption = reduxHooks.useSetCriterionOption(criterionIndex);
    const setShowTrainingError = reduxHooks.useSetShowTrainingError();
    const trainingOptionValidity = hooks.useTrainingOptionValidity(criterionIndex);

    const onChange = React.useCallback((e) => {
      setShowTrainingError(false);
      setOption(e.target.value);
    }, [setOption, setShowTrainingError]);

    const isInvalid = value === null;

    return {
      value,
      onChange,
      isInvalid,
      trainingOptionValidity,
    };
  },

  useIsCriterionInvalid: () => {
    const assessment = reduxHooks.useFormFields();
    const isFeedbackInvalid = hooks.useIsCriterionFeedbackInvalid();
    return (criterionConfig, criterionIndex) => {
      const { feedback, selectedOption } = assessment.criteria[criterionIndex];
      return ((criterionConfig.options.length && selectedOption === null)
        || isFeedbackInvalid({ value: feedback, criterionIndex }));
    };
  },
});

Object.assign(hooks, {
  useIsAssessmentInvalid: () => {
    const assessment = reduxHooks.useFormFields();
    const criteriaConfig = lmsSelectors.useCriteriaConfig();
    const isCriterionValid = hooks.useIsCriterionInvalid();
    if (!assessment.criteria.length) {
      return false;
    }
    return criteriaConfig.some(isCriterionValid);
  },
  useOnSubmit: () => {
    const isMounted = useIsMounted();
    const setAssessment = reduxHooks.useLoadAssessment();
    const setShowValidation = reduxHooks.useSetShowValidation();
    const setShowTrainingError = reduxHooks.useSetShowTrainingError();
    const setHasSubmitted = reduxHooks.useSetHasSubmitted();

    const isInvalid = hooks.useIsAssessmentInvalid();
    const isTrainingSelectionValid = hooks.useIsTrainingSelectionValid();

    const viewStep = routingHooks.useViewStep();
    const formFields = reduxHooks.useFormFields();
    const submitAssessmentMutation = lmsActions.useSubmitAssessment({ onSuccess: setAssessment });

    return {
      onSubmit: React.useCallback(() => {
        if (isInvalid) {
          return setShowValidation(true);
        }
        if (viewStep === stepNames.studentTraining && !isTrainingSelectionValid) {
          return setShowTrainingError(true);
        }
        return submitAssessmentMutation.mutateAsync({ ...formFields, step: viewStep })
          .then((data) => {
            if (isMounted.current) {
              setAssessment(data);
              setHasSubmitted(true);
            }
          });
      }, [
        formFields,
        isInvalid,
        isMounted,
        isTrainingSelectionValid,
        setAssessment,
        setHasSubmitted,
        setShowTrainingError,
        setShowValidation,
        submitAssessmentMutation,
        viewStep,
      ]),
      status: submitAssessmentMutation.status,
    };
  },
});

export const {
  useCheckTrainingSelection,
  useCriterionFeedbackFormFields,
  useCriterionOptionFormFields,
  useInitializeAssessment,
  useIsAssessmentInvalid,
  useIsTrainingSelectionValid,
  useOnSubmit,
  useOverallFeedbackFormFields,
  useResetAssessment,
} = hooks;

export const {
  useHasSubmitted,
  useResponse,
  useSetResponse,
  useSetHasSubmitted,
  useSetShowValidation,
  useShowValidation,
  useShowTrainingError,
  useSubmittedAssessment,
} = reduxHooks;

export const {
  useCriteriaConfig,
  useEmptyRubric,
  useOverallFeedbackPrompt,
} = lmsSelectors;
