import { shallow } from '@edx/react-unit-test-utils';

import fileSize from 'filesize';

import FileMetaDisplay from './FileMetaDisplay';

jest.mock('filesize');

describe('<FileMetaDisplay />', () => {
  const props = {
    name: 'name',
    description: 'description',
    size: 123456,
  };
  it('render file meta display', () => {
    fileSize.mockReturnValue('123 KB');
    const wrapper = shallow(<FileMetaDisplay {...props} />);
    expect(wrapper.snapshot).toMatchSnapshot();
  });

  it('render file meta display with no size', () => {
    const wrapper = shallow(<FileMetaDisplay {...props} size={null} />);
    expect(wrapper.snapshot).toMatchSnapshot();
  });
});
