import React from 'react';
import { useRenderData } from './hooks';
import { errorStatuses, errorMessages } from '../constants';

describe('useRenderData', () => {
  const props = {
    file: { fileName: 'file.pdf', fileUrl: 'http://example.com' },
    formatMessage: jest.fn(),
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
    useRenderData(props);
    expect(setStateSpy.mock.calls.length).toBe(2);
    expect(setStateSpy).toHaveBeenCalledWith(null); // errorStatus
    expect(setStateSpy).toHaveBeenCalledWith(true); // isLoading
  });

  it('stop loading with success', () => {
    const out = useRenderData(props);
    out.rendererProps.onSuccess();

    // loading stops
    expect(setValue).toHaveBeenCalledWith(null); // errorStatus
    expect(setValue).toHaveBeenCalledWith(false); // isLoading
  });

  it('stop loading with error', () => {
    const out = useRenderData(props);
    out.rendererProps.onError('error');

    expect(setValue).toHaveBeenCalledWith('error'); // errorStatus
    expect(setValue).toHaveBeenCalledWith(false); // isLoading
  });

  it('retry resets error status and starts loading', () => {
    const out = useRenderData(props);
    out.error.actions[0].onClick();
    expect(setValue).toHaveBeenCalledWith(null); // errorStatus
    expect(setValue).toHaveBeenCalledWith(true); // isLoading
  });

  it('returns correct error message for different error statuses', () => {
    let currentErrorStatus = errorStatuses.notFound;
    setStateSpy.mockImplementation(() => [currentErrorStatus, setValue]);

    let out = useRenderData(props);
    expect(out.error.headerMessage).toBe(errorMessages[errorStatuses.notFound]);

    currentErrorStatus = errorStatuses.badRequest;
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
