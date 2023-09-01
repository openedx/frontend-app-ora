import React from 'react';
import { shallow } from '@edx/react-unit-test-utils';

import ReviewCriterion from './ReviewCriterion';

describe('<ReviewCriterion />', () => {
  const props = {
    criterion: {
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

  test('renders', () => {
    const wrapper = shallow(<ReviewCriterion {...props} />);
    expect(wrapper.snapshot).toMatchSnapshot();
    expect(wrapper.instance.findByType('FormControlFeedback').length).toEqual(props.criterion.options.length);
  });
});
