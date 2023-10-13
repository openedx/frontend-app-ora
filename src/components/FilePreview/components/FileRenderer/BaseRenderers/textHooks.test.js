/* eslint-disable prefer-promise-reject-errors */
import { get } from 'axios';
import { mockUseKeyedState } from '@edx/react-unit-test-utils';
import { when } from 'jest-when';

import { stateKeys, rendererHooks, fetchFile } from './textHooks';

jest.mock('axios', () => ({
  get: jest.fn(),
}));

const state = mockUseKeyedState(stateKeys);

const testValue = 'test-value';

const props = {
  url: 'test-url',
  onError: jest.fn(),
  onSuccess: jest.fn(),
};

describe('Text file preview hooks', () => {
  beforeEach(() => state.mock());
  afterEach(() => state.resetVals());

  test('state hooks', () => {
    rendererHooks(props);
    state.expectInitializedWith(stateKeys.content, '');
  });

  describe('fetchFile', () => {
    const setContent = jest.fn();

    test('call setContent after fetch', async () => {
      when(get).calledWith(props.url).mockResolvedValue({ data: testValue });
      await fetchFile({ setContent, ...props });
      expect(get).toHaveBeenCalledWith(props.url);
      expect(setContent).toHaveBeenCalledWith(testValue);
    });
    test('call onError if fetch fails', async () => {
      const status = 404;
      when(get).calledWith(props.url).mockRejectedValue({ response: { status } });
      await fetchFile({ setContent, ...props });
      expect(props.onError).toHaveBeenCalledWith(status);
    });
  });

  // describe('rendererHooks', () => {
  //   jest.mock('./textHooks', () => ({
  //     ...jest.requireActual('./textHooks'),
  //     fetchFile: jest.fn(),
  //   }));
  //   let cb;
  //   let prereqs;
  //   let hook;
  //   const loadHook = () => {
  //     hook = rendererHooks(props);
  //     [[cb, prereqs]] = useEffect.mock.calls;
  //   };
  //   it('calls fetchFile method, predicated on setContent, url, and callbacks', () => {
  //     loadHook();
  //     expect(useEffect).toHaveBeenCalled();
  //     expect(prereqs).toEqual([
  //       props.onError,
  //       props.onSuccess,
  //       state.setState.content,
  //       props.url,
  //     ]);
  //     debugger
  //     // expect(fetchFile).not.toHaveBeenCalled();
  //     cb();
  //     expect(fetchFile).toHaveBeenCalledWith({
  //       onError: props.onError,
  //       onSuccess: props.onSuccess,
  //       setContent: state.setState.content,
  //       url: props.url,
  //     });
  //   });
  // });
});
