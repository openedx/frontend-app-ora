// import React from 'react';
import { when } from 'jest-when';

import { stepNames } from 'constants/index';

import * as reduxHooks from 'data/redux/hooks';
import * as lmsSelectors from 'data/services/lms/hooks/selectors';
// import * as lmsActions from 'data/services/lms/hooks/actions';
import * as routingHooks from './routing';

import * as exported from './assessment';

const { hooks } = exported;

jest.mock('data/redux/hooks', () => ({
  useCriterionOption: jest.fn(),
  useSetCriterionOption: jest.fn(),
  useSetShowTrainingError: jest.fn(),
  useCriterionFeedback: jest.fn(),
  useSetCriterionFeedback: jest.fn(),
  useOverallFeedbackValue: jest.fn(),
  useSetOverallFeedback: jest.fn(),
  useFormFields: jest.fn(),
}));

jest.mock('data/services/lms/hooks/actions', () => ({
}));
jest.mock('data/services/lms/hooks/selectors', () => ({
  useCriteriaConfig: jest.fn(),
  useStepInfo: jest.fn(),
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
const testValue0 = 'test-value-0';
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
describe('Assessment hooks', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('useCheckTrainingSelection', () => {
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
  });
  describe('useResetAssessment', () => {
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
