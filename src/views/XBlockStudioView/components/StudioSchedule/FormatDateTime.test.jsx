import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { IntlProvider } from '@edx/frontend-platform/i18n';

import FormatDateTime from './FormatDateTime';

jest.unmock('@openedx/paragon');
jest.unmock('react');
jest.unmock('@edx/frontend-platform/i18n');

describe('<FormatDateTime />', () => {
  const renderWithIntl = (component) => render(<IntlProvider locale="en">{component}</IntlProvider>);

  it('renders not set label when no date is provided', () => {
    renderWithIntl(<FormatDateTime />);
    expect(screen.getByText('Not set')).toBeInTheDocument();
  });

  it('renders formatted date when date is provided', () => {
    renderWithIntl(<FormatDateTime date="2020-01-01T00:00:00Z" />);
    expect(screen.getByText(/2019|2020/)).toBeInTheDocument();
    expect(screen.getByText(/AM|PM/)).toBeInTheDocument();
  });

  it('renders formatted date with null date prop', () => {
    renderWithIntl(<FormatDateTime date={null} />);
    expect(screen.getByText('Not set')).toBeInTheDocument();
  });
});
