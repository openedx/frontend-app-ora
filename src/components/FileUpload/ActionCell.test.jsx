import { shallow } from '@edx/react-unit-test-utils';
import ActionCell from './ActionCell';

describe('<ActionCell />', () => {
  it('renders', () => {
    const wrapper = shallow(<ActionCell />);
    expect(wrapper.snapshot).toMatchSnapshot();
  });
});
