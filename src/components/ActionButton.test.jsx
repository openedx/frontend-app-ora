import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

import ActionButton from './ActionButton';

describe('<ActionButton />', () => {
  const props = {
    state: 'arbitraryState',
  };

  it('renders nothing when no onClick or href is provided', () => {
    const { container } = render(<ActionButton {...props} />);
    expect(container.firstChild).toBeNull();
  });

  it('renders StatefulButton when state is provided', () => {
    const labels = {
      default: 'Default',
      loading: 'Loading...',
    };
    render(
      <ActionButton href="some-href" state="loading" labels={labels}>
        Button Text
      </ActionButton>,
    );
    expect(screen.getByRole('link')).toBeInTheDocument();
    expect(screen.getByRole('link')).toHaveClass('btn');
  });

  it('renders Button when state is not provided', () => {
    const onClick = jest.fn();
    render(<ActionButton onClick={onClick}>Button Text</ActionButton>);
    expect(screen.getByRole('button')).toBeInTheDocument();
    expect(screen.getByRole('button')).toHaveClass('btn');
  });
});
