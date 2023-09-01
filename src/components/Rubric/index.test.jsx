import React from 'react';
import { shallow } from '@edx/react-unit-test-utils';
import { when } from 'jest-when';

import { useRubricData } from './hooks';
import { Rubric } from '.';

jest.mock('./RubricFeedback', () => 'RubricFeedback');
jest.mock('./CriterionContainer', () => 'CriterionContainer');

jest.mock('./hooks', () => ({
  useRubricData: jest.fn(),
}));

describe('<Rubric />', () => {
  const mockRubricDataResponse = {
    criteria: [
      {
        name: 'criterion-1',
        optionsValue: 'option-1',
        optionsIsInvalid: false,
        optionsOnChange: jest.fn().mockName('optionsOnChange'),
        options: [
          {
            name: 'option-1',
            points: 1,
          },
          {
            name: 'option-2',
            points: 2,
          },
        ],
      },
      {
        name: 'criterion-2',
        optionsValue: 'option-1',
        optionsIsInvalid: false,
        optionsOnChange: jest.fn().mockName('optionsOnChange'),
        options: [
          {
            name: 'option-1',
            points: 1,
          },
          {
            name: 'option-2',
            points: 2,
          },
        ],
      },
    ],
    onSubmit: jest.fn().mockName('onSubmit'),
    overallFeedbackPrompt: 'overallFeedbackPrompt',
    overallFeedback: 'overallFeedback',
    overallFeedbackDisabled: true,
    onOverallFeedbackChange: jest.fn().mockName('onOverallFeedbackChange'),
    submitStatus: 'idle',
  };

  when(useRubricData).mockReturnValue(mockRubricDataResponse);

  describe('renders', () => {
    test('is grading', () => {
      const wrapper = shallow(<Rubric isGrading />);
      expect(wrapper.snapshot).toMatchSnapshot();
    });
    test('is not grading, no submit button or feedback get render', () => {
      const wrapper = shallow(<Rubric isGrading={false} />);
      expect(wrapper.snapshot).toMatchSnapshot();

      expect(wrapper.instance.findByType('RubricFeedback').length).toBe(0);
      expect(wrapper.instance.findByType('StatefulButton').length).toBe(0);
    });
  });

  describe('behavior', () => {
    const wrapper = shallow(<Rubric isGrading />);
    it('has CriterionContainer equal to the number of criteria', () => {
      expect(wrapper.instance.findByType('CriterionContainer').length).toBe(mockRubricDataResponse.criteria.length);
    });

    test('StatefulButton onClick calls onSubmit', () => {
      expect(mockRubricDataResponse.onSubmit).not.toHaveBeenCalled();
      wrapper.instance.findByType('StatefulButton')[0].props.onClick();
      expect(mockRubricDataResponse.onSubmit).toHaveBeenCalled();
    });
  });
});
