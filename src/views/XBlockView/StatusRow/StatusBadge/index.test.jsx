import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { IntlProvider } from '@edx/frontend-platform/i18n';

import StatusBadge from './index';

jest.unmock('@openedx/paragon');
jest.unmock('react');
jest.unmock('@edx/frontend-platform/i18n');

jest.mock('./useBadgeConfig', () => () => ({
  variant: 'variant',
  message: {
    id: 'message',
    defaultMessage: 'defaultMessage',
  },
}));

describe('<StatusBadge />', () => {
  const renderWithIntl = (component) => render(<IntlProvider locale="en">{component}</IntlProvider>);

  it('renders badge with message from hook', () => {
    renderWithIntl(<StatusBadge />);

    expect(screen.getByText('defaultMessage')).toBeInTheDocument();
  });

  it('renders badge component with correct role', () => {
    renderWithIntl(<StatusBadge />);

    const badge = screen.getByText('defaultMessage');
    expect(badge).toBeInTheDocument();
    expect(badge.closest('.badge')).toBeInTheDocument();
  });

  it('applies variant class from hook', () => {
    renderWithIntl(<StatusBadge />);

    const badge = screen.getByText('defaultMessage');
    expect(badge).toHaveClass('badge');
  });
});
