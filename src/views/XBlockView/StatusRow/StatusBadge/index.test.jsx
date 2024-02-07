import { shallow } from '@edx/react-unit-test-utils';

import StatusBadge from './index';

jest.mock('./useBadgeConfig', () => () => ({
  variant: 'variant',
  message: {
    id: 'message',
    defaultMessage: 'defaultMessage',
  },
}));

describe('StatusBadge', () => {
  it('renders', () => {
    const wrapper = shallow(<StatusBadge />);
    expect(wrapper.snapshot).toMatchSnapshot();
  });
});
