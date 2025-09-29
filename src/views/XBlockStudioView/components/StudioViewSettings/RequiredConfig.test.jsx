import { screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { renderWithIntl } from '../../../../testUtils';
import RequiredConfig from './RequiredConfig';

describe('<RequiredConfig />', () => {
  it('renders none label when required is undefined', () => {
    renderWithIntl(<RequiredConfig />);
    expect(screen.getByText('None')).toBeInTheDocument();
  });

  it('renders required label when required is true', () => {
    renderWithIntl(<RequiredConfig required />);
    expect(screen.getByText('Required')).toBeInTheDocument();
  });

  it('renders optional label when required is false', () => {
    renderWithIntl(<RequiredConfig required={false} />);
    expect(screen.getByText('Optional')).toBeInTheDocument();
  });

  it('renders none label when required is explicitly null', () => {
    renderWithIntl(<RequiredConfig required={null} />);
    expect(screen.getByText('None')).toBeInTheDocument();
  });
});
