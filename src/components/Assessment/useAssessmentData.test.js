import React, { useEffect } from 'react';

import { useHasSubmitted, useInitializeAssessment } from 'hooks/assessment';

import { useAssessmentData } from './useAssessmentData';

jest.mock('hooks/assessment', () => ({
  useHasSubmitted: jest.fn(),
  useInitializeAssessment: jest.fn(),
}));

jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useEffect: jest.fn((cb, prereqs) => ({ useEffect: { cb, prereqs } })),
}));

describe('useAssessmentData', () => {
  let setStateSpy;
  const setValue = jest.fn();

  beforeEach(() => {
    setStateSpy = jest.spyOn(React, 'useState').mockImplementation((value) => [value, setValue]);
  });

  afterEach(() => {
    setStateSpy.mockRestore();
    jest.clearAllMocks();
  });

  it('initializes initialized state to false', () => {
    useAssessmentData();
    expect(setStateSpy).toHaveBeenCalledWith(false); // initialized
  });

  it('calls useInitializeAssessment', () => {
    const mockInitialize = jest.fn();
    useInitializeAssessment.mockReturnValue(mockInitialize);
    useAssessmentData();
    expect(useInitializeAssessment).toHaveBeenCalled();
    expect(mockInitialize).not.toHaveBeenCalled();
    const [[cb, prereqs]] = useEffect.mock.calls;
    expect(prereqs).toEqual([mockInitialize, setValue]);
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
