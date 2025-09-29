import { screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { useFileUploadConfig } from 'hooks/app';
import { renderWithIntl } from '../../../../testUtils';
import FileUploadConfig from './FileUploadConfig';

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
  it('renders file upload configuration when enabled', () => {
    useFileUploadConfig.mockReturnValue({
      enabled: true,
      fileUploadLimit: 10,
      required: true,
    });

    renderWithIntl(<FileUploadConfig />);

    expect(screen.getByText('File uploads:')).toBeInTheDocument();
    expect(screen.getByText('File upload limit:')).toBeInTheDocument();
    // Check for the upload limit number in the context of the upload limit label
    expect(
      screen.getByText('File upload limit:').closest('p'),
    ).toHaveTextContent('10');
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

    // Check for the upload limit number in the context of the upload limit label
    expect(
      screen.getByText('File upload limit:').closest('p'),
    ).toHaveTextContent('5');
    expect(screen.getByTestId('required-config')).toHaveTextContent('Optional');
  });
});
