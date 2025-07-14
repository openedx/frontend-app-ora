import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { IntlProvider } from '@edx/frontend-platform/i18n';

import { useRenderData } from './hooks';
import { FileRenderer } from './index';

jest.unmock('@openedx/paragon');
jest.unmock('react');
jest.unmock('@edx/frontend-platform/i18n');

/* eslint-disable react/prop-types */

jest.mock('./hooks', () => ({
  useRenderData: jest.fn(),
}));

jest.mock('./Banners', () => ({
  ErrorBanner: ({ message, headerMessage, actions }) => (
    <div data-testid="error-banner">
      <div data-testid="error-header">{headerMessage}</div>
      <div data-testid="error-message">{message}</div>
      {actions?.map((action) => (
        <span data-testid={`error-action-${action.id}`}>{action.message}</span>
      ))}
    </div>
  ),
  LoadingBanner: () => <div data-testid="loading-banner">Loading...</div>,
}));

jest.mock('./FileCard', () => ({ children, file, defaultOpen }) => (
  <div data-testid="file-card">
    <div>
      {file.fileName} - {defaultOpen ? 'open' : 'closed'}
    </div>
    {children}
  </div>
));

describe('FileRenderer Component', () => {
  const renderWithIntl = (component) => render(<IntlProvider locale="en">{component}</IntlProvider>);

  const props = {
    file: {
      fileName: 'some_file',
      fileUrl: 'some_url',
    },
    defaultOpen: true,
  };

  const defaultRenderData = {
    Renderer: () => <div data-testid="renderer">Renderer content</div>,
    isLoading: false,
    errorStatus: false,
    error: null,
    rendererProps: {
      abc: 123,
    },
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders default renderer', () => {
    useRenderData.mockReturnValue(defaultRenderData);
    renderWithIntl(<FileRenderer {...props} />);

    expect(screen.getByTestId('file-card')).toBeInTheDocument();
    expect(screen.getByText('some_file - open')).toBeInTheDocument();
    expect(screen.getByTestId('renderer')).toBeInTheDocument();
    expect(screen.getByText('Renderer content')).toBeInTheDocument();
    expect(screen.queryByTestId('loading-banner')).not.toBeInTheDocument();
    expect(screen.queryByTestId('error-banner')).not.toBeInTheDocument();
  });

  it('renders loading banner', () => {
    useRenderData.mockReturnValue({ ...defaultRenderData, isLoading: true });
    renderWithIntl(<FileRenderer {...props} />);

    expect(screen.getByTestId('loading-banner')).toBeInTheDocument();
    expect(screen.getByText('Loading...')).toBeInTheDocument();
    expect(screen.queryByTestId('error-banner')).not.toBeInTheDocument();
    expect(screen.queryByTestId('renderer')).not.toBeInTheDocument();
  });

  it('renders error banner', () => {
    useRenderData.mockReturnValue({
      errorStatus: true,
      error: { message: 'some_error' },
    });
    renderWithIntl(<FileRenderer {...props} />);

    expect(screen.getByTestId('error-banner')).toBeInTheDocument();
    expect(screen.getByText('some_error')).toBeInTheDocument();
    expect(screen.queryByTestId('loading-banner')).not.toBeInTheDocument();
    expect(screen.queryByTestId('renderer')).not.toBeInTheDocument();
  });

  it('passes defaultOpen prop correctly', () => {
    useRenderData.mockReturnValue(defaultRenderData);
    renderWithIntl(<FileRenderer {...props} defaultOpen={false} />);

    expect(screen.getByText('some_file - closed')).toBeInTheDocument();
  });

  it('passes rendererProps to Renderer component', () => {
    const CustomRenderer = jest.fn(() => <div>Custom Renderer</div>);
    const customRendererProps = {
      prop1: 'value1',
      prop2: 'value2',
    };
    useRenderData.mockReturnValue({
      ...defaultRenderData,
      Renderer: CustomRenderer,
      rendererProps: customRendererProps,
    });

    renderWithIntl(<FileRenderer {...props} />);
    expect(CustomRenderer).toHaveBeenCalledWith(customRendererProps, {});
  });

  it('passes all error properties to ErrorBanner', () => {
    const errorData = {
      headerMessage: 'Error Header',
      message: 'Error Message',
      actions: [{ id: 'retry', message: 'Retry', onClick: jest.fn() }],
    };
    useRenderData.mockReturnValue({
      errorStatus: true,
      error: errorData,
    });

    renderWithIntl(<FileRenderer {...props} />);
    expect(screen.getByTestId('error-header')).toHaveTextContent(
      'Error Header',
    );
    expect(screen.getByTestId('error-message')).toHaveTextContent(
      'Error Message',
    );
    expect(screen.getByTestId('error-action-retry')).toHaveTextContent('Retry');
  });

  it('handles missing optional file properties', () => {
    const minimalProps = {
      file: { fileName: 'minimal_file' },
      defaultOpen: true,
    };
    useRenderData.mockReturnValue(defaultRenderData);

    renderWithIntl(<FileRenderer {...minimalProps} />);
    expect(screen.getByText('minimal_file - open')).toBeInTheDocument();
  });
});
