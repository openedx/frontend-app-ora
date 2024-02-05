import { shallow } from '@edx/react-unit-test-utils';

import ConfirmDialog from './index';

describe('<ConfirmDialog />', () => {
  const props = {
    title: 'Title',
    description: 'Description',
    action: {
      onClick: jest.fn().mockName('onClick'),
    },
    isOpen: true,
    close: jest.fn().mockName('close'),
  };
  it('renders correctly', () => {
    const wrapper = shallow(<ConfirmDialog {...props} />);
    expect(wrapper.snapshot).toMatchSnapshot();
  });
});
