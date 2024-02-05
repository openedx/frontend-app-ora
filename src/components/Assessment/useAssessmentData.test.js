import React from 'react';

import { mockUseKeyedState } from '@edx/react-unit-test-utils';

import { useHasSubmitted, useInitializeAssessment } from 'hooks/assessment';

import { useAssessmentData, stateKeys } from './useAssessmentData';

jest.mock('hooks/assessment', () => ({
  useHasSubmitted: jest.fn(),
  useInitializeAssessment: jest.fn(),
}));

const state = mockUseKeyedState(stateKeys);

describe('useAssessmentData', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    state.mock();
  });
  afterEach(() => { state.resetVals(); });

  it('initializes initialized state to false', () => {
    useAssessmentData();
    state.expectInitializedWith(stateKeys.initialized, false);
  });

  it('calls useInitializeAssessment', () => {
    const mockInitialize = jest.fn();
    useInitializeAssessment.mockReturnValue(mockInitialize);
    useAssessmentData();
    expect(useInitializeAssessment).toHaveBeenCalled();
    expect(mockInitialize).not.toHaveBeenCalled();
    const [[cb, prereqs]] = React.useEffect.mock.calls;
    expect(prereqs).toEqual([mockInitialize, state.setState[stateKeys.initialized]]);
    cb();
    expect(mockInitialize).toHaveBeenCalled();
  });

  it('calls useHasSubmitted', () => {
    useHasSubmitted.mockReturnValue('def');
    const out = useAssessmentData();
    expect(useHasSubmitted).toHaveBeenCalled();

    expect(out.hasSubmitted).toEqual('def');
  });
});
