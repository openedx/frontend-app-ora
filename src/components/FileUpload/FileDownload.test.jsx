import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import { IntlProvider } from '@edx/frontend-platform/i18n';

import FileDownload from './FileDownload';

import { useFileDownloadHooks } from './hooks';

jest.unmock('@openedx/paragon');
jest.unmock('react');
jest.unmock('@edx/frontend-platform/i18n');

jest.mock('react-router', () => ({
  useParams: () => ({
    xblockId: 'xblockId',
  }),
}));

const mockDownloadFiles = jest.fn();
jest.mock('./hooks', () => ({
  useFileDownloadHooks: jest.fn(),
}));

const renderWithIntl = (ui) => render(
  <IntlProvider locale="en" messages={{}}>
    {ui}
  </IntlProvider>,
);

describe('<FileDownload />', () => {
  const props = {
    files: [
      {
        fileUrl: 'fileUrl',
        fileName: 'fileName',
        fileDescription: 'fileDescription',
      },
    ],
  };

  beforeEach(() => {
    jest.clearAllMocks();
    useFileDownloadHooks.mockReturnValue({
      downloadFiles: mockDownloadFiles,
      status: 'idle',
    });
  });

  it('renders nothing when no files are provided', () => {
    const { container } = renderWithIntl(<FileDownload files={[]} />);
    expect(container.firstChild).toBeNull();
  });

  it('renders download button when files are provided', () => {
    renderWithIntl(<FileDownload {...props} />);

    const downloadButton = screen.getByRole('button', { name: /download files/i });
    expect(downloadButton).toBeInTheDocument();
    expect(downloadButton).not.toBeDisabled();
  });

  it('calls downloadFiles when button is clicked', async () => {
    const user = userEvent.setup();
    renderWithIntl(<FileDownload {...props} />);

    const downloadButton = screen.getByRole('button', { name: /download files/i });
    await user.click(downloadButton);

    expect(mockDownloadFiles).toHaveBeenCalledTimes(1);
  });

  it('shows loading state when status is loading', () => {
    useFileDownloadHooks.mockReturnValue({
      downloadFiles: mockDownloadFiles,
      status: 'loading',
    });

    renderWithIntl(<FileDownload {...props} />);

    const downloadButton = screen.getByRole('button', { name: /downloading/i });
    expect(downloadButton).toBeInTheDocument();
    expect(downloadButton).toHaveAttribute('aria-disabled', 'true');
  });

  it('shows success state when status is success', () => {
    useFileDownloadHooks.mockReturnValue({
      downloadFiles: mockDownloadFiles,
      status: 'success',
    });

    renderWithIntl(<FileDownload {...props} />);

    const downloadButton = screen.getByRole('button', { name: /downloaded/i });
    expect(downloadButton).toBeInTheDocument();
    expect(downloadButton).toHaveAttribute('aria-disabled', 'true');
  });

  it('shows error state when status is error', () => {
    useFileDownloadHooks.mockReturnValue({
      downloadFiles: mockDownloadFiles,
      status: 'error',
    });

    renderWithIntl(<FileDownload {...props} />);

    const downloadButton = screen.getByRole('button', { name: /retry download/i });
    expect(downloadButton).toBeInTheDocument();
    expect(downloadButton).not.toBeDisabled();
  });
});
