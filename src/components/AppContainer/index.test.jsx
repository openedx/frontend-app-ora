import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { IntlProvider } from '@edx/frontend-platform/i18n';

import {
  useIsPageDataLoaded,
  useIsORAConfigLoaded,
  usePageDataError,
  useORAConfigDataError,
} from 'hooks/app';

import AppContainer from '.';

jest.unmock('@openedx/paragon');
jest.unmock('react');
jest.unmock('@edx/frontend-platform/i18n');

jest.mock('@edx/frontend-platform/i18n', () => ({
  ...jest.requireActual('@edx/frontend-platform/i18n'),
  getLocale: jest.fn().mockReturnValue('en'),
  configure: jest.fn(),
}));

jest.mock('@edx/frontend-platform/react', () => ({
  ...jest.requireActual('@edx/frontend-platform/react'),
  // eslint-disable-next-line react/prop-types
  ErrorPage: ({ message }) => <div data-testid="error-page">{message}</div>,
}));

jest.mock('hooks/app', () => ({
  useIsPageDataLoaded: jest.fn().mockReturnValue(true),
  useIsORAConfigLoaded: jest.fn().mockReturnValue(true),
  usePageDataError: jest.fn().mockReturnValue(null),
  useORAConfigDataError: jest.fn().mockReturnValue(null),
}));

