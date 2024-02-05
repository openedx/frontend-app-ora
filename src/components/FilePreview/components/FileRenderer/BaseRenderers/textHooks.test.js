import React from 'react';
import { mockUseKeyedState } from '@edx/react-unit-test-utils';

import axios from 'axios';
import { useTextRendererData, fetchFile, stateKeys } from './textHooks';

jest.mock('axios');

const state = mockUseKeyedState(stateKeys);

describe('textHooks', () => {
  const url = 'http://example.com';
  const setContent = jest.fn();
  const onError = jest.fn();
  const onSuccess = jest.fn();

  describe('fetchFile', () => {
    it('should call onSuccess and setContent when the request is successful', async () => {
      const response = { data: 'file content' };
      axios.get.mockResolvedValue(response);
      await fetchFile({ setContent, url, onSuccess });
      expect(onSuccess).toHaveBeenCalled();
      expect(setContent).toHaveBeenCalledWith(response.data);
    });

    it('should call onError when the request fails', async () => {
      const response = { response: { status: 404 } };
      axios.get.mockRejectedValue(response);
      await fetchFile({ url, onError });
      expect(onError).toHaveBeenCalledWith(response.response.status);
    });
  });

  describe('useTextRendererData', () => {
    beforeEach(() => {
      jest.clearAllMocks();
      state.mock();
    });
    afterEach(() => { state.resetVals(); });

    it('start with empty content', () => {
      useTextRendererData({});
      state.expectInitializedWith(stateKeys.content, '');
    });

    it('update content after useEffect get call', async () => {
      axios.get.mockResolvedValue({ data: 'file content' });
      useTextRendererData({ url, onError, onSuccess });
      // wouldn't call before useEffect
      expect(axios.get).not.toHaveBeenCalled();
      const [[cb]] = React.useEffect.mock.calls;
      cb();
      // because fetchFile was written with async/await, we need to wait for the next tick
      await new Promise(process.nextTick);
      expect(axios.get).toHaveBeenCalled();
      expect(onSuccess).toHaveBeenCalled();
      state.expectSetStateCalledWith(stateKeys.content, 'file content');
    });
  });
});