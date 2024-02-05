import { shallow } from '@edx/react-unit-test-utils';

import CollapsibleAssessment from './CollapsibleAssessment';

describe('<CollapsibleAssessment />', () => {
  const defaultProps = {
    stepScore: {
      earned: 5,
      possible: 10,
    },
    stepLabel: 'Step Label',
    defaultOpen: true,
  };

  const renderComponent = (props = {}) => shallow(
    <CollapsibleAssessment {...props}>
      <div>Children</div>
    </CollapsibleAssessment>,
  );

  it('renders the component', () => {
    const wrapper = renderComponent(defaultProps);
    expect(wrapper.snapshot).toMatchSnapshot();

    expect(wrapper.instance.findByType('Collapsible')[0].props.open).toBe(true);
  });

  it('renders without props', () => {
    const wrapper = renderComponent();
    expect(wrapper.snapshot).toMatchSnapshot();

    expect(wrapper.instance.findByType('Collapsible')[0].props.open).toBe(
      false,
    );
  });
});
