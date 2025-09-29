import React from 'react';

import { useIsMounted } from './utils';

jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useRef: jest.fn((val) => ({ current: val, useRef: true })),
  useEffect: jest.fn((cb, prereqs) => ({ useEffect: { cb, prereqs } })),
}));

describe('useIsMounted', () => {
  let useRef;
  let useEffect;

  beforeEach(() => {
    useRef = jest.spyOn(React, 'useRef');
    useEffect = jest.spyOn(React, 'useEffect');
  });
  it('creates a ref with initial value false', () => {
    useIsMounted();
    expect(useRef).toHaveBeenCalledWith(false);
  });
  it('sets mounted.current to true on mount and false on unmount', () => {
    jest.clearAllMocks();
    const result = useIsMounted();
    expect(result.current).toBe(false); // initial value

    // Call the effect callback and get the cleanup function
    const cleanup = useEffect.mock.calls[0][0]();
    expect(result.current).toBe(true);

    // Call cleanup to simulate unmount
    cleanup();
    expect(result.current).toBe(false);
  });
});
