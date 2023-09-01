import {
  usePageData,
  useRubricConfig,
} from 'data/services/lms/hooks/selectors';
import { mockUseKeyedState } from '@edx/react-unit-test-utils';
import { submitRubric } from 'data/services/lms/hooks/actions';
import { useRubricData, stateKeys } from './hooks';
import { RubricData } from 'data/services/lms/types';

import { when } from 'jest-when';

jest.mock('data/services/lms/hooks/selectors', () => ({
  usePageData: jest.fn(),
  useRubricConfig: jest.fn(),
}));

jest.mock('data/services/lms/hooks/actions', () => ({
  submitRubric: jest.fn(),
}));

const state = mockUseKeyedState(stateKeys);

describe('useRubricData', () => {
  const mutateFn = jest.fn();

  const mockRubricData: RubricData = {
    optionsSelected: {
      'criterion-1': 'option-1',
      'criterion-2': 'option-2',
    },
    criterionFeedback: {
      'criterion-1': 'feedback-1',
      'criterion-2': 'feedback-2',
    },
    overallFeedback: 'overall-feedback',
  };

  when(usePageData).mockReturnValue({
    rubric: mockRubricData,
  });

  when(useRubricConfig).mockReturnValue({
    criteria: [
      {
        name: 'criterion-1',
        options: [
          { label: 'Option 1', value: 'option-1' },
          { label: 'Option 2', value: 'option-2' },
        ],
      },
      {
        name: 'criterion-2',
        options: [
          { label: 'Option 1', value: 'option-1' },
          { label: 'Option 2', value: 'option-2' },
        ],
      },
    ],
    feedbackConfig: {
      enabled: true,
    },
  } as any);

  when(submitRubric).mockReturnValue({
    mutate: mutateFn,
  } as any);

  describe('state keys', () => {
    beforeEach(() => {
      state.mock();
    });
    afterEach(() => {
      state.resetVals();
    });

    it('initializes state values from page data', () => {
      useRubricData({ isGrading: true });
      state.expectInitializedWith(stateKeys.rubric, mockRubricData);
      state.expectInitializedWith(
        stateKeys.overallFeedback,
        mockRubricData.overallFeedback
      );
    });
    it('returns the correct getter/setter for state', () => {
      const out = useRubricData({ isGrading: true });
      expect(out.rubricData).toEqual(mockRubricData);

      out.setRubricData('foo' as any);
      expect(state.values[stateKeys.rubric]).toEqual('foo');
      expect(out.overallFeedback).toEqual(mockRubricData.overallFeedback);
      out.onOverallFeedbackChange({
        target: {
          value: 'bar',
        },
      } as any);
      expect(state.values[stateKeys.overallFeedback]).toEqual('bar');
    });
  });

  it('should return the correct data', () => {
    const { rubricData, criteria } = useRubricData({ isGrading: true });

    expect(rubricData).toEqual(mockRubricData);

    expect(criteria).toEqual([
      {
        name: 'criterion-1',
        options: [
          { label: 'Option 1', value: 'option-1' },
          { label: 'Option 2', value: 'option-2' },
        ],
        optionsValue: 'option-1',
        optionsIsInvalid: false,
        optionsOnChange: expect.any(Function),
        feedbackValue: 'feedback-1',
        feedbackIsInvalid: false,
        feedbackOnChange: expect.any(Function),
      },
      {
        name: 'criterion-2',
        options: [
          { label: 'Option 1', value: 'option-1' },
          { label: 'Option 2', value: 'option-2' },
        ],
        optionsValue: 'option-2',
        optionsIsInvalid: false,
        optionsOnChange: expect.any(Function),
        feedbackValue: 'feedback-2',
        feedbackIsInvalid: false,
        feedbackOnChange: expect.any(Function),
      },
    ]);
  });
});
