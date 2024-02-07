import { shallow } from '@edx/react-unit-test-utils';

import ActionButton from './ActionButton';

describe('<ActionButton />', () => {
  const props = {
    state: 'arbitraryState',
  };

  it('render empty when no onClick or href', () => {
    const wrapper = shallow(<ActionButton {...props} />);
    expect(wrapper.isEmptyRender()).toBe(true);
  });

  it('render StatefulButton when state is provided', () => {
    const wrapper = shallow(<ActionButton href="some-href" state="loading" />);
    expect(wrapper.snapshot).toMatchSnapshot();
    expect(wrapper.instance.findByType('StatefulButton')).toHaveLength(1);
    expect(wrapper.instance.findByType('Button')).toHaveLength(0);
  });

  it('render Button when state is not provided', () => {
    const wrapper = shallow(<ActionButton onClick={jest.fn().mockName('onClick')} />);
    expect(wrapper.snapshot).toMatchSnapshot();
    expect(wrapper.instance.findByType('StatefulButton')).toHaveLength(0);
    expect(wrapper.instance.findByType('Button')).toHaveLength(1);
  });
});
