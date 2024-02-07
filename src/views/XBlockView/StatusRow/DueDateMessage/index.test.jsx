import { shallow } from '@edx/react-unit-test-utils';

import useDueDateMessage from './useDueDateMessage';

import DueDateMessage from './index';

jest.mock('./useDueDateMessage');

describe('<DueDateMessage />', () => {
  it('should render the due date message', () => {
    useDueDateMessage.mockReturnValue('Due in 1 day');
    const wrapper = shallow(<DueDateMessage />);
    expect(wrapper.snapshot).toMatchSnapshot();
  });
});
