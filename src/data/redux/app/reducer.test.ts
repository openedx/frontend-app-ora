import { initialState, actions, reducer } from './reducer';

const testState = {
  assessment: {
    submittedAssessment: {
      criteria: [
        { selectedOption: 1, feedback: 'test-criterion-feedback1' },
        { selectedOption: 2, feedback: 'test-criterion-feedback2' },
      ],
      overallFeedback: 'test-overall-feedback',
    },
    showTrainingError: true,
  },
  response: ['test-response'],
  tempResponse: ['test-temp-response'],
  formFields: {
    criteria: [
      { selectedOption: 1, feedback: 'test-formFields-criterion-feedback1' },
      { selectedOption: 3, feedback: 'test-formFields-criterion-feedback2' },
    ],
    overallFeedback: 'formFields-overall-feedback',
  },
  hasSubmitted: true,
  showValidation: true,
  testDirty: true,
  testProgressKey: 'test-progress-key',
  testDataPath: 'test-data-path',
};

const testValue = 'test-value';
describe('app reducer', () => {
  it('returns initial state', () => {
    expect(reducer(undefined, { type: undefined })).toEqual(initialState);
  });
  describe('actions', () => {
    const testAction = (action, expected) => {
      expect(reducer(testState, action)).toEqual({ ...testState, ...expected });
    };
    describe('loadAssessment', () => {
      it('overrides assessment.submittedAssessment with action data', () => {
        testAction(
          actions.loadAssessment({ data: testValue }),
          { assessment: { ...initialState.assessment, submittedAssessment: testValue } },
        );
      });
    });
    describe('loadResponse', () => {
      it('overrides response if not submitted', () => {
        const action = actions.loadResponse(testValue);
        expect(reducer(
          { ...testState, hasSubmitted: false },
          action,
        )).toEqual({ ...testState, hasSubmitted: false, response: testValue });
      });
      it('overrides tempResponse if submitted', () => {
        testAction(actions.loadResponse(testValue), { tempResponse: testValue });
      });
    });
    describe('setHasSubmitted', () => {
      it('overrides hasSubmitted and testDirty', () => {
        testAction(
          actions.setHasSubmitted(testValue),
          { hasSubmitted: testValue, testDirty: testValue },
        );
      });
    });
    describe('setShowValidation', () => {
      it('overrides showValidation', () => {
        testAction(actions.setShowValidation(testValue), { showValidation: testValue });
      });
    });
    describe('setShowTrainingError', () => {
      it('overrides assessment.showTrainingError', () => {
        testAction(
          actions.setShowTrainingError(testValue),
          { assessment: { ...testState.assessment, showTrainingError: testValue } },
        );
      });
    });
    describe('resetAssessment', () => {
      it('resets formFields, assessment, showValidation, and hasSubmitted', () => {
        testAction(
          actions.resetAssessment(),
          {
            assessment: initialState.assessment,
            formFields: initialState.formFields,
            hasSubmitted: initialState.hasSubmitted,
            response: testState.tempResponse,
            showValidation: initialState.showValidation,
            tempResponse: initialState.tempResponse,
          },
        );
      });
    });
    describe('setFormFields', () => {
      it('partially overrides formFields', () => {
        testAction(
          actions.setFormFields({ overallFeedback: testValue }),
          { formFields: { ...testState.formFields, overallFeedback: testValue } },
        );
        const testCriteria = [{ selectedOption: 1, feedback: 'test-feedback' }];
        testAction(
          actions.setFormFields({ criteria: testCriteria }),
          { formFields: { ...testState.formFields, criteria: testCriteria } },
        );
      });
    });
    describe('setCriterionOption', () => {
      it('overrides the selectedOption for the criterion with the given index', () => {
        const criterionIndex = 1;
        const option = 23;
        const expectedCriteria = [...testState.formFields.criteria];
        expectedCriteria[criterionIndex] = {
          ...expectedCriteria[criterionIndex],
          selectedOption: option,
        };
        testAction(
          actions.setCriterionOption({ criterionIndex, option }),
          { formFields: { ...testState.formFields, criteria: expectedCriteria } },
        );
      });
    });
    describe('setCriterionFeedback', () => {
      it('overrides the feedback for the criterion with the given index', () => {
        const criterionIndex = 1;
        const feedback = 'expected-feedback';
        const expectedCriteria = [...testState.formFields.criteria];
        expectedCriteria[criterionIndex] = {
          ...expectedCriteria[criterionIndex],
          feedback,
        };
        testAction(
          actions.setCriterionFeedback({ criterionIndex, feedback }),
          { formFields: { ...testState.formFields, criteria: expectedCriteria } },
        );
      });
    });
    describe('setOverallFeedback', () => {
      it('overrides formFields.overallFeedback', () => {
        testAction(
          actions.setOverallFeedback(testValue),
          { formFields: { ...testState.formFields, overallFeedback: testValue } },
        );
      });
    });
    describe('setTestProgressKey', () => {
      it('overrides formFields.overallFeedback', () => {
        testAction(
          actions.setTestProgressKey(testValue),
          { testProgressKey: testValue, testDirty: false },
        );
      });
    });
    describe('setTestDataPath', () => {
      it('overrides testDataPath', () => {
        testAction(
          actions.setTestDataPath(testValue),
          { testDataPath: testValue },
        );
      });
    });
  });
});
