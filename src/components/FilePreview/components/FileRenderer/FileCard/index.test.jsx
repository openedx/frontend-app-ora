import { shallow } from '@edx/react-unit-test-utils';

import FileCard from './index';

describe('<FileCard />', () => {
  const props = {
    file: {
      fileName: 'fileName',
    },
    children: <div>children</div>,
    defaultOpen: true,
  };

  it('renders default', () => {
    const wrapper = shallow(<FileCard {...props} />);
    expect(wrapper.snapshot).toMatchSnapshot();

    expect(wrapper.instance.findByType('Collapsible')).toHaveLength(1);
  });
});
