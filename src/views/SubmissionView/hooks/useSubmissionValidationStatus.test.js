import React from 'react';
import { useSubmissionConfig } from 'hooks/app';

import useSubmissionValidationStatus from './useSubmissionValidationStatus';

jest.mock('hooks/app', () => ({
  useResponseData: jest.fn(),
  useUploadFiles: jest.fn(),
  useDeleteFile: jest.fn(),

  useSubmissionConfig: jest.fn(),
  useTextResponses: jest.fn(),
}));

describe('useSubmissionValidationStatus', () => {
  useSubmissionConfig.mockReturnValue({
    textResponseConfig: { required: false },
    fileResponseConfig: { required: false },
  });

  let setStateSpy;
  const setValue = jest.fn();

  beforeEach(() => {
    setStateSpy = jest.spyOn(React, 'useState').mockImplementation((value) => [value, setValue]);
  });

  afterEach(() => {
    setStateSpy.mockRestore();
    jest.clearAllMocks();
  });

  it('initializes state for useSubmissionValidationStatus', () => {
    useSubmissionConfig.mockReturnValue();
    useSubmissionValidationStatus([], []);
    expect(setStateSpy).toHaveBeenCalledTimes(3);
    expect(setStateSpy).toHaveBeenCalledWith({});
    expect(setStateSpy).toHaveBeenNthCalledWith(2, false);
    expect(setStateSpy).toHaveBeenNthCalledWith(3, false);
  });

  it('validateBeforeConfirmation function returns true if prompts and file uploads are not required', () => {
    useSubmissionConfig.mockReturnValue({
      textResponseConfig: { required: false },
      fileResponseConfig: { required: false },
    });
    const { validateBeforeConfirmation } = useSubmissionValidationStatus([''], []);
    expect(validateBeforeConfirmation.useCallback.cb()).toBe(true);
    expect(setValue).toHaveBeenCalledWith(true);
  });

  it('validateBeforeConfirmation function returns false when requirement is not met', () => {
    useSubmissionConfig.mockReturnValue({
      textResponseConfig: { required: true },
      fileResponseConfig: { required: true },
    });
    const { validateBeforeConfirmation } = useSubmissionValidationStatus([''], []);
    validateBeforeConfirmation.useCallback.cb();
    expect(setValue).toHaveBeenCalledWith(true);
    expect(validateBeforeConfirmation.useCallback.cb()).toBe(false);
  });

  it('validateBeforeConfirmation function returns true when required requirement is met', () => {
    const validationStatusArgs = [['hello', 'hi'], ['blah']];
    const mockSubmissionConfigValue = {
      textResponseConfig: { required: true },
      fileResponseConfig: { required: true },
    };
    useSubmissionConfig.mockReturnValue(mockSubmissionConfigValue);
    const { validateBeforeConfirmation } = useSubmissionValidationStatus(...validationStatusArgs);
    expect(validateBeforeConfirmation.useCallback.prereqs).toEqual(
      [
        ...validationStatusArgs,
        mockSubmissionConfigValue,
        setValue,
        setValue,
        setValue,
      ],
    );
    validateBeforeConfirmation.useCallback.cb();
    expect(setValue).toHaveBeenCalledWith(true);
    expect(validateBeforeConfirmation.useCallback.cb()).toBe(true);
  });

  it('validateBeforeConfirmation function returns false when file upload requirement is not met', () => {
    const validationStatusArgs = [['hello', 'hi'], []];
    const mockSubmissionConfigValue = {
      textResponseConfig: { required: true },
      fileResponseConfig: { required: true },
    };
    useSubmissionConfig.mockReturnValue(mockSubmissionConfigValue);
    const { validateBeforeConfirmation } = useSubmissionValidationStatus(...validationStatusArgs);
    expect(validateBeforeConfirmation.useCallback.prereqs).toEqual(
      [
        ...validationStatusArgs,
        mockSubmissionConfigValue,
        setValue,
        setValue,
        setValue,
      ],
    );
    validateBeforeConfirmation.useCallback.cb();
    expect(setValue).toHaveBeenNthCalledWith(1, true);
    expect(validateBeforeConfirmation.useCallback.cb()).toBe(false);
    expect(setValue).toHaveBeenNthCalledWith(2, true);
  });
});
