import { shallow } from '@edx/react-unit-test-utils';
import UploadConfirmModal from './UploadConfirmModal';

import { useUploadConfirmModalHooks } from './hooks';

jest.mock('./hooks', () => ({
  useUploadConfirmModalHooks: jest.fn(),
}));

describe('<UploadConfirmModal />', () => {
  const props = {
    open: true,
    file: { name: 'file1' },
    closeHandler: jest.fn().mockName('closeHandler'),
    uploadHandler: jest.fn().mockName('uploadHandler'),
  };

  const mockHooks = (overrides) => {
    useUploadConfirmModalHooks.mockReturnValueOnce({
      shouldShowError: false,
      exitHandler: jest.fn().mockName('exitHandler'),
      confirmUploadClickHandler: jest.fn().mockName('confirmUploadClickHandler'),
      onFileDescriptionChange: jest.fn().mockName('onFileDescriptionChange'),
      ...overrides,
    });
  };
  describe('renders', () => {
    test('without error', () => {
      mockHooks(
        { errors: new Array(2) },
      );
      const wrapper = shallow(<UploadConfirmModal {...props} />);
      expect(wrapper.snapshot).toMatchSnapshot();

      expect(wrapper.instance.findByType('Form.Group').length).toBe(1);
      expect(wrapper.instance.findByType('Form.Control.Feedback').length).toBe(0);
    });

    test('with errors', () => {
      mockHooks({ shouldShowError: true });
      const wrapper = shallow(<UploadConfirmModal {...props} />);
      expect(wrapper.snapshot).toMatchSnapshot();

      expect(wrapper.instance.findByType('Form.Group').length).toBe(1);
      expect(wrapper.instance.findByType('Form.Control.Feedback').length).toBe(1);
    });
  });
});
