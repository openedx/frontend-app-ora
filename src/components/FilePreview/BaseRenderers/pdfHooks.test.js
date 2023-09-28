import React from 'react';

import { mockUseKeyedState } from '@edx/react-unit-test-utils';

import {
  stateKeys,
  initialState,
} from './pdfHooks';

jest.mock('react-pdf', () => ({
  pdfjs: { GlobalWorkerOptions: {} },
  Document: () => 'Document',
  Page: () => 'Page',
}));

jest.mock('./pdfHooks', () => ({
  ...jest.requireActual('./pdfHooks'),
  safeSetPageNumber: jest.fn(),
  rendererHooks: jest.fn(),
}));

const state = mockUseKeyedState(stateKeys);

const testValue = 'my-test-value';

describe('PDF Renderer hooks', () => {
  const props = {
    onError: jest.fn().mockName('this.props.onError'),
    onSuccess: jest.fn().mockName('this.props.onSuccess'),
  };

  const actualHooks = jest.requireActual('./pdfHooks');

  beforeEach(() => state.mock());
  afterEach(() => state.resetVals());

  describe('state hooks', () => {
    test('initialization', () => {
      actualHooks.rendererHooks(props);
      state.expectInitializedWith(
        stateKeys.pageNumber,
        initialState.pageNumber,
      );
      state.expectInitializedWith(stateKeys.numPages, initialState.numPages);
      state.expectInitializedWith(
        stateKeys.relativeHeight,
        initialState.relativeHeight,
      );
    });
  });

  test('safeSetPageNumber returns value handler that sets page number if valid', () => {
    const { safeSetPageNumber } = actualHooks;
    const rawSetPageNumber = jest.fn();
    const numPages = 10;
    safeSetPageNumber({ numPages, rawSetPageNumber })(0);
    expect(rawSetPageNumber).not.toHaveBeenCalled();
    safeSetPageNumber({ numPages, rawSetPageNumber })(numPages + 1);
    expect(rawSetPageNumber).not.toHaveBeenCalled();
    safeSetPageNumber({ numPages, rawSetPageNumber })(numPages - 1);
    expect(rawSetPageNumber).toHaveBeenCalledWith(numPages - 1);
  });

  describe('rendererHooks', () => {
    const { rendererHooks } = actualHooks;

    test('wrapperRef passed as react ref', () => {
      const hook = rendererHooks(props);
      expect(hook.wrapperRef.useRef).toEqual(true);
    });
    describe('onDocumentLoadSuccess', () => {
      it('calls onSuccess and sets numPages based on args', () => {
        const hook = rendererHooks(props);
        hook.onDocumentLoadSuccess({ numPages: testValue });
        expect(props.onSuccess).toHaveBeenCalled();
        expect(state.setState.numPages).toHaveBeenCalledWith(testValue);
      });
    });
    describe('onLoadPageSuccess', () => {
      it('sets relative height based on page size', () => {
        const width = 23;
        React.useRef.mockReturnValueOnce({
          current: {
            getBoundingClientRect: () => ({ width }),
          },
        });
        const [pageWidth, pageHeight] = [20, 30];
        const page = { view: [0, 0, pageWidth, pageHeight] };
        const hook = rendererHooks(props);
        const height = (width * pageHeight) / pageWidth;
        hook.onLoadPageSuccess(page);
        expect(state.setState.relativeHeight).toHaveBeenCalledWith(height);
      });
    });
    test('onDocumentLoadError will call onError', () => {
      const error = new Error('missingPDF');
      const hook = rendererHooks(props);
      hook.onDocumentLoadError(error);
      expect(props.onError).toHaveBeenCalledWith(error);
    });

    describe('pages hook', () => {
      let oldNumPages;
      let oldPageNumber;
      let hook;
      beforeEach(() => {
        state.mock();
        // TODO: update state test instead of hacking initial state
        oldNumPages = initialState.numPages;
        oldPageNumber = initialState.pageNumber;
        initialState.numPages = 10;
        initialState.pageNumber = 5;
        hook = rendererHooks(props);
      });
      afterEach(() => {
        initialState.numPages = oldNumPages;
        initialState.pageNumber = oldPageNumber;
        state.resetVals();
      });
      test('onInputPageChange will call setPageNumber with int event target value', () => {
        hook.onInputPageChange({ target: { value: '3.3' } });
        expect(state.setState.pageNumber).toHaveBeenCalledWith(3);
      });
      test('onPrevPageButtonClick will call setPageNumber with current page number - 1', () => {
        hook.onPrevPageButtonClick();
        expect(state.setState.pageNumber).toHaveBeenCalledWith(
          initialState.pageNumber - 1,
        );
      });
      test('onNextPageButtonClick will call setPageNumber with current page number + 1', () => {
        hook.onNextPageButtonClick();
        expect(state.setState.pageNumber).toHaveBeenCalledWith(
          initialState.pageNumber + 1,
        );
      });

      test('hasNext returns true iff pageNumber is less than total number of pages', () => {
        expect(hook.hasNext).toEqual(true);
        initialState.pageNumber = initialState.numPages;
        hook = rendererHooks(props);
        expect(hook.hasNext).toEqual(false);
      });
      test('hasPrev returns true iff pageNumber is greater than 1', () => {
        expect(hook.hasPrev).toEqual(true);
        initialState.pageNumber = 1;
        hook = rendererHooks(props);
        expect(hook.hasPrev).toEqual(false);
      });
    });
  });
});
