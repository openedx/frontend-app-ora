import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { IntlProvider } from '@edx/frontend-platform/i18n';

import fileSize from 'filesize';

import FileMetaDisplay from './FileMetaDisplay';

jest.unmock('@openedx/paragon');
jest.unmock('react');
jest.unmock('@edx/frontend-platform/i18n');

jest.mock('filesize');

describe('<FileMetaDisplay />', () => {
  const props = {
    name: 'test-file.pdf',
    description: 'Test file description',
    size: 123456,
  };

  const renderWithIntl = (component) => render(<IntlProvider locale="en">{component}</IntlProvider>);

  beforeEach(() => {
    fileSize.mockReturnValue('123 KB');
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders file meta display with all information', () => {
    renderWithIntl(<FileMetaDisplay {...props} />);

    expect(screen.getByText('test-file.pdf')).toBeInTheDocument();

    expect(screen.getByText('Test file description')).toBeInTheDocument();

    expect(screen.getByText('123 KB')).toBeInTheDocument();
    expect(fileSize).toHaveBeenCalledWith(123456);
  });

  it('renders file meta display with no size', () => {
    renderWithIntl(<FileMetaDisplay {...props} size={null} />);

    expect(screen.getByText('test-file.pdf')).toBeInTheDocument();

    expect(screen.getByText('Test file description')).toBeInTheDocument();

    expect(screen.getByText('Unknown')).toBeInTheDocument();
    expect(fileSize).not.toHaveBeenCalled();
  });

  it('renders with empty description when not provided', () => {
    renderWithIntl(<FileMetaDisplay name={props.name} size={props.size} />);

    expect(screen.queryByText('Test file description')).not.toBeInTheDocument();
  });
});
