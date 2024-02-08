import { shallow } from '@edx/react-unit-test-utils';

import FormatDateTime from './FormatDateTime';

describe('<FormatDateTime />', () => {
  it('should render', () => {
    const wrapper = shallow(<FormatDateTime />);
    expect(wrapper.snapshot).toMatchSnapshot();
  });

  it('should render with date', () => {
    const wrapper = shallow(<FormatDateTime date="2020-01-01T00:00:00Z" />);
    expect(wrapper.snapshot).toMatchSnapshot();
  });
});
