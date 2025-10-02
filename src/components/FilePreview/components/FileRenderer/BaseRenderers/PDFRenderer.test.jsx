import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';

import PDFRenderer from './PDFRenderer';
import { usePDFRendererData } from './pdfHooks';

/* eslint-disable react/prop-types */

jest.mock('react-pdf', () => ({
  pdfjs: { GlobalWorkerOptions: {} },
  Document: ({ children, onLoadSuccess, onLoadError }) => (
    <div
      role="document"
      aria-label="PDF Document"
      data-onloadsuccess={onLoadSuccess}
      data-onloaderror={onLoadError}
    >
      {children}
    </div>
  ),
  Page: ({ pageNumber, onLoadSuccess }) => (
    <div
      role="img"
      aria-label={`PDF Page ${pageNumber}`}
      data-onloadsuccess={onLoadSuccess}
    >
      Page {pageNumber}
    </div>
  ),
}));

jest.mock('./pdfHooks', () => ({
  usePDFRendererData: jest.fn(),
}));

describe('PDFRenderer', () => {
  const defaultProps = {
    url: 'test-document.pdf',
    onError: jest.fn(),
    onSuccess: jest.fn(),
  };

  const defaultHookReturnValue = {
    pageNumber: 1,
    numPages: 10,
    relativeHeight: 400,
    wrapperRef: { current: null },
    onDocumentLoadSuccess: jest.fn(),
    onLoadPageSuccess: jest.fn(),
    onDocumentLoadError: jest.fn(),
    onInputPageChange: jest.fn(),
    onNextPageButtonClick: jest.fn(),
    onPrevPageButtonClick: jest.fn(),
    hasNext: true,
    hasPrev: false,
  };

  beforeEach(() => {
    jest.clearAllMocks();
    usePDFRendererData.mockReturnValue(defaultHookReturnValue);
  });

  describe('navigation controls', () => {
    it('disables previous button on first page', () => {
      render(<PDFRenderer {...defaultProps} />);

      const prevButton = screen.getByRole('button', {
        name: /previous pdf page/i,
      });
      const nextButton = screen.getByRole('button', { name: /next pdf page/i });

      expect(prevButton).toBeDisabled();
      expect(nextButton).toBeEnabled();
    });

    it('disables next button on last page', () => {
      usePDFRendererData.mockReturnValue({
        ...defaultHookReturnValue,
        pageNumber: 10,
        hasNext: false,
        hasPrev: true,
      });

      render(<PDFRenderer {...defaultProps} />);

      const prevButton = screen.getByRole('button', {
        name: /previous pdf page/i,
      });
      const nextButton = screen.getByRole('button', { name: /next pdf page/i });

      expect(prevButton).toBeEnabled();
      expect(nextButton).toBeDisabled();
    });

    it('enables both buttons on middle page', () => {
      usePDFRendererData.mockReturnValue({
        ...defaultHookReturnValue,
        pageNumber: 5,
        hasNext: true,
        hasPrev: true,
      });

      render(<PDFRenderer {...defaultProps} />);

      const prevButton = screen.getByRole('button', {
        name: /previous pdf page/i,
      });
      const nextButton = screen.getByRole('button', { name: /next pdf page/i });

      expect(prevButton).toBeEnabled();
      expect(nextButton).toBeEnabled();
    });
  });

  describe('page number input', () => {
    it('displays current page number and total pages', () => {
      render(<PDFRenderer {...defaultProps} />);

      const pageInput = screen.getByRole('spinbutton');
      expect(pageInput).toHaveValue(1);
      expect(screen.getByText('of 10')).toBeInTheDocument();
    });

    it('calls onInputPageChange when page number is changed', async () => {
      const user = userEvent.setup();
      const mockOnInputPageChange = jest.fn();

      usePDFRendererData.mockReturnValue({
        ...defaultHookReturnValue,
        onInputPageChange: mockOnInputPageChange,
      });

      render(<PDFRenderer {...defaultProps} />);

      const pageInput = screen.getByRole('spinbutton');
      await user.clear(pageInput);
      await user.type(pageInput, '5');

      expect(mockOnInputPageChange).toHaveBeenCalled();
    });
  });

  describe('button interactions', () => {
    it('calls onPrevPageButtonClick when previous button is clicked', async () => {
      const user = userEvent.setup();
      const mockOnPrevPageButtonClick = jest.fn();

      usePDFRendererData.mockReturnValue({
        ...defaultHookReturnValue,
        pageNumber: 5,
        hasPrev: true,
        onPrevPageButtonClick: mockOnPrevPageButtonClick,
      });

      render(<PDFRenderer {...defaultProps} />);

      const prevButton = screen.getByRole('button', {
        name: /previous pdf page/i,
      });
      await user.click(prevButton);

      expect(mockOnPrevPageButtonClick).toHaveBeenCalledTimes(1);
    });

    it('calls onNextPageButtonClick when next button is clicked', async () => {
      const user = userEvent.setup();
      const mockOnNextPageButtonClick = jest.fn();

      usePDFRendererData.mockReturnValue({
        ...defaultHookReturnValue,
        onNextPageButtonClick: mockOnNextPageButtonClick,
      });

      render(<PDFRenderer {...defaultProps} />);

      const nextButton = screen.getByRole('button', { name: /next pdf page/i });
      await user.click(nextButton);

      expect(mockOnNextPageButtonClick).toHaveBeenCalledTimes(1);
    });
  });

  describe('PDF document rendering', () => {
    it('renders PDF document and page', () => {
      render(<PDFRenderer {...defaultProps} />);

      expect(
        screen.getByRole('document', { name: 'PDF Document' }),
      ).toBeInTheDocument();
      expect(
        screen.getByRole('img', { name: 'PDF Page 1' }),
      ).toBeInTheDocument();
      expect(screen.getByText('Page 1')).toBeInTheDocument();
    });

    it('passes hook functions to usePDFRendererData', () => {
      render(<PDFRenderer {...defaultProps} />);

      expect(usePDFRendererData).toHaveBeenCalledWith({
        onError: defaultProps.onError,
        onSuccess: defaultProps.onSuccess,
      });
    });
  });
});
