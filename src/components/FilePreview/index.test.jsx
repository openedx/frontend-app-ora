import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

import { useResponse } from 'hooks/app';
import { isSupported } from './components';

import FilePreview from './index';

jest.unmock('@openedx/paragon');
jest.unmock('react');
jest.unmock('@edx/frontend-platform/i18n');

jest.mock('hooks/app', () => ({
  useResponse: jest.fn(),
}));

jest.mock('./components', () => ({
  // eslint-disable-next-line react/prop-types
  FileRenderer: ({ file, defaultOpen }) => (
    <div data-testid="file-renderer">
      {/* eslint-disable-next-line react/prop-types */}
      {file.fileName} - {defaultOpen ? 'open' : 'closed'}
    </div>
  ),
  isSupported: jest.fn(),
}));

describe('<FilePreview />', () => {
  const props = {
    defaultCollapsePreview: false,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders nothing when no files are uploaded', () => {
    useResponse.mockReturnValue({ uploadedFiles: null });
    const { container } = render(<FilePreview {...props} />);
    expect(container.firstChild).toBeNull();
  });

  it('renders empty div when no supported files are uploaded', () => {
    useResponse.mockReturnValue({
      uploadedFiles: [{ fileName: 'file1.txt' }],
    });
    isSupported.mockReturnValue(false);
    const { container } = render(<FilePreview {...props} />);

    expect(container.firstChild).toBeInTheDocument();
    expect(container.firstChild.tagName).toBe('DIV');
    expect(screen.queryByTestId('file-renderer')).not.toBeInTheDocument();
  });

  it('renders only supported files', () => {
    isSupported
      .mockReturnValueOnce(false)
      .mockReturnValueOnce(true)
      .mockReturnValueOnce(true);

    useResponse.mockReturnValue({
      uploadedFiles: [
        { fileName: 'file1.txt' },
        { fileName: 'file2.pdf' },
        { fileName: 'file3.jpg' },
      ],
    });
    render(<FilePreview {...props} />);

    const fileRenderers = screen.getAllByTestId('file-renderer');
    expect(fileRenderers).toHaveLength(2);
    expect(screen.getByText('file2.pdf - open')).toBeInTheDocument();
    expect(screen.getByText('file3.jpg - open')).toBeInTheDocument();
    expect(screen.queryByText('file1.txt - open')).not.toBeInTheDocument();
  });

  it('passes defaultCollapsePreview prop correctly', () => {
    isSupported.mockReturnValue(true);
    useResponse.mockReturnValue({
      uploadedFiles: [{ fileName: 'file1.pdf' }],
    });
    render(<FilePreview defaultCollapsePreview />);

    expect(screen.getByText('file1.pdf - closed')).toBeInTheDocument();
  });
});
