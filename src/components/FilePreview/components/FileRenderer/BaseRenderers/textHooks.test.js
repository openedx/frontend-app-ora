import React from 'react';

import axios from 'axios';
import { useTextRendererData, fetchFile } from './textHooks';

jest.mock('axios');

jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useEffect: jest.fn((cb, prereqs) => ({ useEffect: { cb, prereqs } })),
}));

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
      expect(setContent).toHaveBeenCalledWith(response.data); // content
    });

    it('should call onError when the request fails', async () => {
      const response = { response: { status: 404 } };
      axios.get.mockRejectedValue(response);
      await fetchFile({ url, onError });
      expect(onError).toHaveBeenCalledWith(response.response.status);
    });
  });

  describe('useTextRendererData', () => {
    let setStateSpy;
    const setValue = jest.fn();

    beforeEach(() => {
      setStateSpy = jest.spyOn(React, 'useState').mockImplementation((value) => [value, setValue]);
    });

    afterEach(() => {
      setStateSpy.mockRestore();
      jest.clearAllMocks();
    });

    it('start with empty content', () => {
      useTextRendererData({});
      expect(setStateSpy).toHaveBeenCalledWith(''); // content initial state
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
      expect(setValue).toHaveBeenCalledWith('file content'); // content
    });
  });
});
