import React from 'react';
import { shallow } from '@edx/react-unit-test-utils';

import PDFRenderer from './PDFRenderer';

import { usePDFRendererData } from './pdfHooks';

jest.mock('react-pdf', () => ({
  pdfjs: { GlobalWorkerOptions: {} },
  Document: () => 'Document',
  Page: () => 'Page',
}));

jest.mock('./pdfHooks', () => ({
  usePDFRendererData: jest.fn(),
}));

describe('PDF Renderer Component', () => {
  const props = {
    url: 'some_url.pdf',
    onError: jest.fn().mockName('this.props.onError'),
    onSuccess: jest.fn().mockName('this.props.onSuccess'),
  };
  const hookProps = {
    pageNumber: 1,
    numPages: 10,
    relativeHeight: 200,
    wrapperRef: { current: 'wrapperRef' },
    onDocumentLoadSuccess: jest.fn().mockName('onDocumentLoadSuccess'),
    onLoadPageSuccess: jest.fn().mockName('onLoadPageSuccess'),
    onDocumentLoadError: jest.fn().mockName('onDocumentLoadError'),
    onInputPageChange: jest.fn().mockName('onInputPageChange'),
    onNextPageButtonClick: jest.fn().mockName('onNextPageButtonClick'),
    onPrevPageButtonClick: jest.fn().mockName('onPrevPageButtonClick'),
    hasNext: true,
    hasPref: false,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });
  describe('snapshots', () => {
    test('first page, prev is disabled', () => {
      usePDFRendererData.mockReturnValue(hookProps);
      const wrapper = shallow(<PDFRenderer {...props} />);
      expect(wrapper.snapshot).toMatchSnapshot();

      const [prevButton, nextButton] = wrapper.instance.findByType('IconButton');
      expect(prevButton.props.disabled).toBe(true);
      expect(nextButton.props.disabled).toBe(false);
    });
    test('on last page, next is disabled', () => {
      usePDFRendererData.mockReturnValue({
        ...hookProps,
        pageNumber: hookProps.numPages,
        hasNext: false,
        hasPrev: true,
      });
      const wrapper = shallow(<PDFRenderer {...props} />);
      expect(wrapper.snapshot).toMatchSnapshot();

      const [prevButton, nextButton] = wrapper.instance.findByType('IconButton');
      expect(prevButton.props.disabled).toBe(false);
      expect(nextButton.props.disabled).toBe(true);
    });
  });
});
