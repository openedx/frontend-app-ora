import { mockUseKeyedState } from '@edx/react-unit-test-utils';

import {
  useUploadConfirmModalHooks,
  useFileDownloadHooks,
  useFileUploadHooks,
  stateKeys,
} from './hooks';

jest.mock('hooks/app', () => ({
  useDownloadFiles: jest.fn(() => ({
    mutate: () => 'download-result',
    status: 'anything',
  })),
}));

const state = mockUseKeyedState(stateKeys);

describe('File Upload hooks', () => {
  describe('useUploadConfirmModalHooks', () => {
    const props = {
      file: { fileName: 'file.pdf', fileUrl: 'http://example.com' },
      closeHandler: jest.fn(),
      uploadHandler: jest.fn(),
    };
    beforeEach(() => {
      jest.clearAllMocks();
      state.mock();
    });
    afterEach(() => {
      state.resetVals();
    });

    it('start with initial state', () => {
      useUploadConfirmModalHooks(props);
      state.expectInitializedWith(stateKeys.description, '');
      state.expectInitializedWith(stateKeys.shouldShowError, false);
    });

    it('confirm upload with description', () => {
      state.mockVal(stateKeys.description, 'description');
      const out = useUploadConfirmModalHooks(props);
      out.confirmUploadClickHandler();
      expect(props.uploadHandler).toBeCalledWith(props.file, 'description');
    });

    it('confirm upload without description', () => {
      state.mockVal(stateKeys.description, '');
      const out = useUploadConfirmModalHooks(props);
      out.confirmUploadClickHandler();
      state.expectSetStateCalledWith(stateKeys.shouldShowError, true);
    });

    it('exit handler', () => {
      const out = useUploadConfirmModalHooks(props);
      out.exitHandler();
      state.expectSetStateCalledWith(stateKeys.shouldShowError, false);
      state.expectSetStateCalledWith(stateKeys.description, '');
      expect(props.closeHandler).toBeCalled();
    });

    it('on file description change', () => {
      const out = useUploadConfirmModalHooks(props);
      out.onFileDescriptionChange({ target: { value: 'new description' } });
      state.expectSetStateCalledWith(stateKeys.description, 'new description');
    });
  });

  describe('useFileUploadHooks', () => {
    const props = {
      onFileUploaded: jest.fn(),
    };
    beforeEach(() => {
      jest.clearAllMocks();
      state.mock();
    });
    afterEach(() => {
      state.resetVals();
    });

    it('start with initial state', () => {
      useFileUploadHooks(props);
      state.expectInitializedWith(stateKeys.uploadArgs, {});
      state.expectInitializedWith(stateKeys.isModalOpen, false);
    });

    it('confirm upload', () => {
      const out = useFileUploadHooks(props);
      out.confirmUpload.useCallback.cb();
      state.expectSetStateCalledWith(stateKeys.isModalOpen, false);
    });
  });

  describe('useFileDownloadHooks', () => {
    const props = {
      file: { fileName: 'file.pdf', fileUrl: 'http://example.com' },
      zipFileName: 'zipFileName',
    };

    it('status from mutation', () => {
      const out = useFileDownloadHooks(props);
      out.status = 'anything';
    });

    it('download files', () => {
      const out = useFileDownloadHooks(props);
      expect(out.downloadFiles()).toBe('download-result');
    });
  });
});
