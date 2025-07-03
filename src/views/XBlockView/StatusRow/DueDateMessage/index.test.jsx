import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

import useDueDateMessage from './useDueDateMessage';

import DueDateMessage from './index';

jest.unmock('@openedx/paragon');
jest.unmock('react');
jest.unmock('@edx/frontend-platform/i18n');

jest.mock('./useDueDateMessage');

describe('<DueDateMessage />', () => {
  it('renders the due date message from hook', () => {
    useDueDateMessage.mockReturnValue('Due in 1 day');
    render(<DueDateMessage />);

    expect(screen.getByText('Due in 1 day')).toBeInTheDocument();
  });

  it('renders with correct CSS classes', () => {
    useDueDateMessage.mockReturnValue('Due tomorrow');
    const { container } = render(<DueDateMessage />);

    const messageDiv = container.querySelector('.d-inline.pl-1.py-3.small');
    expect(messageDiv).toBeInTheDocument();
    expect(messageDiv).toHaveTextContent('Due tomorrow');
  });

  it('renders empty message when hook returns empty string', () => {
    useDueDateMessage.mockReturnValue('');
    const { container } = render(<DueDateMessage />);

    const messageDiv = container.querySelector('.d-inline.pl-1.py-3.small');
    expect(messageDiv).toBeInTheDocument();
    expect(messageDiv).toHaveTextContent('');
  });

  it('renders different message content', () => {
    useDueDateMessage.mockReturnValue('Past due');
    render(<DueDateMessage />);

    expect(screen.getByText('Past due')).toBeInTheDocument();
  });
});
