import { shallow } from '@edx/react-unit-test-utils';

import StatusRow from './index';

jest.mock('./StatusBadge', () => 'StatusBadge');
jest.mock('./DueDateMessage', () => 'DueDateMessage');

describe('<StatusRow />', () => {
  it('renders StatusBadge and DueDateMessage', () => {
    const wrapper = shallow(<StatusRow />);
    expect(wrapper.snapshot).toMatchSnapshot();
    expect(wrapper.instance.findByType('StatusBadge')).toHaveLength(1);
    expect(wrapper.instance.findByType('DueDateMessage')).toHaveLength(1);
  });
});
