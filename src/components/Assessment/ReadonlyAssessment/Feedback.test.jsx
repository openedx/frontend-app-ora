import { shallow } from '@edx/react-unit-test-utils';

import Feedback from './Feedback';

jest.mock('components/InfoPopover', () => 'InfoPopover');

describe('<Feedback />', () => {
  let props = {
    criterionDescription: 'Criterion Description',
    selectedOption: 'Selected Option',
    selectedPoints: 5,
    commentHeader: 'Comment Header',
    criterionName: 'Criterion Name',
    commentBody: 'Comment Body',
  }

  it('renders the component', () => {
    const wrapper = shallow(<Feedback {...props} />);
    expect(wrapper.snapshot).toMatchSnapshot();

    expect(wrapper.instance.findByType('Collapsible.Advanced').length).toBe(1);
  });

  it('render without props', () => {
    const wrapper = shallow(<Feedback criterionName='' commentBody='' />);
    expect(wrapper.snapshot).toMatchSnapshot();

    expect(wrapper.instance.findByType('Collapsible.Advanced').length).toBe(0);
  });

  it('renders without selectedOption', () => {
    const wrapper = shallow(<Feedback {...props} selectedOption={null} />);
    expect(wrapper.snapshot).toMatchSnapshot();
  });

  it('renders without criterionDescription', () => {
    const wrapper = shallow(<Feedback {...props} criterionDescription={null} />);
    expect(wrapper.snapshot).toMatchSnapshot();
  });

  it('renders without commentBody', () => {
    const wrapper = shallow(<Feedback {...props} commentBody='' />);
    expect(wrapper.snapshot).toMatchSnapshot();
  });
}); 