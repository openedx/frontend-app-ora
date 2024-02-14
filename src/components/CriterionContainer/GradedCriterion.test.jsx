import { shallow } from '@edx/react-unit-test-utils';

import GradedCriterion from './GradedCriterion';

describe('<GradedCriterion />', () => {
  const props = {
    selectedOption: {
      name: 'option1',
      label: 'Option 1',
      points: 1,
    },
    feedbackValue: 'Feedback',
  };

  it('renders correctly', () => {
    const wrapper = shallow(<GradedCriterion {...props} />);
    expect(wrapper.snapshot).toMatchSnapshot();
  });

  it('renders correctly with no feedback', () => {
    const wrapper = shallow(<GradedCriterion selectedOption={props.selectedOption} />);
    expect(wrapper.snapshot).toMatchSnapshot();
  });
});
