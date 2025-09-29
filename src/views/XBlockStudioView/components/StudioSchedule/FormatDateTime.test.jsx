import { screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { renderWithIntl } from '../../../../testUtils';
import FormatDateTime from './FormatDateTime';

describe('<FormatDateTime />', () => {
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
