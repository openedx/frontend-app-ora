import { shallow } from '@edx/react-unit-test-utils';
import FileUpload from '.';

import { useFileUploadHooks } from './hooks';

jest.mock('./hooks', () => ({
  useFileUploadHooks: jest.fn(),
}));

jest.mock('./UploadConfirmModal', () => 'UploadConfirmModal');
jest.mock('./ActionCell', () => 'ActionCell');

describe('<FileUpload />', () => {
  const props = {
    isReadOnly: false,
    uploadedFiles: [
      {
        fileName: 'file1',
        fileDescription: 'file1 desc',
        fileSize: 100,
      },
      {
        fileName: 'file2',
        fileDescription: 'file2 desc',
        fileSize: 200,
      },
    ],
    onFileUploaded: jest.fn().mockName('props.onFileUploaded'),
  };

  const mockHooks = (overrides) => {
    useFileUploadHooks.mockReturnValueOnce({
      isModalOpen: false,
      uploadArgs: {},
      confirmUpload: jest.fn().mockName('confirmUpload'),
      closeUploadModal: jest.fn().mockName('closeUploadModal'),
      onProcessUpload: jest.fn().mockName('onProcessUpload'),
      ...overrides,
    });
  };
  describe('behavior', () => {
    it('initializes data from hook', () => {
      mockHooks();
      shallow(<FileUpload {...props} />);
      expect(useFileUploadHooks).toHaveBeenCalledWith({ onFileUploaded: props.onFileUploaded });
    });
  });
  describe('render', () => {
    // TODO: examine files in the table
    // TODO: examine dropzone args
    test('default', () => {
      mockHooks();
      const wrapper = shallow(<FileUpload {...props} />);
      expect(wrapper.snapshot).toMatchSnapshot();
      expect(wrapper.instance.findByType('Dropzone')).toHaveLength(1);
      expect(wrapper.instance.findByType('DataTable')).toHaveLength(1);
    });

    test('read only', () => {
      mockHooks({ isReadOnly: true });
      const wrapper = shallow(<FileUpload {...props} isReadOnly />);
      expect(wrapper.snapshot).toMatchSnapshot();

      expect(wrapper.instance.findByType('Dropzone')).toHaveLength(0);
    });

    test('no uploaded files', () => {
      mockHooks();
      const wrapper = shallow(<FileUpload {...props} uploadedFiles={[]} />);
      expect(wrapper.snapshot).toMatchSnapshot();

      expect(wrapper.instance.findByType('DataTable')).toHaveLength(0);
    });
  });
});
