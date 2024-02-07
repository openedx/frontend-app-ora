import React from 'react';
import { mockUseKeyedState } from '@edx/react-unit-test-utils';

import {
  useIsORAConfigLoaded,
  useIsPageDataLoaded,
  usePrompts,
  useResponse,
  useSetResponse,
  useResponseData,
} from 'hooks/app';

import useAssessmentData, { stateKeys } from './useAssessmentData';

jest.mock('hooks/app', () => ({
  useIsORAConfigLoaded: jest.fn(),
  useIsPageDataLoaded: jest.fn(),
  usePrompts: jest.fn(),
  useResponse: jest.fn(),
  useSetResponse: jest.fn(),
  useResponseData: jest.fn(),
}));

const state = mockUseKeyedState(stateKeys);

describe('useAssessmentData', () => {
  const mockPrompts = 'mockPrompts';
  const mockResponse = 'mockResponse';
  const mockIsLoaded = 'mockIsLoaded';
  const mockSetResponse = jest.fn();
  beforeEach(() => {
    jest.clearAllMocks();
    state.mock();
    useIsORAConfigLoaded.mockReturnValue(mockIsLoaded);
    useIsPageDataLoaded.mockReturnValue(true);
    usePrompts.mockReturnValue(mockPrompts);
    useResponse.mockReturnValue(mockResponse);
    useSetResponse.mockReturnValue(mockSetResponse);
  });
  afterEach(() => { state.resetVals(); });

  it('initializes initialized state to false', () => {
    useAssessmentData();
    state.expectInitializedWith(stateKeys.initialized, false);
  });

  it('returns isLoaded, response, and prompts', () => {
    const result = useAssessmentData();
    expect(result).toEqual({
      isLoaded: mockIsLoaded,
      response: mockResponse,
      prompts: mockPrompts,
    });
  });

  it('is not initialized but loaded, update the response', () => {
    useIsORAConfigLoaded.mockReturnValue(true);
    useIsPageDataLoaded.mockReturnValue(true);
    useResponseData.mockReturnValue(mockResponse);
    useAssessmentData();
    React.useEffect.mock.calls[0][0]();
    expect(mockSetResponse).toHaveBeenCalledWith(mockResponse);
    state.expectSetStateCalledWith(stateKeys.initialized, true);
  });

  it('is initialized and update the response iif responseData is different', () => {
    state.mockVal(stateKeys.initialized, true);
    useResponseData.mockReturnValue('differentResponse');
    useAssessmentData();
    React.useEffect.mock.calls[0][0]();
    expect(mockSetResponse).toHaveBeenCalledWith('differentResponse');
  });
});
