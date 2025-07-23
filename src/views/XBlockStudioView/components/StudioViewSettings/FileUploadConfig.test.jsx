import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { IntlProvider } from '@edx/frontend-platform/i18n';

import { useFileUploadConfig } from 'hooks/app';

import FileUploadConfig from './FileUploadConfig';

jest.unmock('@openedx/paragon');
jest.unmock('react');
jest.unmock('@edx/frontend-platform/i18n');

jest.mock('hooks/app', () => ({
  useFileUploadConfig: jest.fn(),
}));
jest.mock('./RequiredConfig', () => {
  // eslint-disable-next-line react/prop-types
  const RequiredConfig = ({ required }) => (
    <span data-testid="required-config">
      {required ? 'Required' : 'Optional'}
    </span>
  );
  return RequiredConfig;
});

describe('<FileUploadConfig />', () => {
  const renderWithIntl = (component) => render(<IntlProvider locale="en">{component}</IntlProvider>);

  it('renders file upload configuration when enabled', () => {
    useFileUploadConfig.mockReturnValue({
      enabled: true,
      fileUploadLimit: 10,
      required: true,
    });

    renderWithIntl(<FileUploadConfig />);

    expect(screen.getByText('File uploads:')).toBeInTheDocument();
    expect(screen.getByText('File upload limit:')).toBeInTheDocument();
    expect(screen.getByText('10')).toBeInTheDocument();
    expect(screen.getByTestId('required-config')).toBeInTheDocument();
  });

  it('does not render when file upload is disabled', () => {
    useFileUploadConfig.mockReturnValue({
      enabled: false,
    });

    const { container } = renderWithIntl(<FileUploadConfig />);

    expect(container.firstChild).toBeNull();
  });

  it('handles null config gracefully', () => {
    useFileUploadConfig.mockReturnValue(null);

    const { container } = renderWithIntl(<FileUploadConfig />);

    expect(container.firstChild).toBeNull();
  });

  it('renders with different file upload limit', () => {
    useFileUploadConfig.mockReturnValue({
      enabled: true,
      fileUploadLimit: 5,
      required: false,
    });

    renderWithIntl(<FileUploadConfig />);

    expect(screen.getByText('5')).toBeInTheDocument();
    expect(screen.getByTestId('required-config')).toHaveTextContent('Optional');
  });
});
