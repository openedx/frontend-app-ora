import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { renderMathJax } from 'utils/index';

import { useSubmissionConfig } from 'hooks/app';

import TextResponse from './index';

jest.unmock('@openedx/paragon');
jest.unmock('react');
jest.unmock('@edx/frontend-platform/i18n');

jest.mock('hooks/app', () => ({
  useSubmissionConfig: jest.fn(),
}));
jest.mock('utils/index', () => ({
  renderMathJax: jest.fn(),
}));

describe('<TextResponse />', () => {
  beforeEach(() => {
    useSubmissionConfig.mockReturnValue({
      textResponseConfig: { editorType: 'text', allowLatexPreview: true },
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders response text correctly with text editor type', () => {
    render(<TextResponse response="<p>Test response content</p>" />);

    const container = screen.getByText('Test response content');
    expect(container).toBeInTheDocument();
    expect(container.closest('.div-textarea')).toBeInTheDocument();
  });

  it('calls renderMathJax when allowLatexPreview is true', () => {
    render(<TextResponse response="<p>Math content</p>" />);

    expect(renderMathJax).toHaveBeenCalledTimes(1);
    expect(renderMathJax).toHaveBeenCalledWith(expect.any(Object));
  });

  it('does not call renderMathJax when allowLatexPreview is false', () => {
    useSubmissionConfig.mockReturnValue({
      textResponseConfig: { editorType: 'text', allowLatexPreview: false },
    });

    render(<TextResponse response="<p>No math content</p>" />);

    expect(renderMathJax).not.toHaveBeenCalled();
  });

  it('renders without div-textarea class when editorType is not text', () => {
    useSubmissionConfig.mockReturnValue({
      textResponseConfig: { editorType: 'rich', allowLatexPreview: true },
    });

    render(<TextResponse response="<p>Rich content</p>" />);

    const container = screen.getByText('Rich content');
    expect(container).toBeInTheDocument();
    expect(container.closest('.div-textarea')).not.toBeInTheDocument();
  });

  it('handles missing textResponseConfig gracefully', () => {
    useSubmissionConfig.mockReturnValue({});

    render(<TextResponse response="<p>Default content</p>" />);

    const container = screen.getByText('Default content');
    expect(container).toBeInTheDocument();
    expect(renderMathJax).not.toHaveBeenCalled();
  });

  it('does not call renderMathJax when allowLatexPreview is missing', () => {
    useSubmissionConfig.mockReturnValue({
      textResponseConfig: { editorType: 'text' },
    });

    render(<TextResponse response="<p>Content without preview</p>" />);

    expect(renderMathJax).not.toHaveBeenCalled();
  });
});
