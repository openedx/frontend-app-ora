import React from 'react';
import { renderHook } from '@testing-library/react';
import {
  useIsORAConfigLoaded,
  useIsPageDataLoaded,
  usePrompts,
  useResponse,
  useSetResponse,
  useResponseData,
} from 'hooks/app';

import useAssessmentData from './useAssessmentData';

jest.mock('hooks/app', () => ({
  useIsORAConfigLoaded: jest.fn(),
  useIsPageDataLoaded: jest.fn(),
  usePrompts: jest.fn(),
  useResponse: jest.fn(),
  useSetResponse: jest.fn(),
  useResponseData: jest.fn(),
}));

jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useState: jest.fn(),
  useEffect: jest.fn((f) => f()), // Immediately invoke useEffect for testing
}));

describe('useAssessmentData', () => {
  const mockPrompts = 'mockPrompts';
  const mockResponse = 'mockResponse';
  const mockIsLoaded = 'mockIsLoaded';
  const mockSetResponse = jest.fn();
  let setStateSpy;
  const setValue = jest.fn();

  beforeEach(() => {
    setStateSpy = jest.spyOn(React, 'useState').mockImplementation((value) => [value, setValue]);
    useIsORAConfigLoaded.mockReturnValue(mockIsLoaded);
    useIsPageDataLoaded.mockReturnValue(true);
    usePrompts.mockReturnValue(mockPrompts);
    useResponse.mockReturnValue(mockResponse);
    useSetResponse.mockReturnValue(mockSetResponse);
  });

  afterEach(() => {
    setStateSpy.mockRestore();
    jest.clearAllMocks();
  });

  it('initializes initialized state to false', () => {
    renderHook(() => useAssessmentData());
    expect(setStateSpy).toHaveBeenCalledWith(false); // initialized state
  });

  it('returns isLoaded, response, and prompts', () => {
    const { result: { current } } = renderHook(() => useAssessmentData());
    expect(current).toEqual({
      isLoaded: mockIsLoaded,
      response: mockResponse,
      prompts: mockPrompts,
    });
  });

  it('is not initialized but loaded, update the response', () => {
    useIsORAConfigLoaded.mockReturnValue(true);
    useIsPageDataLoaded.mockReturnValue(true);
    useResponseData.mockReturnValue(mockResponse);
    renderHook(() => useAssessmentData());
    React.useEffect.mock.calls[0][0]();
    expect(mockSetResponse).toHaveBeenCalledWith(mockResponse);
    expect(setValue).toHaveBeenCalledWith(true); // setInitialized to true
  });

  it('is initialized and update the response iif responseData is different', () => {
    setValue.mockReturnValue(true);
    useResponseData.mockReturnValue('differentResponse');
    renderHook(() => useAssessmentData());
    React.useEffect.mock.calls[0][0]();
    expect(mockSetResponse).toHaveBeenCalledWith('differentResponse');
  });
});
