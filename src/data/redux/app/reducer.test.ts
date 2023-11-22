import { initialState, actions, reducer } from './reducer';

const testValue = 'test-value';
describe('app reducer', () => {
  it('returns initial state', () => {
    expect(reducer(undefined, { type: undefined })).toEqual(initialState);
  });
  describe('actions', () => {
    const testAction = (action, expected) => {
      expect(reducer(initialState, action)).toEqual({ ...initialState, ...expected });
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
      it('overrides response', () => {
        testAction(actions.loadResponse(testValue), { response: testValue });
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
          { assessment: { ...initialState.assessment, showTrainingError: testValue } },
        );
      });
    });
    describe('resetAssessment', () => {
    });
    describe('setFormFields', () => {
    });
    describe('setCriterionOption', () => {
    });
    describe('setCriterionFeedback', () => {
    });
    describe('resetAssessment', () => {
    });
    describe('setFormFields', () => {
    });
    describe('setCriterionOption', () => {
    });
    describe('setCriterionFeedback', () => {
    });
    describe('setOverallFeedback', () => {
    });
    describe('setTestProgressKey', () => {
    });
    describe('setTestDataPath', () => {
    });
  });
});
