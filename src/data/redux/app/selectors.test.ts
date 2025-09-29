import { keyStore } from '../../../utils';

import selectors from './selectors';

const testState = {
  app: {
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
  },
};

let selector;
const appKeys = keyStore(testState.app);
describe('redux app selectors', () => {
  const testSimpleAppSelector = (key) => {
    selector = selectors[key];
    expect(selector.dependencies).toEqual([selectors.root]);
    expect(selector.resultFunc(testState.app)).toEqual(testState.app[key]);
  };
  describe('root', () => {
    it('returns app object from top-level state', () => {
      expect(selectors.root(testState)).toEqual(testState.app);
    });
  });
  describe('assessment', () => {
    it('returns assessment object from root selector', () => {
      testSimpleAppSelector(appKeys.assessment);
    });
  });
  describe('formFields', () => {
    it('returns formFields object from root selector', () => {
      testSimpleAppSelector(appKeys.formFields);
    });
  });
  describe('criterionFeedback', () => {
    beforeEach(() => {
      selector = selectors.criterionFeedback;
    });
    it('returns criterion feedback if it exists', () => {
      expect(selector(testState, 0))
        .toEqual(testState.app.formFields.criteria[0].feedback);
    });
    it('returns undefined if criterion does not exist', () => {
      expect(selector(testState, 4)).toEqual(undefined);
    });
  });
  describe('criterionOption', () => {
    beforeEach(() => {
      selector = selectors.criterionOption;
    });
    it('returns criterion option if it exists', () => {
      expect(selector(testState, 0))
        .toEqual(testState.app.formFields.criteria[0].selectedOption);
    });
    it('returns undefined if criterion does not exist', () => {
      expect(selector(testState, 4)).toEqual(undefined);
    });
  });
  describe('hasSubmitted', () => {
    it('returns hasSubmitted from root selector', () => {
      testSimpleAppSelector(appKeys.hasSubmitted);
    });
  });
  describe('overallFeedback', () => {
    it('returns overallFeedback from formFields', () => {
      selector = selectors.overallFeedback;
      expect(selector(testState)).toEqual(testState.app.formFields.overallFeedback);
    });
  });
  describe('response', () => {
    it('returns the response from the root selector', () => {
      testSimpleAppSelector(appKeys.response);
    });
  });
  describe('showTrainingError', () => {
    beforeEach(() => {
      selector = selectors.showTrainingError;
    });
    it('is memoized based on the assessment', () => {
      expect(selector.dependencies).toEqual([selectors.assessment]);
    });
    it('returns showTrainingError from the assessment if there is one', () => {
      expect(selector.resultFunc(testState.app.assessment)).toEqual(testState.app.assessment.showTrainingError);
    });
    it('returns undefined if there is no assessment', () => {
      expect(selector.resultFunc(null)).toEqual(undefined);
    });
  });
  describe('showValidation', () => {
    it('returns showValidation from the root selector', () => {
      testSimpleAppSelector(appKeys.showValidation);
    });
  });
  describe('submittedAssessment', () => {
    it('returns submittedAssessment from assessment selector', () => {
      selector = selectors.submittedAssessment;
      expect(selector.dependencies).toEqual([selectors.assessment]);
      expect(selector.resultFunc(testState.app.assessment))
        .toEqual(testState.app.assessment.submittedAssessment);
    });
  });
  describe('testDataPath', () => {
    it('returns testDataPath from root selector', () => {
      testSimpleAppSelector(appKeys.testDataPath);
    });
  });
  describe('testDirty', () => {
    it('returns testDirty from root selector', () => {
      testSimpleAppSelector(appKeys.testDirty);
    });
  });
  describe('testProgressKey', () => {
    it('returns testProgressKey from root selector', () => {
      testSimpleAppSelector(appKeys.testProgressKey);
    });
  });
});
