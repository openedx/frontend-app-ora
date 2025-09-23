import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { renderMathJax } from 'utils/index';

import LatexPreview from './LaTexPreview';

jest.unmock('@openedx/paragon');
jest.unmock('react');
jest.unmock('@edx/frontend-platform/i18n');

jest.mock('utils/index', () => ({
  renderMathJax: jest.fn(),
}));

describe('<LatexPreview />', () => {
  const mockRenderMathJax = renderMathJax;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders with latex value', () => {
    const latexValue = 'some latex value';
    const { container } = render(<LatexPreview latexValue={latexValue} />);

    const previewDiv = container.querySelector('.mt-2');
    expect(previewDiv).toBeInTheDocument();

    const contentDiv = previewDiv.querySelector('div');
    expect(contentDiv).toBeInTheDocument();
  });

  it('calls renderMathJax on mount', () => {
    render(<LatexPreview latexValue="test latex" />);

    expect(mockRenderMathJax).toHaveBeenCalledTimes(1);
  });

  it('calls renderMathJax when latexValue changes', () => {
    const { rerender } = render(<LatexPreview latexValue="initial value" />);

    expect(mockRenderMathJax).toHaveBeenCalledTimes(1);

    rerender(<LatexPreview latexValue="new value" />);

    expect(mockRenderMathJax).toHaveBeenCalledTimes(2);
  });

  it('renders with correct HTML content', () => {
    const latexValue = '<math>x^2</math>';
    const { container } = render(<LatexPreview latexValue={latexValue} />);

    const previewDiv = container.querySelector('.mt-2');
    const contentDiv = previewDiv.querySelector('div');
    expect(contentDiv.innerHTML).toBe(latexValue);
  });

  it('has correct CSS structure', () => {
    const { container } = render(<LatexPreview latexValue="test" />);

    const outerDiv = container.querySelector('.mt-2');
    expect(outerDiv).toBeInTheDocument();
    expect(outerDiv.children).toHaveLength(1);
  });
});
