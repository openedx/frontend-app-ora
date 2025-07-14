import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

import LoadingBanner from './LoadingBanner';

jest.unmock('@openedx/paragon');
jest.unmock('react');
jest.unmock('@edx/frontend-platform/i18n');

describe('<LoadingBanner />', () => {
  it('renders an info alert with spinner', () => {
    const { container } = render(<LoadingBanner />);

    // Check for alert with info variant
    const alert = screen.getByRole('alert');
    expect(alert).toBeInTheDocument();
    expect(alert).toHaveClass('alert-info');

    // Check for spinner by class name
    const spinner = container.querySelector('.spinner-border');
    expect(spinner).toBeInTheDocument();
    expect(spinner).toHaveClass('pgn__spinner');
    expect(spinner).toHaveClass('d-flex');
    expect(spinner).toHaveClass('m-auto');
  });
});
