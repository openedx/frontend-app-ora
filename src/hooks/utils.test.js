import React from 'react';
import { when } from 'jest-when';
import { getEffects } from '@edx/react-unit-test-utils';

import { useIsMounted } from './utils';

when(React.useRef).calledWith(false).mockReturnValue({ current: false });

let out;
describe('useIsMounted', () => {
  it('creates a ref with initial value false', () => {
    out = useIsMounted();
    expect(React.useRef).toHaveBeenCalledWith(false);
  });
  it('sets mounted.current to true on mount and false on unmount', () => {
    out = useIsMounted();
    const [effect] = getEffects([], React);
    const returned = effect();
    expect(out.current).toBe(true);
    returned();
    expect(out.current).toBe(false);
  });
});
