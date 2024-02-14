import { shallow } from '@edx/react-unit-test-utils';

import LoadingBanner from './LoadingBanner';

describe('<LoadingBanner />', () => {
  it('renders correctly', () => {
    const wrapper = shallow(<LoadingBanner />);
    expect(wrapper.snapshot).toMatchSnapshot();
  });
});
