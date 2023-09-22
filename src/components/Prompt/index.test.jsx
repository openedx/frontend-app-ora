import { shallow } from '@edx/react-unit-test-utils';
import Prompt from '.';

import usePromptHooks from './hooks';

jest.mock('./hooks', () => jest.fn());

describe('<Prompt />', () => {
  const props = {
    prompt: '<p>prompt</p>',
  };
  const mockHooks = (overrides) => {
    usePromptHooks.mockReturnValueOnce({
      open: true,
      toggleOpen: jest.fn().mockName('toggleOpen'),
      ...overrides,
    });
  };
  it('renders', () => {
    mockHooks();
    const wrapper = shallow(<Prompt {...props} />);
    expect(wrapper.snapshot).toMatchSnapshot();

    expect(wrapper.instance.findByType('Collapsible')[0].props.title).toEqual('');
  });

  it('renders closed', () => {
    mockHooks({ open: false });
    const wrapper = shallow(<Prompt {...props} />);
    expect(wrapper.snapshot).toMatchSnapshot();

    expect(wrapper.instance.findByType('Collapsible')[0].props.title).not.toEqual('');
  });
});
