import React from 'react';
import { when } from 'jest-when';

import { keyStore, getEffects } from '@edx/react-unit-test-utils';

import { stepNames } from 'constants/index';

import * as reduxHooks from 'data/redux/hooks';
import * as lmsSelectors from 'data/services/lms/hooks/selectors';
import * as lmsActions from 'data/services/lms/hooks/actions';

import * as routingHooks from './routing';
import { useIsMounted } from './utils';

import * as exported from './assessment';

const { hooks } = exported;

jest.mock('data/redux/hooks', () => ({
  useCriterionFeedback: jest.fn(),
  useCriterionOption: jest.fn(),
  useFormFields: jest.fn(),
  useHasSubmitted: jest.fn(),
  useLoadAssessment: jest.fn(),
  useOverallFeedbackValue: jest.fn(),
  useResetAssessment: jest.fn(),
  useResponse: jest.fn(),
  useSetAssessmentValidity: jest.fn(),
  useSetHasSubmitted: jest.fn(),
  useSetCriterionFeedback: jest.fn(),
  useSetCriterionOption: jest.fn(),
  useSetFormFields: jest.fn(),
  useSetOverallFeedback: jest.fn(),
  useSetResponse: jest.fn(),
  useSetShowTrainingError: jest.fn(),
  useSetShowValidation: jest.fn(),
  useShowTrainingError: jest.fn(),
  useShowValidation: jest.fn(),
  useSubmittedAssessment: jest.fn(),
}));

jest.mock('data/services/lms/hooks/actions', () => ({
  useSubmitAssessment: jest.fn(),
}));

jest.mock('data/services/lms/hooks/selectors', () => ({
  useCriteriaConfig: jest.fn(),
  useStepInfo: jest.fn(),
  useEmptyRubric: jest.fn(),
  useOverallFeedbackDefaultText: jest.fn(),
  useOverallFeedbackInstructions: jest.fn(),
  useResponseData: jest.fn(),
}));

jest.mock('./routing', () => ({
  useViewStep: jest.fn(),
}));
jest.mock('./utils', () => ({
  useIsMounted: jest.fn(),
}));

let out;
const testValue = 'test-value';
const testCriteriaConfig = [
  {
    feedbackRequired: false,
    options: [
      { name: 'option1', value: 1 },
      { name: 'option2', value: 2 },
      { name: 'option3', value: 3 },
    ],
  },
  {
    feedbackRequired: true,
    options: [
      { name: 'option1', value: 1 },
      { name: 'option2', value: 2 },
      { name: 'option3', value: 3 },
    ],
  },
];
const testFeedbackOnlyConfig = {
  feedbackRequired: true,
  options: [],
};
const testAssessment = {
  criteria: [
    { feedback: 'assessmentFeedback1', selectedOption: '1' },
    { feedback: 'assessmentFeedback2', selectedOption: '2' },
    { feedback: 'assessmentFeedback3', selectedOption: '3' },
  ],
};
const testNullSelectionAssessment = {
  criteria: [
    { feedback: 'assessmentFeedback1', selectedOption: null },
    { feedback: 'assessmentFeedback2', selectedOption: null },
    { feedback: 'assessmentFeedback3', selectedOption: null },
  ],
};
const testStepInfo = {
  studentTraining: {
    expectedRubricSelections: [1, 2, 3],
  },
};
const testResponse = { test: 'response' };
when(lmsSelectors.useResponseData).calledWith().mockReturnValue(testResponse);
const testEmptyRubric = { test: 'empty rubric' };
when(lmsSelectors.useEmptyRubric).calledWith().mockReturnValue(testEmptyRubric);
const setCriterionFeedback = jest.fn();
when(reduxHooks.useSetCriterionFeedback).calledWith().mockReturnValue(setCriterionFeedback);
const setFormFields = jest.fn();
when(reduxHooks.useSetFormFields).calledWith().mockReturnValue(setFormFields);
const setOverallFeedback = jest.fn();
when(reduxHooks.useSetOverallFeedback).calledWith().mockReturnValue(setOverallFeedback);
const setResponse = jest.fn();
when(reduxHooks.useSetResponse).calledWith().mockReturnValue(setResponse);
const reset = jest.fn();
when(reduxHooks.useResetAssessment).calledWith().mockReturnValue(reset);
const setAssessment = jest.fn();
when(reduxHooks.useLoadAssessment).calledWith().mockReturnValue(setAssessment);
const setValidity = jest.fn();
when(reduxHooks.useSetAssessmentValidity).calledWith().mockReturnValue(setValidity);
const setShowTrainingError = jest.fn(val => ({ setShowTrainingError: val }));
when(reduxHooks.useSetShowTrainingError).calledWith().mockReturnValue(setShowTrainingError);
const setShowValidation = jest.fn(val => ({ setShowValidation: val }));
when(reduxHooks.useSetShowValidation).calledWith().mockReturnValue(setShowValidation);
const setHasSubmitted = jest.fn();
when(reduxHooks.useSetHasSubmitted).calledWith().mockReturnValue(setHasSubmitted);
let resolveSubmit;
const submitMutation = jest.fn(() => new Promise(resolve => { resolveSubmit = resolve; }));
const submit = { mutateAsync: submitMutation };
when(lmsActions.useSubmitAssessment).calledWith({ onSuccess: setAssessment }).mockReturnValue(submit);

