import { shallow } from '@edx/react-unit-test-utils';

import CollapsibleAssessment from './CollapsibleAssessment';

describe('<CollapsibleAssessment />', () => {
  let props = {
    children: <div>Children</div>,
    stepScore: {
      earned: 5,
      possible: 10,
    },
    stepLabel: 'Step Label',
    defaultOpen: true,
  };

  it('renders the component', () => {
    const wrapper = shallow(<CollapsibleAssessment {...props} />);
    expect(wrapper.snapshot).toMatchSnapshot();

    expect(wrapper.instance.findByType('Collapsible')[0].props.open).toBe(true);
  });

  it('renders without props', () => {
    const wrapper = shallow(<CollapsibleAssessment children={props.children} />);
    expect(wrapper.snapshot).toMatchSnapshot();

    expect(wrapper.instance.findByType('Collapsible')[0].props.open).toBe(false);
  });
});