import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { IntlProvider } from '@edx/frontend-platform/i18n';

import StepInfo from './StepInfo';

jest.unmock('@openedx/paragon');
jest.unmock('react');
jest.unmock('@edx/frontend-platform/i18n');

jest.mock('./FormatDateTime', () => {
  // eslint-disable-next-line react/prop-types
  const FormatDateTime = ({ date }) => <span>{date || 'Not set'}</span>;
  return FormatDateTime;
});

describe('<StepInfo />', () => {
  const renderWithIntl = (component) => render(<IntlProvider locale="en">{component}</IntlProvider>);

  it('renders step info without dates', () => {
    renderWithIntl(<StepInfo stepName="test" />);
    expect(screen.queryByText('test start:')).not.toBeInTheDocument();
    expect(screen.queryByText('test due:')).not.toBeInTheDocument();
  });

  it('renders step info with start and end dates', () => {
    renderWithIntl(
      <StepInfo
        stepName="test"
        startDatetime="2020-01-01T00:00:00Z"
        endDatetime="2020-01-02T00:00:00Z"
      />,
    );
    expect(screen.getByText('test start:')).toBeInTheDocument();
    expect(screen.getByText('test due:')).toBeInTheDocument();
    expect(screen.getByText('2020-01-01T00:00:00Z')).toBeInTheDocument();
    expect(screen.getByText('2020-01-02T00:00:00Z')).toBeInTheDocument();
  });

  it('renders only start date when end date is not provided', () => {
    renderWithIntl(
      <StepInfo stepName="test" startDatetime="2020-01-01T00:00:00Z" />,
    );
    expect(screen.getByText('test start:')).toBeInTheDocument();
    expect(screen.queryByText('test due:')).not.toBeInTheDocument();
    expect(screen.getByText('2020-01-01T00:00:00Z')).toBeInTheDocument();
  });

  it('renders only end date when start date is not provided', () => {
    renderWithIntl(
      <StepInfo stepName="test" endDatetime="2020-01-02T00:00:00Z" />,
    );
    expect(screen.queryByText('test start:')).not.toBeInTheDocument();
    expect(screen.getByText('test due:')).toBeInTheDocument();
    expect(screen.getByText('2020-01-02T00:00:00Z')).toBeInTheDocument();
  });
});
