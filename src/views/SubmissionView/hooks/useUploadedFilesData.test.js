import { mockUseKeyedState } from '@edx/react-unit-test-utils';

import {
  useResponseData,
  useUploadFiles,
  useDeleteFile,
} from 'hooks/app';

import useUploadedFilesData, { stateKeys } from './useUploadedFilesData';

jest.mock('hooks/app', () => ({
  useResponseData: jest.fn(),
  useUploadFiles: jest.fn(),
  useDeleteFile: jest.fn(),
}));

const state = mockUseKeyedState(stateKeys);

describe('useUploadedFilesData', () => {
  const mockUploadFilesMutation = jest.fn();
  const mockDeleteFileMutation = jest.fn();
  useUploadFiles.mockReturnValue({ mutateAsync: mockUploadFilesMutation });
  useDeleteFile.mockReturnValue({ mutateAsync: mockDeleteFileMutation });

  beforeEach(() => {
    jest.clearAllMocks();
    state.mock();
  });
  afterEach(() => { state.resetVals(); });

  it('initializes uploadedFiles state to empty array if response is null', () => {
    useResponseData.mockReturnValue();
    useUploadedFilesData();
    state.expectInitializedWith(stateKeys.uploadedFiles, []);
  });
  it('initializes uploadedFiles state to response.uploadedFiles', () => {
    useResponseData.mockReturnValue({ uploadedFiles: ['file1', 'file2'] });
    useUploadedFilesData();
    state.expectInitializedWith(stateKeys.uploadedFiles, ['file1', 'file2']);
  });
  it('return correct mutation function', () => {
    const { onFileUploaded, onDeletedFile } = useUploadedFilesData();
    expect(onFileUploaded).toBe(mockUploadFilesMutation);
    expect(onDeletedFile).toBe(mockDeleteFileMutation);
  });
});
