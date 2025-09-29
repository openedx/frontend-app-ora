import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

import useDueDateMessage from './useDueDateMessage';
import DueDateMessage from './index';

jest.mock('./useDueDateMessage');

describe('<DueDateMessage />', () => {
  it('renders the due date message from hook', () => {
    useDueDateMessage.mockReturnValue('Due tomorrow');
    render(<DueDateMessage />);

    const messageElement = screen.getByText('Due tomorrow');
    expect(messageElement).toBeInTheDocument();
  });
});
