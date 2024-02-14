import { shallow } from '@edx/react-unit-test-utils';

import { useUploadConfirmModalHooks } from './hooks';

import UploadConfirmModal from './UploadConfirmModal';

jest.mock('./hooks', () => ({
  useUploadConfirmModalHooks: jest.fn(),
}));

describe('<UploadConfirmModal />', () => {
  const props = {
    open: true,
    file: {
      name: 'file name',
    },
    closeHandler: jest.fn(),
    uploadHandler: jest.fn(),
  };

  useUploadConfirmModalHooks.mockReturnValue({
    shouldShowError: false,
    exitHandler: jest.fn().mockName('exitHandler'),
    confirmUploadClickHandler: jest.fn().mockName('confirmUploadClickHandler'),
    onFileDescriptionChange: jest.fn().mockName('onFileDescriptionChange'),
  });

  it('render upload confirm modal', () => {
    const wrapper = shallow(<UploadConfirmModal {...props} />);
    expect(wrapper.snapshot).toMatchSnapshot();

    expect(wrapper.instance.findByType('Form.Group')).toHaveLength(1);
  });

  it('render upload confirm modal with no file', () => {
    const wrapper = shallow(<UploadConfirmModal {...props} file={null} />);
    expect(wrapper.snapshot).toMatchSnapshot();

    expect(wrapper.instance.findByType('Form.Group')).toHaveLength(0);
  });
});
