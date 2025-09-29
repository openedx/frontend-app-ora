import React from 'react';
import { when } from 'jest-when';

import {
  usePDFRendererData, safeSetPageNumber, initialState,
} from './pdfHooks';

jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useRef: jest.fn((val) => ({ current: val, useRef: true })),
}));

describe('PDF Renderer hooks', () => {
  describe('safeSetPageNumber', () => {
    it('returns value handler that sets page number if valid', () => {
      const rawSetPageNumber = jest.fn();
      const numPages = 10;
      const goToPage = safeSetPageNumber({ numPages, rawSetPageNumber });
      // should not call rawSetPageNumber when page number smaller than 1 or greater than numPages
      goToPage(0);
      expect(rawSetPageNumber).not.toHaveBeenCalled();
      goToPage(numPages + 1);
      expect(rawSetPageNumber).not.toHaveBeenCalled();
      // should call rawSetPageNumber when page number is valid
      goToPage(numPages);
      expect(rawSetPageNumber).toHaveBeenCalledWith(numPages);
    });
  });

  describe('usePDFRendererData', () => {
    const onSuccess = jest.fn();
    const onError = jest.fn();
    const setValue = jest.fn();
    let setStateSpy;

    beforeEach(() => {
      setStateSpy = jest.spyOn(React, 'useState').mockImplementation((value) => [value, setValue]);
    });

    afterEach(() => {
      setStateSpy.mockRestore();
      jest.clearAllMocks();
    });

    it('start with initial state', () => {
      usePDFRendererData({});
      expect(setStateSpy.mock.calls.length).toBe(3);
      expect(setStateSpy).toHaveBeenCalledWith(initialState.pageNumber);
      expect(setStateSpy).toHaveBeenCalledWith(initialState.numPages);
      expect(setStateSpy).toHaveBeenCalledWith(initialState.relativeHeight);
    });

    it('calls onSuccess and sets numPages based on args', () => {
      const out = usePDFRendererData({ onSuccess });
      out.onDocumentLoadSuccess({ numPages: 5 });
      expect(onSuccess).toHaveBeenCalled();
      expect(setValue).toHaveBeenCalledWith(5);
    });

    it('sets relative height based on page size', () => {
      when(React.useRef)
        .calledWith()
        .mockReturnValueOnce({
          current: { getBoundingClientRect: () => ({ width: 20 }) },
        });
      const out = usePDFRendererData({});

      const page = { view: [0, 0, 20, 30] };
      out.onLoadPageSuccess(page);
      expect(setValue).toHaveBeenCalledWith(30);
    });

    it('calls onError if error happened', () => {
      const out = usePDFRendererData({ onError });
      out.onDocumentLoadError('notFound');
      expect(onError).toHaveBeenCalledWith('notFound');
    });

    it('has good page logic', () => {
      // start with 3 pages
      // this seems to be the only way to mock initial value
      initialState.pageNumber = 2;
      initialState.numPages = 3;
      const out = usePDFRendererData({ onSuccess });
      // go to next page
      out.onNextPageButtonClick();
      expect(setValue).toHaveBeenCalledWith(3);

      // go to prev page
      out.onPrevPageButtonClick();
      expect(setValue).toHaveBeenCalledWith(1);

      // reset initial state
      initialState.pageNumber = 1;
      initialState.numPages = 1;
    });
  });
});
