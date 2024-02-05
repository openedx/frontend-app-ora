import { shallow } from '@edx/react-unit-test-utils';

import ReviewCriterion from './ReviewCriterion';

describe('<ReviewCriterion />', () => {
  const criterion = {
    options: [
      {
        name: 'option1',
        label: 'Option 1',
        points: 1,
      },
      {
        name: 'option2',
        label: 'Option 2',
        points: 2,
      },
    ],
  };

  it('renders correctly', () => {
    const wrapper = shallow(<ReviewCriterion criterion={criterion} />);
    expect(wrapper.snapshot).toMatchSnapshot();

    expect(wrapper.instance.findByType('Form.Label').length).toBe(2);
  });

  it('renders correctly with no options', () => {
    const wrapper = shallow(<ReviewCriterion criterion={{ options: [] }} />);
    expect(wrapper.snapshot).toMatchSnapshot();

    expect(wrapper.instance.findByType('Form.Label').length).toBe(0);
  });
});