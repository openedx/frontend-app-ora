import { shallow } from '@edx/react-unit-test-utils';

import ImageRenderer from './ImageRenderer';

describe('<ImageRenderer />', () => {
  const props = {
    fileName: 'fileName',
    url: 'url',
    onError: jest.fn().mockName('onError'),
    onSuccess: jest.fn().mockName('onSuccess'),
  };

  it('renders default', () => {
    const wrapper = shallow(<ImageRenderer {...props} />);
    expect(wrapper.snapshot).toMatchSnapshot();
  });
});