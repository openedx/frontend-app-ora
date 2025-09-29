import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import { IntlProvider } from '@edx/frontend-platform/i18n';

import ErrorBanner from './ErrorBanner';

describe('<ErrorBanner />', () => {
  const props = {
    headerMessage: {
      id: 'headerMessageId',
      defaultMessage: 'Test Error Header',
    },
    actions: [
      {
        id: 'actionId',
        onClick: jest.fn().mockName('onClick'),
        message: {
          id: 'actionMessageId',
          defaultMessage: 'Retry Action',
        },
      },
    ],
  };

  const renderWithIntl = (component) => render(<IntlProvider locale="en">{component}</IntlProvider>);

  it('renders error banner with header message and children', () => {
    renderWithIntl(
      <ErrorBanner {...props}>
        <div>Error details content</div>
      </ErrorBanner>,
    );

    expect(screen.getByRole('alert')).toBeInTheDocument();
    expect(screen.getByRole('alert')).toHaveClass('alert-danger');
    expect(screen.getByText('Test Error Header')).toBeInTheDocument();
    expect(screen.getByText('Error details content')).toBeInTheDocument();
  });

  it('renders action buttons when actions are provided', () => {
    renderWithIntl(
      <ErrorBanner {...props}>
        <div>Error content</div>
      </ErrorBanner>,
    );

    const actionButton = screen.getByRole('button', { name: 'Retry Action' });
    expect(actionButton).toBeInTheDocument();
    expect(actionButton).toHaveClass('btn-outline-primary');
  });

  it('calls action onClick when button is clicked', async () => {
    const user = userEvent.setup();
    renderWithIntl(
      <ErrorBanner {...props}>
        <div>Error content</div>
      </ErrorBanner>,
    );

    const actionButton = screen.getByRole('button', { name: 'Retry Action' });
    await user.click(actionButton);

    expect(props.actions[0].onClick).toHaveBeenCalledTimes(1);
  });

  it('renders without action buttons when no actions provided', () => {
    renderWithIntl(
      <ErrorBanner headerMessage={props.headerMessage}>
        <div>Error content without actions</div>
      </ErrorBanner>,
    );

    expect(screen.getByRole('alert')).toBeInTheDocument();
    expect(screen.getByText('Test Error Header')).toBeInTheDocument();
    expect(
      screen.getByText('Error content without actions'),
    ).toBeInTheDocument();
    expect(screen.queryByRole('button')).not.toBeInTheDocument();
  });

  it('renders without children when not provided', () => {
    renderWithIntl(<ErrorBanner headerMessage={props.headerMessage} />);

    expect(screen.getByRole('alert')).toBeInTheDocument();
    expect(screen.getByText('Test Error Header')).toBeInTheDocument();
  });
});