describe('<AppContainer />', () => {
  const props = {
    children: <div>Test children content</div>,
  };

  const renderWithIntl = (component) => render(<IntlProvider locale="en">{component}</IntlProvider>);

  beforeEach(() => {
    useIsPageDataLoaded.mockReturnValue(true);
    useIsORAConfigLoaded.mockReturnValue(true);
    usePageDataError.mockReturnValue(null);
    useORAConfigDataError.mockReturnValue(null);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders children when data is loaded and no errors', () => {
    renderWithIntl(<AppContainer {...props} />);

    expect(screen.getByText('Test children content')).toBeInTheDocument();
    expect(screen.queryByRole('status')).not.toBeInTheDocument(); // No spinner
  });

  it('renders spinner when page data is not loaded', () => {
    useIsPageDataLoaded.mockReturnValue(false);

    renderWithIntl(<AppContainer {...props} />);

    expect(screen.getByRole('status')).toBeInTheDocument();
    expect(screen.getByText('loading')).toBeInTheDocument();
    expect(screen.queryByText('Test children content')).not.toBeInTheDocument();
  });

  it('renders spinner when ORA config is not loaded', () => {
    useIsORAConfigLoaded.mockReturnValue(false);

    renderWithIntl(<AppContainer {...props} />);

    expect(screen.getByRole('status')).toBeInTheDocument();
    expect(screen.getByText('loading')).toBeInTheDocument();
    expect(screen.queryByText('Test children content')).not.toBeInTheDocument();
  });

  it('renders with correct container styling', () => {
    const { container } = renderWithIntl(<AppContainer {...props} />);

    const containerDiv = container.querySelector('.w-100.h-100');
    expect(containerDiv).toBeInTheDocument();
  });

  it('renders spinner with correct classes when loading', () => {
    useIsPageDataLoaded.mockReturnValue(false);

    const { container } = renderWithIntl(<AppContainer {...props} />);

    const spinner = container.querySelector('.app-loading');
    expect(spinner).toBeInTheDocument();
    expect(spinner).toHaveClass('spinner-border');
  });

  it('renders error page when page data error occurs', () => {
    const mockError = {
      response: {
        data: {
          error: {
            errorCode: 'ERR_INVALID_STATE_FOR_ASSESSMENT',
          },
        },
      },
    };
    usePageDataError.mockReturnValue(mockError);

    renderWithIntl(<AppContainer {...props} />);

    expect(screen.getByTestId('error-page')).toBeInTheDocument();
    expect(
      screen.getByText(
        'This step is not available. Unable to retrieve the assessment.',
      ),
    ).toBeInTheDocument();
    expect(screen.queryByText('Test children content')).not.toBeInTheDocument();
    expect(screen.queryByRole('status')).not.toBeInTheDocument();
  });

  it('renders error page when ORA config error occurs', () => {
    const mockError = {
      response: {
        data: {
          error: {
            errorCode: 'ERR_INVALID_STATE_FOR_ASSESSMENT',
          },
        },
      },
    };
    useORAConfigDataError.mockReturnValue(mockError);

    renderWithIntl(<AppContainer {...props} />);

    expect(screen.getByTestId('error-page')).toBeInTheDocument();
    expect(
      screen.getByText(
        'This step is not available. Unable to retrieve the assessment.',
      ),
    ).toBeInTheDocument();
    expect(screen.queryByText('Test children content')).not.toBeInTheDocument();
    expect(screen.queryByRole('status')).not.toBeInTheDocument();
  });

  it('renders unknown error message when error has unknown error code', () => {
    const mockError = {
      response: {
        data: {
          error: {
            errorCode: 'UNKNOWN_ERROR_CODE',
          },
        },
      },
    };
    usePageDataError.mockReturnValue(mockError);

    renderWithIntl(<AppContainer {...props} />);

    expect(screen.getByTestId('error-page')).toBeInTheDocument();
    expect(
      screen.getByText('An unknown error occurred. Please try again.'),
    ).toBeInTheDocument();
    expect(screen.queryByText('Test children content')).not.toBeInTheDocument();
    expect(screen.queryByRole('status')).not.toBeInTheDocument();
  });

  it('renders unknown error message when error has no error code', () => {
    const mockError = {
      response: {
        data: {
          error: {},
        },
      },
    };
    usePageDataError.mockReturnValue(mockError);

    renderWithIntl(<AppContainer {...props} />);

    expect(screen.getByTestId('error-page')).toBeInTheDocument();
    expect(
      screen.getByText('An unknown error occurred. Please try again.'),
    ).toBeInTheDocument();
    expect(screen.queryByText('Test children content')).not.toBeInTheDocument();
    expect(screen.queryByRole('status')).not.toBeInTheDocument();
  });

  it('renders unknown error message when error has no response data', () => {
    const mockError = {
      response: {},
    };
    usePageDataError.mockReturnValue(mockError);

    renderWithIntl(<AppContainer {...props} />);

    expect(screen.getByTestId('error-page')).toBeInTheDocument();
    expect(
      screen.getByText('An unknown error occurred. Please try again.'),
    ).toBeInTheDocument();
    expect(screen.queryByText('Test children content')).not.toBeInTheDocument();
    expect(screen.queryByRole('status')).not.toBeInTheDocument();
  });

  it('renders unknown error message when error has no response', () => {
    const mockError = {};
    usePageDataError.mockReturnValue(mockError);

    renderWithIntl(<AppContainer {...props} />);

    expect(screen.getByTestId('error-page')).toBeInTheDocument();
    expect(
      screen.getByText('An unknown error occurred. Please try again.'),
    ).toBeInTheDocument();
    expect(screen.queryByText('Test children content')).not.toBeInTheDocument();
    expect(screen.queryByRole('status')).not.toBeInTheDocument();
  });

  it('prioritizes page data error over ORA config error when both exist', () => {
    const pageDataError = {
      response: {
        data: {
          error: {
            errorCode: 'ERR_INVALID_STATE_FOR_ASSESSMENT',
          },
        },
      },
    };
    const oraConfigError = {
      response: {
        data: {
          error: {
            errorCode: 'DIFFERENT_ERROR',
          },
        },
      },
    };
    usePageDataError.mockReturnValue(pageDataError);
    useORAConfigDataError.mockReturnValue(oraConfigError);

    renderWithIntl(<AppContainer {...props} />);

    expect(screen.getByTestId('error-page')).toBeInTheDocument();
    expect(
      screen.getByText(
        'This step is not available. Unable to retrieve the assessment.',
      ),
    ).toBeInTheDocument();
    expect(screen.queryByText('Test children content')).not.toBeInTheDocument();
    expect(screen.queryByRole('status')).not.toBeInTheDocument();
  });

  it('renders spinner when both config and page data are not loaded', () => {
    useIsPageDataLoaded.mockReturnValue(false);
    useIsORAConfigLoaded.mockReturnValue(false);

    renderWithIntl(<AppContainer {...props} />);

    expect(screen.getByRole('status')).toBeInTheDocument();
    expect(screen.getByText('loading')).toBeInTheDocument();
    expect(screen.queryByText('Test children content')).not.toBeInTheDocument();
  });
});