describe('Assessment hooks', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('useIsTrainingSelectionValid', () => {
    const prepHook = ({ assessment = testAssessment, stepInfo = testStepInfo } = {}) => {
      when(reduxHooks.useFormFields).calledWith().mockReturnValueOnce(assessment);
      when(lmsSelectors.useStepInfo).calledWith().mockReturnValueOnce(stepInfo);
      out = hooks.useIsTrainingSelectionValid();
    };
    describe('behavior', () => {
      it('loads assessment info and expected values from hooks', () => {
        prepHook();
        expect(reduxHooks.useFormFields).toHaveBeenCalledWith();
        expect(lmsSelectors.useStepInfo).toHaveBeenCalledWith();
      });
    });
    describe('output', () => {
      describe('variable safety-catches', () => {
        it('returns true if assessment is null', () => {
          prepHook({ assessment: null });
          expect(out).toEqual(true);
        });
        it('returns true if step info is null', () => {
          prepHook({ stepInfo: null });
          expect(out).toEqual(true);
        });
        it('returns true if step info is missing studentTraining', () => {
          prepHook({ stepInfo: {} });
          expect(out).toEqual(true);
        });
        it('returns true if step info is missing expectedRubricSelections', () => {
          prepHook({ stepInfo: { studentTraining: {} } });
          expect(out).toEqual(true);
        });
        it('returns true if there are no assessment criteria', () => {
          prepHook({ assessment: { criteria: [] } });
          expect(out).toEqual(true);
        });
      });
      it('returns true if the assessment is valid', () => {
        prepHook();
        expect(out).toEqual(true);
      });
      it('returns false if any of the selected options to not match expected values', () => {
        prepHook({ studentTraining: { expectedRubricSelections: [1, 2, 4] } });
        expect(out).toEqual(true);
      });
    });
  });
  describe('useInitializeAssessment', () => {
    const prepHook = () => {
      out = hooks.useInitializeAssessment();
    };
    describe('behavior', () => {
      it('loads response, empty rubric, and setters for response and formFields from hooks', () => {
        prepHook();
        expect(lmsSelectors.useEmptyRubric).toHaveBeenCalledWith();
        expect(lmsSelectors.useResponseData).toHaveBeenCalledWith();
        expect(reduxHooks.useSetFormFields).toHaveBeenCalledWith();
        expect(reduxHooks.useSetResponse).toHaveBeenCalledWith();
      });
      it('calls setResponse with response on first load', () => {
        prepHook();
        const [cb] = getEffects([], React);
        cb();
        expect(setResponse).toHaveBeenCalledWith(testResponse);
      });
    });
    describe('output', () => {
      it('returns a static callback that sets form fields to empty rubric', () => {
        prepHook();
        expect(out.useCallback.prereqs).toEqual([]);
        out.useCallback.cb();
        expect(setFormFields).toHaveBeenCalledWith(testEmptyRubric);
      });
    });
  });
  describe('useIsCriterionFeedbackInvalid', () => {
    const prepHook = ({ viewStep, criteriaConfig }) => {
      routingHooks.useViewStep.mockReturnValueOnce(viewStep);
      lmsSelectors.useCriteriaConfig.mockReturnValueOnce(criteriaConfig);
      out = hooks.useIsCriterionFeedbackInvalid();
    };
    it('loads view step and criteria config from hooks', () => {
      prepHook({ viewStep: stepNames.submission, criteriaConfig: testCriteriaConfig });
      expect(routingHooks.useViewStep).toHaveBeenCalled();
      expect(lmsSelectors.useCriteriaConfig).toHaveBeenCalled();
    });
    describe('returned callback', () => {
      it('returns false if viewStep is studentTraining which has no feedback', () => {
        prepHook({ viewStep: stepNames.studentTraining, criteriaConfig: testCriteriaConfig });
        expect(out({ value: testValue, criterionIndex: 1 })).toEqual(false);
      });
      describe('if step is not studentTraining', () => {
        it('returns true if value is empty and feedback is required', () => {
          prepHook({ viewStep: stepNames.submission, criteriaConfig: testCriteriaConfig });
          expect(out({ value: '', criterionIndex: 1 })).toEqual(true);
        });
        it('returns false if value is empty and feedback is not required', () => {
          prepHook({ viewStep: stepNames.peer, criteriaConfig: testCriteriaConfig });
          expect(out({ value: '', criterionIndex: 0 })).toEqual(false);
        });
      });
    });
  });
  describe('useOverallFeedbackFormFields', () => {
    const prepHook = () => {
      when(reduxHooks.useOverallFeedbackValue).calledWith().mockReturnValueOnce(testValue);
      out = hooks.useOverallFeedbackFormFields();
    };
    describe('behavior', () => {
      it('loads value and setter from hooks', () => {
        prepHook();
        expect(reduxHooks.useOverallFeedbackValue).toHaveBeenCalledWith();
        expect(reduxHooks.useSetOverallFeedback).toHaveBeenCalledWith();
      });
    });
    describe('output', () => {
      it('returns value and setFeedback event handler', () => {
        prepHook();
        expect(out.value).toEqual(testValue);
        out.onChange({ target: { value: testValue } });
        expect(setOverallFeedback).toHaveBeenCalledWith(testValue);
      });
    });
  });
  describe('useResetAssessment', () => {
    const prepHook = () => {
      out = hooks.useResetAssessment();
    };
    describe('behavior', () => {
      it('loads value and setter from hooks', () => {
        prepHook();
        expect(reduxHooks.useResetAssessment).toHaveBeenCalledWith();
        expect(reduxHooks.useSetFormFields).toHaveBeenCalledWith();
        expect(lmsSelectors.useEmptyRubric).toHaveBeenCalledWith();
      });
    });
    describe('output', () => {
      it('returns value and setFeedback event handler', () => {
        prepHook();
        out();
        expect(reset).toHaveBeenCalled();
        expect(setFormFields).toHaveBeenCalledWith(testEmptyRubric);
      });
    });
  });
  describe('useTrainingOptionValidity', () => {
    const prepHook = ({ value, stepInfo, criterionIndex = 1 }) => {
      when(reduxHooks.useCriterionOption).calledWith(criterionIndex).mockReturnValue(value);
      when(lmsSelectors.useStepInfo).calledWith().mockReturnValue(stepInfo);
    };
    it('returns null if no step info is available', () => {
      prepHook({ value: testValue, stepInfo: {} });
      expect(hooks.useTrainingOptionValidity(0)).toEqual(null);
    });
    it('returns null if criterion option value is not set', () => {
      prepHook({ value: null, stepInfo: testStepInfo });
      expect(hooks.useTrainingOptionValidity(0)).toEqual(null);
    });
    it('returns null if student training expected selections are not included', () => {
      prepHook({ value: testValue, stepInfo: { studentTraining: { other: 'config' } } });
      expect(hooks.useTrainingOptionValidity(0)).toEqual(null);
    });
    it('returns null if student training expected selection for the criterion is null', () => {
      prepHook({
        value: testValue,
        stepInfo: { studentTraining: { expectedRubricSelections: [null] } },
      });
      expect(hooks.useTrainingOptionValidity(0)).toEqual(null);
    });
    describe('value is set and expected value is not null', () => {
      it('returns "valid" if value matches expected value', () => {
        prepHook({ value: '1', stepInfo: testStepInfo, criterionIndex: 0 });
        expect(hooks.useTrainingOptionValidity(0)).toEqual('valid');
      });
      it('returns "invalid" if value does not match expected value', () => {
        prepHook({ value: 'other-value', stepInfo: testStepInfo, criterionIndex: 0 });
        expect(hooks.useTrainingOptionValidity(0)).toEqual('invalid');
      });
    });
  });

  describe('useCriterionFeedbackFormFields', () => {
    const criterionIndex = 3;
    const mockIsInvalid = (args) => ({ isInvalid: args });
    let spy;
    const prepHook = () => {
      when(reduxHooks.useCriterionFeedback).calledWith(criterionIndex).mockReturnValueOnce(testValue);
      when(reduxHooks.useSetCriterionFeedback).calledWith(criterionIndex).mockReturnValueOnce(setCriterionFeedback);
      spy = jest.spyOn(hooks, 'useIsCriterionFeedbackInvalid');
      when(spy).calledWith().mockReturnValueOnce(mockIsInvalid);
      out = hooks.useCriterionFeedbackFormFields(criterionIndex);
    };
    describe('behavior', () => {
      it('loads value, validity, and setter from hooks', () => {
        prepHook();
        expect(reduxHooks.useCriterionFeedback).toHaveBeenCalledWith(criterionIndex);
        expect(reduxHooks.useSetCriterionFeedback).toHaveBeenCalledWith(criterionIndex);
        expect(hooks.useIsCriterionFeedbackInvalid).toHaveBeenCalledWith();
      });
    });
    describe('output', () => {
      it('returns value and setFeedback event handler', () => {
        prepHook();
        expect(out.value).toEqual(testValue);
        expect(out.isInvalid).toEqual(mockIsInvalid({ value: testValue, criterionIndex }));
        out.onChange({ target: { value: testValue } });
        expect(setCriterionFeedback).toHaveBeenCalledWith(testValue);
      });
    });
  });

  describe('useCriterionOptionFormFields', () => {
    const hook = hooks.useCriterionOptionFormFields;
    let spy;
    let setOption;
    const criterionIndex = 3;
    const prepHook = ({ value, isValid = true }) => {
      setOption = jest.fn();
      spy = jest.spyOn(hooks, 'useTrainingOptionValidity');
      when(spy).calledWith(criterionIndex).mockReturnValueOnce(isValid ? 'valid' : 'invalid');
      when(reduxHooks.useCriterionOption).calledWith(criterionIndex).mockReturnValue(value);
      when(reduxHooks.useSetCriterionOption).calledWith(criterionIndex).mockReturnValue(setOption);
      when(reduxHooks.useSetShowTrainingError).calledWith().mockReturnValue(setShowTrainingError);
      out = hook(criterionIndex);
    };
    afterEach(() => {
      spy.mockRestore();
    });
    describe('behavior', () => {
      it('initializes value and setters from redux hooks', () => {
        prepHook({ value: testValue });
        expect(reduxHooks.useCriterionOption).toHaveBeenCalledWith(criterionIndex);
        expect(reduxHooks.useSetCriterionOption).toHaveBeenCalledWith(criterionIndex);
        expect(reduxHooks.useSetShowTrainingError).toHaveBeenCalled();
      });
      it('initializes validity from useTrainingOptionValidity', () => {
        prepHook({ value: testValue });
        expect(spy).toHaveBeenCalledWith(criterionIndex);
      });
    });
    describe('output', () => {
      it('returns value from redux', () => {
        prepHook({ value: testValue });
        expect(out.value).toEqual(testValue);
      });
      describe('isInvalid', () => {
        it('returns true iff value is nuill', () => {
          prepHook({ value: testValue });
          expect(out.isInvalid).toEqual(false);
          prepHook({ value: null });
          expect(out.isInvalid).toEqual(true);
        });
      });
      describe('onChange callback', () => {
        it('is based on setOption and setShowTrainingError', () => {
          prepHook({ value: testValue });
          const { prereqs } = out.onChange.useCallback;
          expect(prereqs).toEqual([setOption, setShowTrainingError]);
        });
        it('sets option and clears training error', () => {
          prepHook({ value: testValue });
          const { cb } = out.onChange.useCallback;
          cb({ target: { value: testValue } });
          expect(setOption).toHaveBeenCalledWith(testValue);
          expect(setShowTrainingError).toHaveBeenCalledWith(false);
        });
      });
      describe('trainingOptionValidity', () => {
        it('returns value from useTrainingOptionValidity', () => {
          prepHook({ value: testValue });
          expect(out.trainingOptionValidity).toEqual('valid');
          prepHook({ value: testValue, isValid: false });
          expect(out.trainingOptionValidity).toEqual('invalid');
        });
      });
    });
  });
  describe('useIsCriterionInvalid', () => {
    let spy;
    let mockIsInvalid;
    const prepHook = ({ assessment = testAssessment, isInvalid = false } = {}) => {
      when(reduxHooks.useFormFields).calledWith().mockReturnValueOnce(assessment);
      spy = jest.spyOn(hooks, 'useIsCriterionFeedbackInvalid');
      mockIsInvalid = jest.fn(() => isInvalid);
      when(spy).calledWith().mockReturnValueOnce(mockIsInvalid);
      out = hooks.useIsCriterionInvalid();
    };
    describe('behavior', () => {
      it('initializes assessment, criteriaConfig and feedback validity from hooks', () => {
        prepHook();
        expect(reduxHooks.useFormFields).toHaveBeenCalledWith();
        expect(hooks.useIsCriterionFeedbackInvalid).toHaveBeenCalledWith();
      });
    });
    describe('output method', () => {
      it('returns true if there are any options in the config, but none is selected', () => {
        prepHook({ assessment: testNullSelectionAssessment });
        expect(out(testCriteriaConfig[0], 1)).toEqual(true);
      });
      it('returns true if isFeedbackInvalid is true', () => {
        prepHook({ assessment: testAssessment, isInvalid: true });
        expect(out(testCriteriaConfig[0], 1)).toEqual(true);
        expect(mockIsInvalid).toHaveBeenCalledWith({
          value: testNullSelectionAssessment.criteria[1].feedback,
          criterionIndex: 1,
        });
      });
      it('returns false if there are no options and feedback is valid', () => {
        prepHook({ assessment: testAssessment });
        expect(out(testFeedbackOnlyConfig, 1)).toEqual(false);
      });
      it('returns false if an option is selected and feedback is valid', () => {
        prepHook({ assessment: testAssessment });
        expect(out(testCriteriaConfig[0], 1)).toEqual(false);
      });
    });
  });
  describe('useIsAssessmentInvalid', () => {
    let spy;
    const mockIsInvalid = jest.fn(() => false);
    const prepHook = ({
      assessment = testAssessment,
      criteriaConfig = testCriteriaConfig,
    } = {}) => {
      when(reduxHooks.useFormFields).calledWith().mockReturnValueOnce(assessment);
      when(lmsSelectors.useCriteriaConfig).calledWith().mockReturnValueOnce(criteriaConfig);
      spy = jest.spyOn(hooks, 'useIsCriterionInvalid');
      when(spy).calledWith().mockReturnValueOnce(mockIsInvalid);
      out = hooks.useIsAssessmentInvalid();
    };
    describe('behavior', () => {
      it('initializes assessment, criteriaConfig and feedback validity from hooks', () => {
        prepHook();
        expect(reduxHooks.useFormFields).toHaveBeenCalledWith();
        expect(lmsSelectors.useCriteriaConfig).toHaveBeenCalledWith();
        expect(hooks.useIsCriterionInvalid).toHaveBeenCalledWith();
      });
    });
    describe('output', () => {
      it('returns false if assessment has no criteria', () => {
        prepHook({ assessment: { criteria: [] }, criteriaConfig: [] });
        expect(out).toEqual(false);
      });
      it('returns false if any criteria are invalid', () => {
        mockIsInvalid.mockReturnValueOnce(true);
        prepHook();
        expect(out).toEqual(true);
      });
      it('returns false if all criteria are valid', () => {
        prepHook();
        expect(out).toEqual(false);
      });
    });
  });

  describe('useOnSubmit', () => {
    let invalidSpy;
    let trainingValidSpy;
    const prepHook = ({
      isMounted = true,
      isInvalid = false,
      isTrainingSelectionValid = true,
      viewStep = stepNames.peer,
      formFields = testAssessment,
    } = {}) => {
      invalidSpy = jest.spyOn(hooks, 'useIsAssessmentInvalid');
      when(invalidSpy).calledWith().mockReturnValue(isInvalid);
      trainingValidSpy = jest.spyOn(hooks, 'useIsTrainingSelectionValid');
      when(trainingValidSpy).calledWith().mockReturnValueOnce(isTrainingSelectionValid);
      when(routingHooks.useViewStep).calledWith().mockReturnValue(viewStep);
      when(reduxHooks.useFormFields).calledWith().mockReturnValue(formFields);
      when(useIsMounted).calledWith().mockReturnValue({ current: isMounted });
      out = hooks.useOnSubmit();
    };
    afterEach(() => {
      invalidSpy.mockRestore();
      trainingValidSpy.mockRestore();
    });
    describe('behavior', () => {
      it('loads setters for assessment, validity, training errors and submission state from hooks', () => {
        prepHook();
        expect(reduxHooks.useLoadAssessment).toHaveBeenCalledWith();
        expect(reduxHooks.useSetShowValidation).toHaveBeenCalledWith();
        expect(reduxHooks.useSetShowTrainingError).toHaveBeenCalledWith();
        expect(reduxHooks.useSetHasSubmitted).toHaveBeenCalledWith();
      });
      it('loads mounted state and validity from hooks', () => {
        prepHook();
        expect(useIsMounted).toHaveBeenCalledWith();
        expect(hooks.useIsAssessmentInvalid).toHaveBeenCalledWith();
        expect(hooks.useIsTrainingSelectionValid).toHaveBeenCalledWith();
      });
      it('loads view step, form fields, and submit assessment muitation from hooks', () => {
        prepHook();
        expect(routingHooks.useViewStep).toHaveBeenCalledWith();
        expect(reduxHooks.useFormFields).toHaveBeenCalledWith();
        expect(lmsActions.useSubmitAssessment).toHaveBeenCalledWith({ onSuccess: setAssessment });
      });
    });
    describe('output callback', () => {
      it('is based on view step, formFields, validity, and actions', () => {
        prepHook();
        const { prereqs } = out.onSubmit.useCallback;
        expect(prereqs).toEqual([
          testAssessment,
          false,
          { current: true },
          true,
          setAssessment,
          setHasSubmitted,
          setShowTrainingError,
          setShowValidation,
          submit,
          stepNames.peer,
        ]);
      });
      it('sets showValidation to true if invalid', () => {
        prepHook({ isInvalid: true });
        expect(out.onSubmit.useCallback.cb()).toEqual(setShowValidation(true));
      });
      it('sets showTrainingError to true if on training and training is invalid', () => {
        prepHook({ isTrainingSelectionValid: false, viewStep: stepNames.studentTraining });
        expect(out.onSubmit.useCallback.cb()).toEqual(setShowTrainingError(true));
      });
      describe('returned mutation if valid', () => {
        it('sets assessment and hasSubmitted on success if mounted', async () => {
          prepHook();
          out.onSubmit.useCallback.cb();
          expect(submit.mutateAsync).toHaveBeenCalledWith({ ...testAssessment, step: stepNames.peer });
          const testData = { test: 'data' };
          await resolveSubmit(testData);
          expect(setAssessment).toHaveBeenCalledWith(testData);
          expect(setHasSubmitted).toHaveBeenCalledWith(true);
        });
        it('does not set assessment and hasSubmitted on success if not mounted', async () => {
          prepHook({ isMounted: false });
          out.onSubmit.useCallback.cb();
          expect(submit.mutateAsync).toHaveBeenCalledWith({ ...testAssessment, step: stepNames.peer });
          const testData = { test: 'data' };
          await resolveSubmit(testData);
          expect(setAssessment).not.toHaveBeenCalled();
          expect(setHasSubmitted).not.toHaveBeenCalled();
        });
      });
    });
  });

  describe('exported', () => {
    const testExport = (object, key) => {
      test(key, () => {
        expect(object[key]).toEqual(exported[key]);
      });
    };
    const hookKeys = keyStore(hooks);
    const reduxHookKeys = keyStore(reduxHooks);
    const lmsSelectorKeys = keyStore(lmsSelectors);
    [
      hookKeys.useCriterionFeedbackFormFields,
      hookKeys.useCriterionOptionFormFields,
      hookKeys.useInitializeAssessment,
      hookKeys.useIsAssessmentInvalid,
      hookKeys.useIsTrainingSelectionValid,
      hookKeys.useOnSubmit,
      hookKeys.useOverallFeedbackFormFields,
      hookKeys.useResetAssessment,
    ].forEach((key) => testExport(hooks, key));

    [
      reduxHookKeys.useHasSubmitted,
      reduxHookKeys.useResponse,
      reduxHookKeys.useSetResponse,
      reduxHookKeys.useSetHasSubmitted,
      reduxHookKeys.useSetShowValidation,
      reduxHookKeys.useShowValidation,
      reduxHookKeys.useShowTrainingError,
      reduxHookKeys.useSubmittedAssessment,
    ].forEach((key) => testExport(reduxHooks, key));

    [
      lmsSelectorKeys.useCriteriaConfig,
      lmsSelectorKeys.useEmptyRubric,
      lmsSelectorKeys.useOverallFeedbackInstructions,
    ].forEach((key) => testExport(lmsSelectors, key));
  });
});
