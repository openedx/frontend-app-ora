import { mockUseKeyedState } from '@edx/react-unit-test-utils';

import { useRenderData, stateKeys } from './hooks';
import { errorStatuses, errorMessages } from '../constants';

const state = mockUseKeyedState(stateKeys);

describe('useRenderData', () => {
  const props = {
    file: { fileName: 'file.pdf', fileUrl: 'http://example.com' },
    formatMessage: jest.fn(),
  };
  beforeEach(() => {
    jest.clearAllMocks();
    state.mock();
  });
  afterEach(() => {
    state.resetVals();
  });

  it('start with initial state', () => {
    useRenderData(props);
    state.expectInitializedWith(stateKeys.errorStatus, null);
    state.expectInitializedWith(stateKeys.isLoading, true);
  });

  it('stop loading with success', () => {
    const out = useRenderData(props);
    out.rendererProps.onSuccess();
    state.expectSetStateCalledWith(stateKeys.isLoading, false);
    state.expectSetStateCalledWith(stateKeys.errorStatus, null);
  });

  it('stop loading with error', () => {
    const out = useRenderData(props);
    out.rendererProps.onError('error');
    state.expectSetStateCalledWith(stateKeys.isLoading, false);
    state.expectSetStateCalledWith(stateKeys.errorStatus, 'error');
  });

  it('retry resets error status and starts loading', () => {
    const out = useRenderData(props);
    out.error.actions[0].onClick();
    state.expectSetStateCalledWith(stateKeys.errorStatus, null);
    state.expectSetStateCalledWith(stateKeys.isLoading, true);
  });

  it('returns correct error message for different error statuses', () => {
    // Test notFound error message
    state.mockVal(stateKeys.errorStatus, errorStatuses.notFound);
    let out = useRenderData(props);
    expect(out.error.headerMessage).toBe(errorMessages[errorStatuses.notFound]);

    // Test fallback to serverError message for unknown error status
    state.mockVal(stateKeys.errorStatus, errorStatuses.badRequest);
    out = useRenderData(props);
    expect(out.error.headerMessage).toBe(
      errorMessages[errorStatuses.serverError],
    );
  });

  it('handles unknown file types', () => {
    const propsWithUnknownFile = {
      ...props,
      file: { fileName: 'file.unknown', fileUrl: 'http://example.com' },
    };
    const out = useRenderData(propsWithUnknownFile);
    expect(out.Renderer).toBeUndefined();
  });
});
