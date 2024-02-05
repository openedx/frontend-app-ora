import { shallow } from '@edx/react-unit-test-utils';

import { useResponse } from 'hooks/app';
import { isSupported } from './components';

import FilePreview from './index';

jest.mock('hooks/app', () => ({
  useResponse: jest.fn(),
}));

jest.mock('./components', () => ({
  FileRenderer: () => 'FileRenderer',
  isSupported: jest.fn(),
}));

describe('<FilePreview />', () => {
  const props = {
    defaultCollapsePreview: false,
  };
  it('renders nothing when no files are uploaded', () => {
    useResponse.mockReturnValueOnce({ uploadedFiles: null });
    const wrapper = shallow(<FilePreview {...props} />);
    expect(wrapper.snapshot).toMatchSnapshot();
    expect(wrapper.isEmptyRender()).toBe(true);
  });

  it('renders only div when no supported files are uploaded', () => {
    useResponse.mockReturnValueOnce({
      uploadedFiles: [{ fileName: 'file1.txt' }],
    });
    isSupported.mockReturnValueOnce(false);
    const wrapper = shallow(<FilePreview {...props} />);
    expect(wrapper.snapshot).toMatchSnapshot();

    expect(wrapper.instance.findByType('FileRenderer')).toHaveLength(0);
  });

  it('render only supported files', () => {
    isSupported
      .mockReturnValueOnce(false)
      .mockReturnValueOnce(true)
      .mockReturnValueOnce(true);

    useResponse.mockReturnValueOnce({
      uploadedFiles: [
        { fileName: 'file1.txt' },
        { fileName: 'file2.pdf' },
        { fileName: 'file3.jpg' },
      ],
    });
    const wrapper = shallow(<FilePreview {...props} />);
    expect(wrapper.snapshot).toMatchSnapshot();

    expect(wrapper.instance.findByType('FileRenderer')).toHaveLength(2);
  });
});
