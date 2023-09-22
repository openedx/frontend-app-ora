import { shallow } from '@edx/react-unit-test-utils';
import UploadConfirmModal from './UploadConfirmModal';

import { useUploadConfirmModalHooks } from './hooks';

jest.mock('./hooks', () => ({
  useUploadConfirmModalHooks: jest.fn(),
}));

describe('<UploadConfirmModal />', () => {
  const props = {
    open: true,
    files: [],
    closeHandler: jest.fn().mockName('closeHandler'),
    uploadHandler: jest.fn().mockName('uploadHandler'),
  };

  const mockHooks = (overrides) => {
    useUploadConfirmModalHooks.mockReturnValueOnce({
      errors: [],
      exitHandler: jest.fn().mockName('exitHandler'),
      confirmUploadClickHandler: jest.fn().mockName('confirmUploadClickHandler'),
      onFileDescriptionChange: () => jest.fn().mockName('onFileDescriptionChange'),
      ...overrides,
    });
  };
  describe('renders', () => {
    test('no files', () => {
      mockHooks();
      const wrapper = shallow(<UploadConfirmModal {...props} />);
      expect(wrapper.snapshot).toMatchSnapshot();

      expect(wrapper.instance.findByType('Form.Group').length).toBe(0);
    });

    test('multiple files', () => {
      mockHooks(
        { errors: new Array(2) },
      );
      const wrapper = shallow(<UploadConfirmModal {...props} files={[{ name: 'file1' }, { name: 'file2' }]} />);
      expect(wrapper.snapshot).toMatchSnapshot();

      expect(wrapper.instance.findByType('Form.Group').length).toBe(2);
      expect(wrapper.instance.findByType('Form.Control.Feedback').length).toBe(0);
    });

    test('with errors', () => {
      mockHooks({ errors: [true, false] });
      const wrapper = shallow(<UploadConfirmModal {...props} files={[{ name: 'file1' }, { name: 'file2' }]} />);
      // wrapper.setState({ errors: [true, false] });
      expect(wrapper.snapshot).toMatchSnapshot();

      expect(wrapper.instance.findByType('Form.Group').length).toBe(2);
      expect(wrapper.instance.findByType('Form.Control.Feedback').length).toBe(1);
    });
  });
});
