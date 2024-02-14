import { shallow } from '@edx/react-unit-test-utils';

import RequiredConfig from './RequiredConfig';

describe('<RequiredConfig />', () => {
  it('render empty when required is undefined', () => {
    const wrapper = shallow(<RequiredConfig />);
    expect(wrapper.snapshot).toMatchSnapshot();
  });

  it('render required label when required is true', () => {
    const wrapper = shallow(<RequiredConfig required />);
    expect(wrapper.snapshot).toMatchSnapshot();
  });

  it('render optional label when required is false', () => {
    const wrapper = shallow(<RequiredConfig required={false} />);
    expect(wrapper.snapshot).toMatchSnapshot();
  });
});
