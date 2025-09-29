import React from 'react';
import { renderHook } from '@testing-library/react';
import {
  useResponseData,
  useUploadFiles,
  useDeleteFile,
} from 'hooks/app';

import useUploadedFilesData from './useUploadedFilesData';

jest.mock('hooks/app', () => ({
  useResponseData: jest.fn(),
  useUploadFiles: jest.fn(),
  useDeleteFile: jest.fn(),
}));

jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useState: jest.fn(),
}));

describe('useUploadedFilesData', () => {
  const mockUploadFilesMutation = jest.fn();
  const mockDeleteFileMutation = jest.fn();

  let setStateSpy;
  const setValue = jest.fn();

  beforeEach(() => {
    setStateSpy = jest.spyOn(React, 'useState').mockImplementation((value) => [value, setValue]);
    useUploadFiles.mockReturnValue({ mutateAsync: mockUploadFilesMutation });
    useDeleteFile.mockReturnValue({ mutateAsync: mockDeleteFileMutation });
  });

  afterEach(() => {
    setStateSpy.mockRestore();
    jest.clearAllMocks();
  });

  it('initializes uploadedFiles state to empty array if response is null', () => {
    useResponseData.mockReturnValue();
    renderHook(() => useUploadedFilesData());
    expect(setStateSpy).toHaveBeenCalledWith([]); // value initial state
  });

  it('initializes uploadedFiles state to response.uploadedFiles', () => {
    useResponseData.mockReturnValue({ uploadedFiles: ['file1', 'file2'] });
    renderHook(() => useUploadedFilesData());
    expect(setStateSpy).toHaveBeenCalledWith(['file1', 'file2']); // value initial state
  });

  it('return correct mutation function', () => {
    useResponseData.mockReturnValue({ uploadedFiles: [] });
    const { result } = renderHook(() => useUploadedFilesData());
    const { onFileUploaded, onDeletedFile } = result.current;
    expect(onFileUploaded).toBe(mockUploadFilesMutation);
    expect(onDeletedFile).toBe(mockDeleteFileMutation);
  });
});
