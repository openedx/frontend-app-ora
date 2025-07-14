import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import { IntlProvider } from '@edx/frontend-platform/i18n';

import ConfirmDialog from './index';

jest.unmock('@openedx/paragon');
jest.unmock('react');
jest.unmock('@edx/frontend-platform/i18n');

describe('<ConfirmDialog />', () => {
  const props = {
    title: 'Test Title',
    description: 'Test Description',
    action: {
      onClick: jest.fn(),
    },
    isOpen: true,
    close: jest.fn(),
  };

  const renderWithIntl = (component) => render(<IntlProvider locale="en">{component}</IntlProvider>);

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders title and description when isOpen is true', () => {
    renderWithIntl(<ConfirmDialog {...props} />);

    expect(screen.getByText('Test Title')).toBeInTheDocument();
    expect(screen.getByText('Test Description')).toBeInTheDocument();
  });

  it('renders action buttons', () => {
    renderWithIntl(<ConfirmDialog {...props} />);

    expect(
      screen.getByRole('button', { name: /go back/i }),
    ).toBeInTheDocument();
    expect(screen.getAllByRole('button')).toHaveLength(2);
  });

  it('calls close function when go back button is clicked', async () => {
    const user = userEvent.setup();
    renderWithIntl(<ConfirmDialog {...props} />);

    const goBackButton = screen.getByRole('button', { name: /go back/i });
    await user.click(goBackButton);

    expect(props.close).toHaveBeenCalledTimes(1);
  });

  it('does not render when isOpen is false', () => {
    renderWithIntl(<ConfirmDialog {...props} isOpen={false} />);

    expect(screen.queryByText('Test Title')).not.toBeInTheDocument();
    expect(screen.queryByText('Test Description')).not.toBeInTheDocument();
  });
});
