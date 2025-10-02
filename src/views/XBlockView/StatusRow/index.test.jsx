import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

import StatusRow from './index';

jest.mock('./StatusBadge', () => {
  const StatusBadge = () => <div data-testid="status-badge">Status Badge</div>;
  return StatusBadge;
});
jest.mock('./DueDateMessage', () => {
  const DueDateMessage = () => (
    <div data-testid="due-date-message">Due Date Message</div>
  );
  return DueDateMessage;
});

describe('<StatusRow />', () => {
  it('renders StatusBadge and DueDateMessage', () => {
    render(<StatusRow />);

    expect(screen.getByTestId('status-badge')).toBeInTheDocument();
    expect(screen.getByTestId('due-date-message')).toBeInTheDocument();
    expect(screen.getByText('Status Badge')).toBeInTheDocument();
    expect(screen.getByText('Due Date Message')).toBeInTheDocument();
  });

  it('has correct CSS class on container', () => {
    const { container } = render(<StatusRow />);

    expect(container.querySelector('.mt-3')).toBeInTheDocument();
  });

  it('renders both child components in correct order', () => {
    render(<StatusRow />);

    const statusBadge = screen.getByTestId('status-badge');
    const dueDateMessage = screen.getByTestId('due-date-message');

    expect(statusBadge).toBeInTheDocument();
    expect(dueDateMessage).toBeInTheDocument();
  });
});
