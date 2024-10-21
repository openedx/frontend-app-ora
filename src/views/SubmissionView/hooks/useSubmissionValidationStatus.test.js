import { mockUseKeyedState } from '@edx/react-unit-test-utils';

import { useSubmissionConfig } from 'hooks/app';

import useSubmissionValidationStatus, { stateKeys } from './useSubmissionValidationStatus';

jest.mock('hooks/app', () => ({
  useResponseData: jest.fn(),
  useUploadFiles: jest.fn(),
  useDeleteFile: jest.fn(),

  useSubmissionConfig: jest.fn(),
  useTextResponses: jest.fn(),
}));

const state = mockUseKeyedState(stateKeys);

describe('useSubmissionValidationStatus', () => {
  useSubmissionConfig.mockReturnValue({
    textResponseConfig: { required: false },
    fileResponseConfig: { required: false },
  });

  beforeEach(() => {
    jest.clearAllMocks();
    state.mock();
  });
  afterEach(() => { state.resetVals(); });

  it('initializes state for useSubmissionValidationStatus', () => {
    useSubmissionConfig.mockReturnValue();
    useSubmissionValidationStatus([], []);
    state.expectInitializedWith(stateKeys.submissionTriggered, false);
    state.expectInitializedWith(stateKeys.promptStatuses, {});
    state.expectInitializedWith(stateKeys.fileUploadIsRequired, false);
  });

  it('validateBeforeConfirmation function returns true if prompts and file uploads are not required', () => {
    useSubmissionConfig.mockReturnValue({
      textResponseConfig: { required: false },
      fileResponseConfig: { required: false },
    });
    const { validateBeforeConfirmation } = useSubmissionValidationStatus([''], []);
    expect(validateBeforeConfirmation.useCallback.cb()).toBe(true);
    expect(state.setState.submissionTriggered).toHaveBeenCalledWith(true);
  });

  it('validateBeforeConfirmation function returns false when requirement is not met', () => {
    useSubmissionConfig.mockReturnValue({
      textResponseConfig: { required: true },
      fileResponseConfig: { required: true },
    });
    const { validateBeforeConfirmation } = useSubmissionValidationStatus([''], []);
    validateBeforeConfirmation.useCallback.cb();
    expect(state.setState.submissionTriggered).toHaveBeenCalledWith(true);
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
        state.setState[stateKeys.promptStatuses],
        state.setState[stateKeys.submissionTriggered],
        state.setState[stateKeys.fileUploadIsRequired],
      ],
    );
    validateBeforeConfirmation.useCallback.cb();
    expect(state.setState.submissionTriggered).toHaveBeenCalledWith(true);
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
        state.setState[stateKeys.promptStatuses],
        state.setState[stateKeys.submissionTriggered],
        state.setState[stateKeys.fileUploadIsRequired],
      ],
    );
    validateBeforeConfirmation.useCallback.cb();
    expect(state.setState.submissionTriggered).toHaveBeenCalledWith(true);
    expect(validateBeforeConfirmation.useCallback.cb()).toBe(false);
    expect(state.values.fileUploadIsRequired).toEqual(true);
  });
});
