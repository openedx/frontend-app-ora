import { shallow } from '@edx/react-unit-test-utils';

import { useActiveStepName, useFileUploadConfig } from 'hooks/app';
import { useViewStep } from 'hooks/routing';
import { stepNames } from 'constants/index';

import { useFileUploadHooks } from './hooks';

import FileUpload, { createFileActionCell } from './index';

jest.mock('hooks/app', () => ({
  useActiveStepName: jest.fn(),
  useFileUploadConfig: jest.fn(),
}));
jest.mock('hooks/routing', () => ({
  useViewStep: jest.fn(),
}));
jest.mock('./hooks', () => ({
  useFileUploadHooks: jest.fn(),
}));
jest.mock('./UploadConfirmModal', () => 'UploadConfirmModal');
jest.mock('./ActionCell', () => 'ActionCell');
jest.mock('./FileDownload', () => 'FileDownload');
jest.mock('components/FilePreview', () => 'FilePreview');

describe('<FileUpload />', () => {
  const props = {
    isReadOnly: false,
    uploadedFiles: [
      {
        abc: 123,
        size: 123,
      },
      {
        def: 456,
        size: 'will be unknown',
      }
    ],
    onFileUploaded: jest.fn(),
    onDeletedFile: jest.fn(),
    defaultCollapsePreview: false,
    hideHeader: false,
  };

  const defaultFileUploadHooks = {
    confirmUpload: jest.fn().mockName('confirmUpload'),
    closeUploadModal: jest.fn().mockName('closeUploadModal'),
    isModalOpen: false,
    onProcessUpload: jest.fn().mockName('onProcessUpload'),
    uploadArgs: {
      abc: 123,
    },
  };

  const defaultUploadConfig = {
    enabled: true,
    fileUploadLimit: 10,
    allowedExtensions: ['pdf', 'jpg'],
    maxFileSize: 123456,
  };

  beforeEach(() => {
    useActiveStepName.mockReturnValue('someActiveStep');
    useViewStep.mockReturnValue('someStep');
    useFileUploadHooks.mockReturnValue(defaultFileUploadHooks);
    useFileUploadConfig.mockReturnValue(defaultUploadConfig);
  });

  it('render default', () => {
    const wrapper = shallow(<FileUpload {...props} />);
    expect(wrapper.snapshot).toMatchSnapshot();
  });


  it('render without header', () => {
    const wrapper = shallow(<FileUpload {...props} hideHeader />);
    expect(wrapper.snapshot).toMatchSnapshot();
  });

  it('render without file preview if uploadedFiles are empty and isReadOnly', () => {
    const wrapper = shallow(<FileUpload {...props} uploadedFiles={[]} isReadOnly />);
    expect(wrapper.snapshot).toMatchSnapshot();

    expect(wrapper.instance.findByType('FilePreview')).toHaveLength(0);
  });

  it('render without dropzone and confirm modal when isReadOnly', () => {
    const wrapper = shallow(<FileUpload {...props} isReadOnly />);
    expect(wrapper.snapshot).toMatchSnapshot();

    expect(wrapper.instance.findByType('UploadConfirmModal')).toHaveLength(0);
    expect(wrapper.instance.findByType('Dropzone')).toHaveLength(0);
  });

  it('render empty on studentTraining', () => {
    useViewStep.mockReturnValueOnce(stepNames.studentTraining);
    const wrapper = shallow(<FileUpload {...props} />);
    expect(wrapper.snapshot).toMatchSnapshot();
  });

  it('render empty when file upload is not enabled', () => {
    useFileUploadConfig.mockReturnValueOnce({ enabled: false });
    const wrapper = shallow(<FileUpload {...props} />);
    expect(wrapper.snapshot).toMatchSnapshot();
  });

  it('render extra columns when activeStepName is submission', () => {
    useActiveStepName.mockReturnValueOnce(stepNames.submission);
    const wrapper = shallow(<FileUpload {...props} />);
    expect(wrapper.snapshot).toMatchSnapshot();

    expect(wrapper.instance.findByType('DataTable')[0].props.columns).toHaveLength(4);
  });
});

describe('createFileActionCell', () => {
  it('should return a function that is an action cell', () => {
    const onDeletedFile = jest.fn();
    const isReadOnly = false;
    const FileActionCell = createFileActionCell({ onDeletedFile, isReadOnly });
    expect(typeof FileActionCell).toBe('function');

    const wrapper = shallow(<FileActionCell abc={123} />);
    expect(wrapper.snapshot).toMatchSnapshot();

    expect(wrapper.instance.findByType('ActionCell')).toHaveLength(1);
  });
});
