import { mockUseKeyedState, formatMessage } from '@edx/react-unit-test-utils';

import {
  ErrorStatuses,
  RENDERERS,
  SUPPORTED_TYPES,
  ERROR_STATUSES,
  getFileType,
  isSupported,
  stateKeys,
} from './hooks';

jest.mock('./hooks', () => ({
  ...jest.requireActual('./hooks'),
  renderHooks: jest.fn(),
}));

const state = mockUseKeyedState(stateKeys);

describe('FilePreview hooks', () => {
  const props = {
    file: {
      name: 'test-file-name.txt',
      downloadUrl: 'my-test-download-url.jpg',
    },
    formatMessage,
  };

  const actualHooks = jest.requireActual('./hooks');

  beforeEach(() => state.mock());
  afterEach(() => state.resetVals());

  test('state initialization', () => {
    actualHooks.renderHooks(props);
    state.expectInitializedWith(stateKeys.errorStatus, null);
    state.expectInitializedWith(stateKeys.isLoading, true);
  });

  test('getFileType returns file extension if available, in lowercase', () => {
    expect(getFileType('thing.TXT')).toEqual('txt');
    expect(getFileType(props.file.name)).toEqual('txt');
  });

  test('isSupported returns true iff the filetype is included in SUPPORTED_TYPES', () => {
    SUPPORTED_TYPES.forEach((type) => {
      expect(isSupported({ name: `thing.${type}` })).toEqual(true);
    });
    expect(isSupported({ name: 'thing' })).toEqual(false);
  });

  describe('renderHooks', () => {
    test('errorStatus and isLoading tied to state, initialized to null and true', () => {
      const hook = actualHooks.renderHooks(props);
      expect(hook.errorStatus).toEqual(state.values.errorStatus);
      expect(hook.errorStatus).toEqual(null);
      expect(hook.isLoading).toEqual(state.values.isLoading);
      expect(hook.isLoading).toEqual(true);
    });

    test('error', () => {
      const hook = actualHooks.renderHooks(props);
      expect(hook.error.headerMessage).toEqual(
        ERROR_STATUSES[ErrorStatuses.serverError],
      );
      expect(hook.error.children).toEqual(
        props.formatMessage(ERROR_STATUSES[ErrorStatuses.serverError]),
      );
      hook.rendererProps.onError(ErrorStatuses.notFound);
      expect(state.setState.errorStatus).toHaveBeenCalledWith(
        ErrorStatuses.notFound,
      );
    });

    test('Renderer', () => {
      SUPPORTED_TYPES.forEach((type) => {
        const hook = actualHooks.renderHooks({
          ...props,
          file: { ...props.file, name: `thing.${type}` },
        });
        expect(hook.Renderer).toEqual(RENDERERS[type]);
      });
    });

    test('rendererProps', () => {
      const hook = actualHooks.renderHooks(props);
      expect(hook.rendererProps.fileName).toEqual(props.file.name);
      expect(hook.rendererProps.url).toEqual(props.file.downloadUrl);

      hook.rendererProps.onSuccess();
      expect(state.setState.isLoading).toHaveBeenCalledWith(false);
      expect(state.setState.errorStatus).toHaveBeenCalledWith(null);

      hook.rendererProps.onError(ErrorStatuses.notFound);
      expect(state.setState.isLoading).toHaveBeenCalledWith(false);
      expect(state.setState.errorStatus).toHaveBeenCalledWith(
        ErrorStatuses.notFound,
      );
    });
  });
});
