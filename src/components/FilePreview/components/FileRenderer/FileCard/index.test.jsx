import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';

import FileCard from './index';

describe('<FileCard />', () => {
  const props = {
    file: {
      fileName: 'test-file.pdf',
    },
    children: <div>File content preview</div>,
    defaultOpen: true,
  };

  it('renders file name in title', () => {
    render(<FileCard {...props} />);

    const title = screen.getByRole('heading', { name: 'test-file.pdf' });
    expect(title).toBeInTheDocument();
    expect(title).toHaveClass('file-card-title');
  });

  it('renders children content', () => {
    render(<FileCard {...props} />);

    expect(screen.getByText('File content preview')).toBeInTheDocument();
  });

  it('renders with correct CSS classes', () => {
    const { container } = render(<FileCard {...props} />);

    const card = container.querySelector('.file-card');
    expect(card).toBeInTheDocument();

    const collapsible = container.querySelector('.file-collapsible');
    expect(collapsible).toBeInTheDocument();

    const previewPanel = container.querySelector('.preview-panel');
    expect(previewPanel).toBeInTheDocument();
  });

  it('opens by default when defaultOpen is true', () => {
    render(<FileCard {...props} />);

    // Content should be visible when defaultOpen is true
    expect(screen.getByText('File content preview')).toBeInTheDocument();
  });

  it('is closed by default when defaultOpen is false', () => {
    render(<FileCard {...props} defaultOpen={false} />);

    // Content should not be visible when defaultOpen is false
    expect(screen.queryByText('File content preview')).not.toBeInTheDocument();
  });

  it('can be toggled open when initially closed', async () => {
    const user = userEvent.setup();
    render(<FileCard {...props} defaultOpen={false} />);

    // Initially closed
    expect(screen.queryByText('File content preview')).not.toBeInTheDocument();

    // Click to open
    const titleButton = screen.getByRole('button', { name: 'test-file.pdf' });
    await user.click(titleButton);

    // Should be open now - wait for transition
    await waitFor(() => {
      expect(screen.getByText('File content preview')).toBeInTheDocument();
    });
  });
});
