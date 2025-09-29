import React from 'react';
import {
  useUploadConfirmModalHooks,
  useFileDownloadHooks,
  useFileUploadHooks,
} from './hooks';

jest.mock('hooks/app', () => ({
  useDownloadFiles: jest.fn(() => ({
    mutate: () => 'download-result',
    status: 'anything',
  })),
}));

describe('File Upload hooks', () => {
  describe('useUploadConfirmModalHooks', () => {
    const props = {
      file: { fileName: 'file.pdf', fileUrl: 'http://example.com' },
      closeHandler: jest.fn(),
      uploadHandler: jest.fn(),
    };

    let setStateSpy;
    const setValue = jest.fn();

    beforeEach(() => {
      setStateSpy = jest.spyOn(React, 'useState').mockImplementation((value) => [value, setValue]);
    });

    afterEach(() => {
      setStateSpy.mockRestore();
      jest.clearAllMocks();
    });

    it('start with initial state', () => {
      useUploadConfirmModalHooks(props);
      expect(setStateSpy).toHaveBeenCalledWith(''); // description
      expect(setStateSpy).toHaveBeenCalledWith(false); // shouldShowError
    });

    it('confirm upload with description', () => {
      setStateSpy.mockImplementation(() => ['description', setValue]);
      const out = useUploadConfirmModalHooks(props);
      out.confirmUploadClickHandler();
      expect(props.uploadHandler).toBeCalledWith(props.file, 'description');
    });

    it('confirm upload without description', () => {
      setStateSpy.mockImplementation(() => ['', setValue]);
      const out = useUploadConfirmModalHooks(props);
      out.confirmUploadClickHandler();
      expect(setValue).toHaveBeenCalledWith(true); // shouldShowError
    });

    it('exit handler', () => {
      const out = useUploadConfirmModalHooks(props);
      out.exitHandler();
      expect(setValue).toHaveBeenCalledWith(false); // shouldShowError
      expect(setValue).toHaveBeenCalledWith(''); // description
      expect(props.closeHandler).toBeCalled();
    });

    it('on file description change', () => {
      const out = useUploadConfirmModalHooks(props);
      out.onFileDescriptionChange({ target: { value: 'new description' } });
      expect(setValue).toHaveBeenCalledWith('new description'); // description
    });
  });

  describe('useFileUploadHooks', () => {
    const props = {
      onFileUploaded: jest.fn(),
    };
    let setStateSpy;
    const setValue = jest.fn();

    beforeEach(() => {
      setStateSpy = jest.spyOn(React, 'useState').mockImplementation((value) => [value, setValue]);
    });

    afterEach(() => {
      setStateSpy.mockRestore();
      jest.clearAllMocks();
    });

    it('start with initial state', () => {
      useFileUploadHooks(props);
      expect(setStateSpy).toHaveBeenCalledWith({}); // uploadArgs
      expect(setStateSpy).toHaveBeenCalledWith(false); // isModalOpen
    });

    it('confirm upload', () => {
      const out = useFileUploadHooks(props);
      out.confirmUpload.useCallback.cb();
      expect(setValue).toHaveBeenCalledWith(false); // isModalOpen
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
