import React from 'react';
import { shallow } from '@edx/react-unit-test-utils';

import CriterionContainer from '.';

jest.mock('./RadioCriterion', () => 'RadioCriterion');
jest.mock('./CriterionFeedback', () => 'CriterionFeedback');
jest.mock('./ReviewCriterion', () => 'ReviewCriterion');

describe('<CriterionContainer />', () => {
  const props = {
    isGrading: true,
    criterion: {
      name: 'criterion-1',
      description: 'description-1',
      options: [
        {
          name: 'option-1',
          description: 'description-1',
          points: 1,
        },
        {
          name: 'option-2',
          description: 'description-2',
          points: 2,
        },
      ],
    },
  };
  describe('renders', () => {
    test('is grading', () => {
      const wrapper = shallow(<CriterionContainer {...props} />);
      expect(wrapper.snapshot).toMatchSnapshot();

      expect(wrapper.instance.findByType('RadioCriterion')).toHaveLength(1);
      expect(wrapper.instance.findByType('ReviewCriterion')).toHaveLength(0);
      expect(wrapper.instance.findByType('CriterionFeedback')).toHaveLength(1);
    });

    test('is not grading', () => {
      const wrapper = shallow(<CriterionContainer {...props} isGrading={false} />);
      expect(wrapper.snapshot).toMatchSnapshot();

      expect(wrapper.instance.findByType('RadioCriterion')).toHaveLength(0);
      expect(wrapper.instance.findByType('ReviewCriterion')).toHaveLength(1);
      expect(wrapper.instance.findByType('CriterionFeedback')).toHaveLength(0);
    });
  });
});
