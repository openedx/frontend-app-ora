import { shallow } from '@edx/react-unit-test-utils';

import { useRenderData } from './hooks';
import { FileRenderer } from './index';

jest.mock('./Banners', () => ({
  ErrorBanner: () => 'ErrorBanner',
  LoadingBanner: () => 'LoadingBanner',
}));

jest.mock('./hooks', () => ({
  useRenderData: jest.fn(),
}));

describe('FileRenderer Component', () => {
  const props = {
    file: {
      fileName: 'some_file',
      fileUrl: 'some_url',
    },
    defaultOpen: true,
  };

  const defaultRenderData = {
    Renderer: () => 'Renderer',
    isLoading: false,
    errorStatus: false,
    error: null,
    rendererProps: {
      abc: 123,
    },
  };

  it('render default', () => {
    useRenderData.mockReturnValue(defaultRenderData);
    const wrapper = shallow(<FileRenderer {...props} />);
    expect(wrapper.snapshot).toMatchSnapshot();

    expect(wrapper.instance.findByType('Renderer')).toHaveLength(1);
    expect(wrapper.instance.findByType('LoadingBanner')).toHaveLength(0);
    expect(wrapper.instance.findByType('ErrorBanner')).toHaveLength(0);
  });

  it('render loading banner', () => {
    useRenderData.mockReturnValue({ ...defaultRenderData, isLoading: true });
    const wrapper = shallow(<FileRenderer {...props} />);
    expect(wrapper.snapshot).toMatchSnapshot();

    expect(wrapper.instance.findByType('LoadingBanner')).toHaveLength(1);
    expect(wrapper.instance.findByType('ErrorBanner')).toHaveLength(0);
    expect(wrapper.instance.findByType('Renderer')).toHaveLength(0);
  });

  it('render error banner', () => {
    useRenderData.mockReturnValue({ errorStatus: true, error: { message: 'some_error' } });
    const wrapper = shallow(<FileRenderer {...props} />);
    expect(wrapper.snapshot).toMatchSnapshot();

    expect(wrapper.instance.findByType('ErrorBanner')).toHaveLength(1);
    expect(wrapper.instance.findByType('LoadingBanner')).toHaveLength(0);
  });
});
