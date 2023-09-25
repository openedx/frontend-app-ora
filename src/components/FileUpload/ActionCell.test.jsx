import { shallow } from '@edx/react-unit-test-utils';
import ActionCell from './ActionCell';

describe('<ActionCell />', () => {
  const props = {
    onDeletedFile: jest.fn(),
    disabled: false,
    row: {
      index: 0,
    },
  };
  it('renders', () => {
    const wrapper = shallow(<ActionCell {...props} />);
    expect(wrapper.snapshot).toMatchSnapshot();
  });
});
