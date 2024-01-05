import React from 'react';
import { when } from 'jest-when';

import { getEffects } from '@edx/react-unit-test-utils';

import { stepNames } from 'constants/index';

import * as reduxHooks from 'data/redux/hooks';
import * as lmsSelectors from 'data/services/lms/hooks/selectors';
// import * as lmsActions from 'data/services/lms/hooks/actions';
import * as routingHooks from './routing';

import * as exported from './assessment';

const { hooks } = exported;

jest.mock('data/redux/hooks', () => ({
  useCriterionFeedback: jest.fn(),
  useCriterionOption: jest.fn(),
  useFormFields: jest.fn(),
  useOverallFeedbackValue: jest.fn(),
  useResetAssessment: jest.fn(),
  useSetCriterionFeedback: jest.fn(),
  useSetCriterionOption: jest.fn(),
  useSetFormFields: jest.fn(),
  useSetOverallFeedback: jest.fn(),
  useSetResponse: jest.fn(),
  useSetShowTrainingError: jest.fn(),
}));

jest.mock('data/services/lms/hooks/actions', () => ({
}));
jest.mock('data/services/lms/hooks/selectors', () => ({
  useCriteriaConfig: jest.fn(),
  useStepInfo: jest.fn(),
  useEmptyRubric: jest.fn(),
  useResponseData: jest.fn(),
}));
jest.mock('./routing', () => ({
  useViewStep: jest.fn(),
}));

let out;
const testValue = 'test-value';
const testCriteriaConfig = [
  { feedbackRequired: false },
  { feedbackRequired: true },
];
const testAssessment = {
  criteria: [
    { selectedOption: '1' },
    { selectedOption: '2' },
    { selectedOption: '3' },
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
    let setShowTrainingError;
    const criterionIndex = 3;
    const prepHook = ({ value, isValid = true }) => {
      setOption = jest.fn();
      setShowTrainingError = jest.fn();
      spy = jest.spyOn(hooks, 'useTrainingOptionValidity');
      when(spy).calledWith(criterionIndex).mockReturnValueOnce(isValid ? 'valid' : 'invalid');
      when(reduxHooks.useCriterionOption).calledWith(criterionIndex).mockReturnValue(value);
      when(reduxHooks.useSetCriterionOption).calledWith(criterionIndex).mockReturnValue(setOption);
      when(reduxHooks.useSetShowTrainingError).calledWith().mockReturnValue(setShowTrainingError);
      out = hook(criterionIndex);
    };
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
  describe('useIsAssessmentInvalid', () => {
  });

  describe('useOnSubmit', () => {
  });

  describe('forwarded from reduxHooks', () => {
  });

  describe('forwarded from lms selectors', () => {
  });
});
