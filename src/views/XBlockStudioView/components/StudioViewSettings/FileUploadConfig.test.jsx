import { shallow } from '@edx/react-unit-test-utils';

import { useFileUploadConfig } from 'hooks/app';

import FileUploadConfig from './FileUploadConfig';

jest.mock('hooks/app', () => ({
  useFileUploadConfig: jest.fn(),
}));
jest.mock('./RequiredConfig', () => 'RequiredConfig');

describe('<FileUploadConfig />', () => {
  it('should render', () => {
    useFileUploadConfig.mockReturnValue({
      enabled: true,
      fileUploadLimit: 10,
      required: true,
    });

    const wrapper = shallow(<FileUploadConfig />);
    expect(wrapper.snapshot).toMatchSnapshot();
  });

  it('should not render', () => {
    useFileUploadConfig.mockReturnValue({
      enabled: false,
    });

    const wrapper = shallow(<FileUploadConfig />);
    expect(wrapper.snapshot).toMatchSnapshot();

    expect(wrapper.isEmptyRender()).toBe(true);
  });
});
