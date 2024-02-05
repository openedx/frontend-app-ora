import { shallow } from '@edx/react-unit-test-utils';

import TXTRenderer from './TXTRenderer';

jest.mock('./textHooks', () => ({
  useTextRendererData: jest.fn().mockReturnValue({ content: 'content' }),
}));

describe('<TXTRenderer />', () => {
  const props = {
    url: 'url',
    onError: jest.fn().mockName('onError'),
    onSuccess: jest.fn().mockName('onSuccess'),
  };

  it('renders default', () => {
    const wrapper = shallow(<TXTRenderer {...props} />);
    expect(wrapper.snapshot).toMatchSnapshot();
  });
});